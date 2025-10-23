import { NextRequest, NextResponse } from 'next/server'
import { loginSchema } from '@lib/shared/schemas'
import { authRateLimit } from '@lib/infrastructure/middleware'
import type { LoginRequest, AuthResponse, ApiResponse } from '@lib/shared/types'
import { userService } from '@/lib/features/auth/auth.service'
import { generateTokenPair } from '@/lib/utils'
import {
    NextResponseBadRequest,
    NextResponseInternalError,
    NextResponseSuccess,
    NextResponseUnauthorized,
} from '@/lib/infrastructure/errors'

const loginHandler = async (req: NextRequest) => {
    try {
        const body: LoginRequest = await req.json()

        // Validate input
        const validatedData = loginSchema.parse(body)

        // Find user by email
        const user = await userService.getUserByEmail(validatedData.email)

        if (!user) {
            return NextResponseUnauthorized({
                message: 'Invalid email or password',
            })
        }

        // Validate password
        const isValidPassword = await userService.validatePassword(
            user,
            validatedData.password
        )

        if (!isValidPassword) {
            return NextResponseUnauthorized({
                message: 'Invalid email or password',
            })
        }

        // Generate tokens
        const { accessToken, refreshToken, tokenId } = generateTokenPair({
            _id: user._id.toString(),
            email: user.email,
        })

        // Store refresh token in database
        await userService.addRefreshToken(user._id.toString(), tokenId)

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
            message: 'Login successful',
        }

        const nextResponse = NextResponseSuccess(response)
        nextResponse.cookies.set('authToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60, // 15 minutes
        })

        nextResponse.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
        })

        return nextResponse
    } catch (error) {
        console.error('Login API error:', error)

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponseBadRequest({
                error: error.message,
                message: 'Validation error',
            })
        }

        return NextResponseInternalError({ error: (error as Error).message })
    }
}

// Apply rate limiting
export const POST = authRateLimit(loginHandler)
