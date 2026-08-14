import { NextResponse } from "next/server";
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

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone,
          role: user.role,
          status: user.status,
          profileImageUrl:
            user.profileImageUrl || null,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("User profile error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load user profile.",
      },
      {
        status: 500,
      }
    );
  }
}