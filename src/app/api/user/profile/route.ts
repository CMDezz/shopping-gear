// src/app/api/user/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/libs/middleware/auth";
import { apiRateLimit } from "@/libs/middleware/rateLimit";
import type { ApiResponse, User } from "@/libs/types/api";
import { JwtPayload } from "jsonwebtoken";

const mockUser: User = {
  id: "1",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const getProfileHandler = async (req: NextRequest, user: JwtPayload) => {
  try {
    const response: ApiResponse<User> = {
      success: true,
      data: mockUser,
      message: "Profile retrieved successfully",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Get profile API error:", error);

    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        data: null,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
};

export const GET = apiRateLimit(withAuth(getProfileHandler));
