import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {

  try {

    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
    } = body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password
    ) {

      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );

    }

    const existingEmail =
      await prisma.user.findUnique({

        where: {
          email,
        },

      });

    if (existingEmail) {

      return NextResponse.json(
        {
          success: false,
          message: "Email already exists.",
        },
        {
          status: 409,
        }
      );

    }

    const existingPhone =
      await prisma.user.findUnique({

        where: {
          phone,
        },

      });

    if (existingPhone) {

      return NextResponse.json(
        {
          success: false,
          message: "Phone number already exists.",
        },
        {
          status: 409,
        }
      );

    }

    const passwordHash =
      await bcrypt.hash(password, 12);
         const user = await prisma.user.create({

      data: {

        firstName,

        lastName,

        email,

        phone,

        passwordHash,

        role: "CUSTOMER",

      },

    });

    const wallet = await prisma.wallet.create({

      data: {

        userId: user.id,

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

        message: "Registration successful.",

        userId: user.id,

        walletId: wallet.id,

        welcomeBonus: 1000,

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