import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {

  try {

    const body = await request.json();

    const { userId } = body;

    if (!userId) {

      return NextResponse.json(
        {
          success: false,
          message: "User ID is required.",
        },
        {
          status: 400,
        }
      );

    }

    const existingWallet = await prisma.wallet.findUnique({

      where: {
        userId,
      },

    });

    if (existingWallet) {

      return NextResponse.json(
        {
          success: true,
          message: "Wallet already exists.",
          wallet: existingWallet,
        },
        {
          status: 200,
        }
      );

    }

    const wallet = await prisma.wallet.create({

      data: {

        userId,

        balance: 1000,

      },

    });
        await prisma.walletTransaction.create({

      data: {

        walletId: wallet.id,

        reference: `WELCOME-${Date.now()}`,

        type: "DEPOSIT",

        status: "SUCCESS",

        amount: 1000,

      },

    });

    return NextResponse.json(
      {
        success: true,
        message: "Wallet created successfully.",
        wallet,
      },
      {
        status: 201,
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