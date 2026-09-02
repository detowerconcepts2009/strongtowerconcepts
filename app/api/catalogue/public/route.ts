import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products =
      await prisma.catalogueProduct.findMany({
        where: {
          active: true,
        },
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
          productType: true,
          name: true,
          description: true,
          price: true,
          images: {
            orderBy: [
              {
                isPrimary: "desc",
              },
              {
                createdAt: "asc",
              },
            ],
            select: {
              id: true,
              imageUrl: true,
              isPrimary: true,
            },
          },
        },
      });

    return NextResponse.json(
      {
        success: true,
        products,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Public catalogue API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load catalogue products.",
      },
      {
        status: 500,
      }
    );
  }
}