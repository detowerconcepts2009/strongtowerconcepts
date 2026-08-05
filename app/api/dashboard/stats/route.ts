import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {

  try {

    const user = await prisma.user.findFirst({

      include: {
        wallet: true,
      },

    });

    const walletBalance =
      user?.wallet?.balance ?? 0;

    const properties =
      await prisma.property.count();

    const businesses =
      await prisma.businessPage.count();

    const listings =
      await prisma.listing.count();

    const messages = 0;

    return NextResponse.json(
      {
        success: true,

        stats: {

          walletBalance,

          properties,

          businesses,

          listings,

          messages,

        },

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
        message: "Unable to load dashboard statistics.",
      },
      {
        status: 500,
      }
    );

  }

}