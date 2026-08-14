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
        {
          status: 401,
        }
      );
    }

    const [wallet, properties, businesses, listings] =
      await Promise.all([
        prisma.wallet.findUnique({
          where: {
            userId: user.id,
          },
          select: {
            balance: true,
          },
        }),

        prisma.property.count({
          where: {
            listing: {
              ownerId: user.id,
            },
          },
        }),

        prisma.businessPage.count({
          where: {
            ownerId: user.id,
          },
        }),

        prisma.listing.count({
          where: {
            ownerId: user.id,
          },
        }),
      ]);

    return NextResponse.json(
      {
        success: true,
        stats: {
          walletBalance: wallet?.balance ?? 0,
          properties,
          businesses,
          listings,
          messages: 0,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Dashboard statistics error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load dashboard statistics.",
      },
      {
        status: 500,
      }
    );
  }
}