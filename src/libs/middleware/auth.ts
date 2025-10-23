// src/libs/middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '../types/api';
import { verifyAccessToken, JWTPayload } from '../utils/jwt';

export function withAuth(handler: (req: NextRequest, user: JWTPayload) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      const token = req.cookies.get('authToken')?.value || 
                   req.headers.get('authorization')?.replace('Bearer ', '');

      if (!token) {
        return NextResponse.json<ApiResponse<null>>(
          { success: false, message: "Don't have token to access resource", error: 'Authentication required' },
          { status: 401 }
        );
      }

      const user = verifyAccessToken(token);
      if (!user) {
        return NextResponse.json<ApiResponse<null>>(
          { success: false, message: "Session was expired, please login again", error: 'Invalid token' },
          { status: 401 }
        );
      }

      return handler(req, user);
    } catch (error) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: "You don't have permission to access this resource", error: "Authentication failed" },
        { status: 401 }
      );
    }
  };
}