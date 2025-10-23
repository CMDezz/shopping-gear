// src/app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server'
import type { AuthResponse, ApiResponse } from '@/lib/shared/types'
import { authRateLimit } from '@/lib/infrastructure/middleware'
import { userService } from '@/lib/features/auth/user.service'
import { generateTokenPair, verifyRefreshToken } from '@/lib/utils'
import {
    NextResponseInternalError,
    NextResponseSuccess,
    NextResponseUnauthorized,
} from '@/lib/infrastructure/errors'

// POST /api/auth/refresh
const refreshHandler = async (request: NextRequest) => {
    try {
        const refreshToken = request.cookies.get('refreshToken')?.value

        if (!refreshToken) {
            return NextResponseUnauthorized({
                message: 'Refresh token not found',
            })
        }

        // Verify refresh token
        const payload = verifyRefreshToken(refreshToken)
        if (!payload) {
            return NextResponseUnauthorized({
                message: 'Invalid refresh token',
            })
        }

        // Find user
        const user = await userService.getUserById(payload.userId)
        if (!user) {
            return NextResponseUnauthorized({
                message: 'User not found',
            })
        }

        // Check if refresh token exists in user's token list
        if (!user.refreshTokens?.includes(payload.tokenId)) {
            return NextResponseUnauthorized({
                message: 'Refresh token not valid',
            })
        }

        // Generate new tokens
        const {
            accessToken,
            refreshToken: newRefreshToken,
            tokenId: newTokenId,
        } = generateTokenPair({
            _id: user._id.toString(),
            email: user.email,
        })

        // Remove old refresh token and add new one
        await userService.removeRefreshToken(
            user._id.toString(),
            payload.tokenId
        )
        await userService.addRefreshToken(user._id.toString(), newTokenId)

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
        }

        const nextResponse = NextResponseSuccess(response)
        nextResponse.cookies.set('authToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60, // 15 minutes
        })

        nextResponse.cookies.set('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
        })

        return nextResponse
    } catch (error) {
        console.error('Refresh token API error:', error)
        return NextResponseInternalError({
            error: (error as Error).message,
        })
    }
}

export const POST = authRateLimit(refreshHandler)
