import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/controllers/userController";

// user register route
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data.FullName || !data.Email || !data.Password) {
      return NextResponse.json(
        {
          status: 400,
          message: "Fullname, Email and password are required",
        },
        { status: 400 }
      );
    }

    const register_result = await registerUser(data);
    return NextResponse.json(
      {
        message: register_result.message,
        user: register_result.user,
        error: register_result.error,
      },
      { status: register_result.status }
    );
  } catch (error) {
    console.error("Register API Route Error:", error);
    return NextResponse.json(
      {
        status: 500,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
