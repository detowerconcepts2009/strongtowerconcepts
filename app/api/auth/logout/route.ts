import { NextResponse } from "next/server";

export async function POST() {

  try {

    const response = NextResponse.json(
      {
        success: true,
        message: "Logout successful.",
      },
      {
        status: 200,
      }
    );

    response.cookies.set({
      name: "stc_user_id",
      value: "",
      expires: new Date(0),
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });

    return response;

  } catch (error) {

    console.error(error);

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