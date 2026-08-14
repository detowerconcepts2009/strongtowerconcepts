import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST() {
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

    const existingWallet = await prisma.wallet.findUnique({
      where: {
        userId: user.id,
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

    const wallet = await prisma.$transaction(async (tx) => {
      const newWallet = await tx.wallet.create({
        data: {
          userId: user.id,
          balance: 1000,
        },
      });

      await tx.walletTransaction.create({
        data: {
          walletId: newWallet.id,
          reference: `WELCOME-${Date.now()}-${user.id}`,
          type: "DEPOSIT",
          status: "SUCCESS",
          amount: 1000,
        },
      });

      return newWallet;
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
    console.error("Wallet creation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create wallet.",
      },
      {
        status: 500,
      }
    );
  }
}