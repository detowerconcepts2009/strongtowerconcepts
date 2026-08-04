import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {

  try {

    const body = await request.json();

    const {
      email,
      password,
    } = body;

    if (
      !email ||
      !password
    ) {

      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        {
          status: 400,
        }
      );

    }

const user = await prisma.user.findUnique({
  where: {
    email,
  },
});

    if (!user) {

      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );

    }
        const passwordMatches =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (!passwordMatches) {

      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );

    }

    if (
      user.status !== "ACTIVE" &&
      user.status !== "PENDING"
    ) {

      return NextResponse.json(
        {
          success: false,
          message: "Your account has been suspended. Please contact support.",
        },
        {
          status: 403,
        }
      );

    }
        return NextResponse.json(
      {
        success: true,

        message: "Login successful.",

        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          status: user.status,
          verified: user.verified,
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
        message: "Internal Server Error.",
      },
      {
        status: 500,
      }
    );

  }

}