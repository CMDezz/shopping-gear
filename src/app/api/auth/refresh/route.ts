// src/app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server';
import type { AuthResponse, ApiResponse } from '@/lib/shared/types';
import { authRateLimit } from '@/lib/infrastructure/middleware';
import { userService } from '@/lib/features/auth/services/auth.service';
import { generateTokenPair, verifyRefreshToken } from '@/lib/core/utils';

// POST /api/auth/refresh
const refreshHandler = async (request: NextRequest) => {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error: 'Refresh token not found',
        },
        { status: 401 }
      );
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error: 'Invalid refresh token',
        },
        { status: 401 }
      );
    }

    // Find user
    const user = await userService.getUserById(payload.userId);
    if (!user) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error: 'User not found',
        },
        { status: 401 }
      );
    }

    // Check if refresh token exists in user's token list
    if (!user.refreshTokens?.includes(payload.tokenId)) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error: 'Refresh token not valid',
        },
        { status: 401 }
      );
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken, tokenId: newTokenId } = generateTokenPair({
      _id: user._id.toString(),
      email: user.email,
    });

    // Remove old refresh token and add new one
    await userService.removeRefreshToken(user._id.toString(), payload.tokenId);
    await userService.addRefreshToken(user._id.toString(), newTokenId);

    const response: ApiResponse<AuthResponse> = {
      success: true,
      data: {
        user: {
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        token: accessToken,
      },
      message: 'Token refreshed successfully',
    };

    const nextResponse = NextResponse.json(response);
    nextResponse.cookies.set('authToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes
    });

    nextResponse.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return nextResponse;
  } catch (error) {
    console.error('Refresh token API error:', error);
    
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        data: null,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
};

export const POST = authRateLimit(refreshHandler);
