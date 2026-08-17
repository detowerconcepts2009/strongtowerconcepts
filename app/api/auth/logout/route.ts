import { NextResponse } from "next/server";
import { deleteCurrentSession } from "@/lib/session";

export async function POST() {
  try {
    await deleteCurrentSession();

    return NextResponse.json(
      {
        success: true,
        message: "Logout successful.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to logout.",
      },
      {
        status: 500,
      }
    );
  }
}