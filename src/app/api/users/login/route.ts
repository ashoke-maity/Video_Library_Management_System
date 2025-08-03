// app/api/users/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/controllers/userController";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.Email || !data.Password) {
      return NextResponse.json(
        { message: "Email and Password are required" },
        { status: 400 }
      );
    }

    const result = await loginUser({Email:data.Email,Password:data.Password});

    return NextResponse.json(
      {
        message: result.message,
        user: result.user,
        error: result.error,
      },
      { status: result.status }
    );
  } catch (error) {
    console.error("Login API Route Error:", error);
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
