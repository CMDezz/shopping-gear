import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import type { RegisterRequest, AuthResponse, ApiResponse } from '@/libs/types/api';
import { authRateLimit } from '@/libs/middleware/rateLimit';
import { UserModel } from '@/libs/models/User';
import { generateTokenPair } from '@/libs/utils/jwt';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

// POST /api/auth/register
const registerHandler = async (request: NextRequest) => {
  try {
    const body: RegisterRequest = await request.json();
    
    // Validate input
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await UserModel.findByEmail(validatedData.email);
    if (existingUser) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error: 'User with this email already exists',
        },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = await UserModel.create({
      email: validatedData.email,
      password: validatedData.password,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
    });

    // Generate tokens
    const { accessToken, refreshToken, tokenId } = generateTokenPair({
      _id: newUser._id.toString(),
      email: newUser.email,
    });

    // Store refresh token in database
    await UserModel.addRefreshToken(newUser._id.toString(), tokenId);
    
    const response: ApiResponse<AuthResponse> = {
      success: true,
      data: {
        user: {
          id: newUser._id.toString(),
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        },
        token: accessToken,
      },
      message: 'Registration successful',
    };

    // Set httpOnly cookies for tokens
    const nextResponse = NextResponse.json(response);
    nextResponse.cookies.set('authToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes
    });

    nextResponse.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return nextResponse;
  } catch (error) {
    console.error('Register API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          data: null,
          error: error.issues[0].message,
        },
        { status: 400 }
      );
    }
    
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

export const POST = authRateLimit(registerHandler);