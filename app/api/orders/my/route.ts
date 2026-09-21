import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
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

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
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
        subtotal: true,
        totalAmount: true,
        status: true,
        paymentStatus: true,
        createdAt: true,
        updatedAt: true,
        items: {
          select: {
            id: true,
            productName: true,
            productType: true,
            model: true,
            quantity: true,
            unitPrice: true,
            lineTotal: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        orders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Customer orders GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load your orders.",
      },
      { status: 500 }
    );
  }
}
