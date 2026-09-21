import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import {
  sendCustomerOrderConfirmation,
  sendAdminOrderNotification,
} from "@/lib/email";

export async function POST(request: Request) {
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { error: "Paystack secret key is not configured." },
        { status: 500 }
      );
    }

    const rawBody = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing Paystack signature." },
        { status: 401 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha512", secretKey)
      .update(rawBody)
      .digest("hex");

    const signaturesMatch =
      signature.length === expectedSignature.length &&
      crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      );

    if (!signaturesMatch) {
      return NextResponse.json(
        { error: "Invalid Paystack signature." },
        { status: 401 }
      );
    }

    const event = JSON.parse(rawBody);

    if (event.event !== "charge.success") {
      return NextResponse.json({
        received: true,
        processed: false,
      });
    }

    const transaction = event.data;

    if (!transaction?.reference) {
      return NextResponse.json(
        { error: "Payment reference is missing." },
        { status: 400 }
      );
    }

    const reference = transaction.reference;

    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(
        reference
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok || !paystackData.status) {
      console.error("Paystack webhook verification failed:", paystackData);

      return NextResponse.json(
        { error: "Unable to verify Paystack transaction." },
        { status: 502 }
      );
    }

    const verifiedTransaction = paystackData.data;

    if (verifiedTransaction.status !== "success") {
      return NextResponse.json({
        received: true,
        processed: false,
        paymentStatus: verifiedTransaction.status,
      });
    }

    const orderNumber =
      verifiedTransaction.metadata?.orderNumber ||
      reference.split("-").slice(0, 3).join("-");

    const order = await prisma.order.findUnique({
      where: {
        orderNumber,
      },
      select: {
        id: true,
        orderNumber: true,
        customerFirstName: true,
        customerLastName: true,
        customerEmail: true,
        customerPhone: true,
        deliveryAddress: true,
        deliveryCity: true,
        deliveryState: true,
        totalAmount: true,
        paymentStatus: true,
        items: {
          select: {
            productName: true,
            productType: true,
            model: true,
            lengthInches: true,
            widthInches: true,
            thicknessInches: true,
            unitPrice: true,
            quantity: true,
            lineTotal: true,
          },
        },
      },
    });

    if (!order) {
      console.error("Webhook order not found:", {
        orderNumber,
        reference,
      });

      return NextResponse.json(
        { error: "Associated order could not be found." },
        { status: 404 }
      );
    }

    const expectedAmount = Math.round(Number(order.totalAmount) * 100);

    if (verifiedTransaction.amount !== expectedAmount) {
      console.error("Webhook payment amount mismatch:", {
        orderNumber: order.orderNumber,
        expectedAmount,
        receivedAmount: verifiedTransaction.amount,
        reference,
      });

      return NextResponse.json(
        { error: "Payment amount does not match the order amount." },
        { status: 400 }
      );
    }

    const wasAlreadyPaid = order.paymentStatus === "PAID";

    if (!wasAlreadyPaid) {
      const paidAt = new Date();

      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          paymentStatus: "PAID",
          paymentReference: reference,
          paidAt,
        },
      });

      const emailOrder = {
        orderNumber: order.orderNumber,
        customerFirstName: order.customerFirstName,
        customerLastName: order.customerLastName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        deliveryAddress: order.deliveryAddress,
        deliveryCity: order.deliveryCity,
        deliveryState: order.deliveryState,
        totalAmount: Number(order.totalAmount),
        paymentReference: reference,
        paidAt,
        items: order.items.map((item) => ({
          productName: item.productName,
          productType: item.productType,
          model: item.model,
          lengthInches: item.lengthInches,
          widthInches: item.widthInches,
          thicknessInches: item.thicknessInches,
          unitPrice: Number(item.unitPrice),
          quantity: item.quantity,
          lineTotal: Number(item.lineTotal),
        })),
      };

      const [customerEmailResult, adminEmailResult] = await Promise.all([
        sendCustomerOrderConfirmation(emailOrder),
        sendAdminOrderNotification(emailOrder),
      ]);

      if (!customerEmailResult.success) {
        console.error(
          "Customer order confirmation email failed:",
          customerEmailResult.error
        );
      }

      if (!adminEmailResult.success) {
        console.error(
          "Admin order notification email failed:",
          adminEmailResult.error
        );
      }
    }

    return NextResponse.json({
      received: true,
      processed: true,
      orderNumber: order.orderNumber,
      paymentStatus: "PAID",
      reference,
      emailsSent: !wasAlreadyPaid,
    });
  } catch (error) {
    console.error("Paystack webhook error:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred while processing the webhook." },
      { status: 500 }
    );
  }
}