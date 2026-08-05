import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(
      {
        success: true,
        user: {
          id: "temporary-user",
          firstName: "Strong",
          lastName: "Tower User",
          fullName: "Strong Tower User",
          email: "customer@stc.com",
          role: "CUSTOMER",
          status: "ACTIVE",
          verified: false,
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
        message: "Unable to load user profile.",
      },
      {
        status: 500,
      }
    );
  }
}