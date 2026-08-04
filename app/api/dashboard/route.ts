import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {

  try {

    // Temporary:
    // Until JWT authentication is connected,
    // always return the most recently created user.

    const user = await prisma.user.findFirst({

      orderBy: {
        createdAt: "desc",
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
        const walletBalance =
      user.wallet?.balance ?? 0;

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

      propertyCount: 0,

      businessCount: 0,

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

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error.",
      },
      {
        status: 500,
      }
    );

  }

}