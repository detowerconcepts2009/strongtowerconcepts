import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { getCurrentUser } from "@/lib/auth";
import { deleteAllUserSessions } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const currentPassword = String(
      body.currentPassword || ""
    );

    const newPassword = String(
      body.newPassword || ""
    );

    const confirmPassword = String(
      body.confirmPassword || ""
    );

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All password fields are required.",
        },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message:
            "New password must be at least 8 characters long.",
        },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "New passwords do not match.",
        },
        { status: 400 }
      );
    }

    const databaseUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        passwordHash: true,
      },
    });

    if (!databaseUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User account could not be found.",
        },
        { status: 404 }
      );
    }

    const currentPasswordMatches =
      await bcrypt.compare(
        currentPassword,
        databaseUser.passwordHash
      );

    if (!currentPasswordMatches) {
      return NextResponse.json(
        {
          success: false,
          message: "Current password is incorrect.",
        },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        {
          success: false,
          message:
            "New password must be different from your current password.",
        },
        { status: 400 }
      );
    }

    const newPasswordHash = await bcrypt.hash(
      newPassword,
      12
    );

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash: newPasswordHash,
      },
    });

    await deleteAllUserSessions(user.id);

    return NextResponse.json(
      {
        success: true,
        message:
          "Password changed successfully. Please log in again.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Change password error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to change password.",
      },
      { status: 500 }
    );
  }
}