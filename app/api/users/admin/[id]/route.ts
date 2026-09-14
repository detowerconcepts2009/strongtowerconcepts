import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN", "STAFF"];

const VALID_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "STAFF",
  "CUSTOMER",
  "PROPERTY_OWNER",
  "REALTOR",
] as const;

const VALID_STATUSES = [
  "PENDING",
  "ACTIVE",
  "SUSPENDED",
  "BLOCKED",
] as const;

async function requireUserManager() {
  const user = await getCurrentUser();

  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  if (!ADMIN_ROLES.includes(user.role)) {
    return {
      user: null,
      response: NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      ),
    };
  }

  return {
    user,
    response: null,
  };
}

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  const auth = await requireUserManager();

  if (auth.response) {
    return auth.response;
  }

  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { error: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();

    const role =
      typeof body.role === "string" ? body.role : undefined;

    const status =
      typeof body.status === "string" ? body.status : undefined;

    if (!role && !status) {
      return NextResponse.json(
        { error: "No changes were provided" },
        { status: 400 }
      );
    }

    if (
      role &&
      !VALID_ROLES.includes(
        role as (typeof VALID_ROLES)[number]
      )
    ) {
      return NextResponse.json(
        { error: "Invalid user role" },
        { status: 400 }
      );
    }

    if (
      status &&
      !VALID_STATUSES.includes(
        status as (typeof VALID_STATUSES)[number]
      )
    ) {
      return NextResponse.json(
        { error: "Invalid account status" },
        { status: 400 }
      );
    }

    const targetUser = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        role: true,
        status: true,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (
      targetUser.role === "SUPER_ADMIN" &&
      auth.user?.role !== "SUPER_ADMIN"
    ) {
      return NextResponse.json(
        {
          error:
            "Only a SUPER_ADMIN can modify a SUPER_ADMIN account.",
        },
        { status: 403 }
      );
    }

    if (
      role === "SUPER_ADMIN" &&
      auth.user?.role !== "SUPER_ADMIN"
    ) {
      return NextResponse.json(
        {
          error:
            "Only a SUPER_ADMIN can assign the SUPER_ADMIN role.",
        },
        { status: 403 }
      );
    }

    if (
      id === auth.user?.id &&
      role &&
      !ADMIN_ROLES.includes(role)
    ) {
      return NextResponse.json(
        {
          error:
            "You cannot change your own role to a non-administrative role.",
        },
        { status: 400 }
      );
    }

    if (
      id === auth.user?.id &&
      status &&
      status !== "ACTIVE"
    ) {
      return NextResponse.json(
        {
          error:
            "You cannot suspend or block your own account.",
        },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(role ? { role: role as any } : {}),
        ...(status ? { status: status as any } : {}),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        verified: true,
        profileImageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User account updated successfully.",
      user: {
        ...updatedUser,
        createdAt: updatedUser.createdAt.toISOString(),
        updatedAt: updatedUser.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Admin user PATCH error:", error);

    return NextResponse.json(
      { error: "Failed to update user account" },
      { status: 500 }
    );
  }
}