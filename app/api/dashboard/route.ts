import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
        },
        {
          status: 401,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
      include: {
        wallet: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    const walletBalance = user.wallet?.balance ?? 0;

    const propertyCount = await prisma.property.count({
      where: {
        listing: {
          ownerId: user.id,
        },
      },
    });

    const businessCount = await prisma.businessPage.count({
      where: {
        ownerId: user.id,
      },
    });

    const listingCount = await prisma.listing.count({
      where: {
        ownerId: user.id,
      },
    });

    const dashboardData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      verified: user.verified,
      walletBalance,
      propertyCount,
      businessCount,
      listingCount,
      messageCount: 0,
    };

    return NextResponse.json(
      {
        success: true,
        data: dashboardData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Dashboard error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load dashboard data.",
      },
      {
        status: 500,
      }
    );
  }
}