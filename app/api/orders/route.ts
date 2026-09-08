import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface OrderItemInput {
  productId: string;
  productName?: string;
  productType?: string;
  model?: string;
  lengthInches?: number;
  widthInches?: number;
  thicknessInches?: number;
  unitPrice?: number;
  quantity: number;
}

interface OrderRequest {
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  customerNotes?: string;
  items: OrderItemInput[];
}

function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(1000 + Math.random() * 9000);

  return `STC-${timestamp}-${random}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderRequest;

    if (
      !body.customerFirstName?.trim() ||
      !body.customerLastName?.trim() ||
      !body.customerEmail?.trim() ||
      !body.customerPhone?.trim() ||
      !body.deliveryAddress?.trim() ||
      !body.deliveryCity?.trim() ||
      !body.deliveryState?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required customer and delivery information.",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Your cart is empty.",
        },
        { status: 400 }
      );
    }

    const productIds = [
      ...new Set(
        body.items
          .map((item) => item.productId)
          .filter(Boolean)
      ),
    ];

    const products = await prisma.catalogueProduct.findMany({
      where: {
        id: {
          in: productIds,
        },
        active: true,
      },
      include: {
        images: {
          where: {
            isPrimary: true,
          },
          take: 1,
        },
      },
    });

    const productMap = new Map(
      products.map((product) => [product.id, product])
    );

    const orderItems = [];

    for (const item of body.items) {
      const product = productMap.get(item.productId);

      if (!product) {
        return NextResponse.json(
          {
            success: false,
            message: "One or more products in your cart are no longer available.",
          },
          { status: 400 }
        );
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity <= 0) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid product quantity.",
          },
          { status: 400 }
        );
      }

      if (product.price == null) {
        return NextResponse.json(
          {
            success: false,
            message: `${product.name} does not currently have a valid price.`,
          },
          { status: 400 }
        );
      }

      const unitPrice = Number(product.price);
      const lineTotal = unitPrice * quantity;

      orderItems.push({
        catalogueProductId: product.id,
        productName: product.name,
        productType: product.productType,
        model: item.model || null,
        lengthInches:
          typeof item.lengthInches === "number"
            ? item.lengthInches
            : null,
        widthInches:
          typeof item.widthInches === "number"
            ? item.widthInches
            : null,
        thicknessInches:
          typeof item.thicknessInches === "number"
            ? item.thicknessInches
            : null,
        unitPrice,
        quantity,
        lineTotal,
      });
    }

    const subtotal = orderItems.reduce(
      (total, item) => total + Number(item.lineTotal),
      0
    );

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerFirstName: body.customerFirstName.trim(),
        customerLastName: body.customerLastName.trim(),
        customerEmail: body.customerEmail.trim().toLowerCase(),
        customerPhone: body.customerPhone.trim(),
        deliveryAddress: body.deliveryAddress.trim(),
        deliveryCity: body.deliveryCity.trim(),
        deliveryState: body.deliveryState.trim(),
        customerNotes: body.customerNotes?.trim() || null,
        subtotal,
        totalAmount: subtotal,
        status: "PENDING",
        paymentStatus: "UNPAID",
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully.",
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          status: order.status,
          paymentStatus: order.paymentStatus,
          subtotal: Number(order.subtotal),
          totalAmount: Number(order.totalAmount),
          itemCount: order.items.reduce(
            (count, item) => count + item.quantity,
            0
          ),
          createdAt: order.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create your order. Please try again.",
      },
      { status: 500 }
    );
  }
}