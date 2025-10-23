// src/app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/lib/shared/types';
import { authRateLimit } from '@/lib/infrastructure/middleware';
import { userService } from '@/lib/features/auth/services/auth.service';
import { verifyRefreshToken } from '@/lib/core/utils';

// POST /api/auth/logout
const logoutHandler = async (request: NextRequest) => {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (refreshToken) {
      // Verify refresh token to get user ID
      const payload = verifyRefreshToken(refreshToken);
      if (payload) {
        // Remove refresh token from database
        await userService.removeRefreshToken(payload.userId, payload.tokenId);
      }
    }

    const response: ApiResponse<null> = {
      success: true,
      data: null,
      message: 'Logout successful',
    };

    const nextResponse = NextResponse.json(response);
    
    // Clear cookies
    nextResponse.cookies.delete('authToken');
    nextResponse.cookies.delete('refreshToken');

    return nextResponse;
  } catch (error) {
    console.error('Logout API error:', error);
    
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

export const POST = authRateLimit(logoutHandler);
