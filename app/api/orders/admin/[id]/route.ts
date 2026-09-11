import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

const ALLOWED_ROLES = ["SUPER_ADMIN", "ADMIN", "STAFF"];

const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "READY_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
] as const;

const PAYMENT_STATUSES = [
  "UNPAID",
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
] as const;

type OrderStatus = (typeof ORDER_STATUSES)[number];
type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    if (!ALLOWED_ROLES.includes(user.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "You do not have permission to update orders.",
        },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const orderStatus = body.status as OrderStatus | undefined;
    const paymentStatus = body.paymentStatus as PaymentStatus | undefined;

    if (!orderStatus && !paymentStatus) {
      return NextResponse.json(
        {
          success: false,
          message: "No order or payment status was provided.",
        },
        { status: 400 }
      );
    }

    if (
      orderStatus &&
      !ORDER_STATUSES.includes(orderStatus)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order status.",
        },
        { status: 400 }
      );
    }

    if (
      paymentStatus &&
      !PAYMENT_STATUSES.includes(paymentStatus)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment status.",
        },
        { status: 400 }
      );
    }

    const existingOrder = await prisma.order.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        orderNumber: true,
      },
    });

    if (!existingOrder) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        { status: 404 }
      );
    }

    const updateData: {
      status?: OrderStatus;
      paymentStatus?: PaymentStatus;
    } = {};

    if (orderStatus) {
      updateData.status = orderStatus;
    }

    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id,
      },
      data: updateData,
      select: {
        id: true,
        orderNumber: true,
        status: true,
        paymentStatus: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order status updated successfully.",
        order: updatedOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin order PATCH error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update order.",
      },
      { status: 500 }
    );
  }
}