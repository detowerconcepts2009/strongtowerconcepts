import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface InitializePaymentRequest {
  orderNumber: string;
}

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

export async function POST(request: Request) {
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { error: "Paystack secret key is not configured." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as InitializePaymentRequest;

    if (!body.orderNumber?.trim()) {
      return NextResponse.json(
        { error: "Order number is required." },
        { status: 400 }
      );
    }

    const orderNumber = body.orderNumber.trim();

    const order = await prisma.order.findUnique({
      where: {
        orderNumber,
      },
      select: {
        id: true,
        orderNumber: true,
        userId: true,
        customerFirstName: true,
        customerLastName: true,
        customerEmail: true,
        totalAmount: true,
        status: true,
        paymentStatus: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found." },
        { status: 404 }
      );
    }

    const currentUser = await getCurrentUser();

    if (order.userId) {
      if (!currentUser || currentUser.id !== order.userId) {
        return NextResponse.json(
          { error: "You are not authorized to pay for this order." },
          { status: 403 }
        );
      }
    }

    if (order.paymentStatus === "PAID") {
      return NextResponse.json(
        { error: "This order has already been paid for." },
        { status: 400 }
      );
    }

    if (order.status === "CANCELLED") {
      return NextResponse.json(
        { error: "This order has been cancelled and cannot be paid for." },
        { status: 400 }
      );
    }

    const totalAmount = Number(order.totalAmount);

    if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
      return NextResponse.json(
        { error: "This order does not have a valid payment amount." },
        { status: 400 }
      );
    }

    const amountInKobo = Math.round(totalAmount * 100);

    const reference = `${order.orderNumber}-${Date.now()}`;

    const callbackUrl = `${getSiteUrl()}/payment/callback`;

    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: order.customerEmail,
          amount: String(amountInKobo),
          currency: "NGN",
          reference,
          callback_url: callbackUrl,
          metadata: {
            orderId: order.id,
            orderNumber: order.orderNumber,
            customerName: `${order.customerFirstName} ${order.customerLastName}`,
          },
        }),
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok || !paystackData.status) {
      console.error("Paystack initialization failed:", paystackData);

      return NextResponse.json(
        {
          error:
            paystackData?.message ||
            "Unable to initialize Paystack payment.",
        },
        { status: 502 }
      );
    }

    const paystackReference = paystackData.data.reference;

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentReference: paystackReference,
      },
    });

    return NextResponse.json({
      success: true,
      authorizationUrl: paystackData.data.authorization_url,
      accessCode: paystackData.data.access_code,
      reference: paystackReference,
      orderNumber: order.orderNumber,
      amount: totalAmount,
    });
  } catch (error) {
    console.error("Payment initialization error:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred while initializing payment." },
      { status: 500 }
    );
  }
}