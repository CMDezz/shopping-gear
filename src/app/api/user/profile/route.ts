// src/app/api/user/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@lib/infrastructure/middleware";
import { apiRateLimit } from "@lib/infrastructure/middleware";
import type { ApiResponse, User } from "@lib/shared/types";
import { userService } from "@lib/features/auth/services/auth.service";
import { JwtPayload } from "jsonwebtoken";

const getProfileHandler = async (req: NextRequest, user: JwtPayload) => {
  try {
    const userData = await userService.getUserById(user.userId);
    
    if (!userData) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    const response: ApiResponse<User> = {
      success: true,
      data: {
        id: userData._id.toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        createdAt: userData.createdAt.toISOString(),
        updatedAt: userData.updatedAt.toISOString(),
      },
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
