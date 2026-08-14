import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

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

    const wallet = await prisma.wallet.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        balance: true,
      },
    });

    if (!wallet) {
      return NextResponse.json(
        {
          success: true,
          balance: 0,
          transactions: [],
        },
        {
          status: 200,
        }
      );
    }

    const transactions =
      await prisma.walletTransaction.findMany({
        where: {
          walletId: wallet.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          reference: true,
          type: true,
          status: true,
          amount: true,
          createdAt: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        balance: wallet.balance,
        transactions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Wallet transactions error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load wallet transactions.",
      },
      {
        status: 500,
      }
    );
  }
}