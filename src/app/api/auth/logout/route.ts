// src/app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse } from '@/lib/shared/types'
import { authRateLimit } from '@/lib/infrastructure/middleware'
import { userService } from '@/lib/features/auth/user.service'
import { verifyRefreshToken } from '@/lib/utils'
import {
    NextResponseInternalError,
    NextResponseSuccess,
} from '@/lib/infrastructure/errors'

// POST /api/auth/logout
const logoutHandler = async (request: NextRequest) => {
    try {
        const refreshToken = request.cookies.get('refreshToken')?.value

        if (refreshToken) {
            // Verify refresh token to get user ID
            const payload = verifyRefreshToken(refreshToken)
            if (payload) {
                // Remove refresh token from database
                await userService.removeRefreshToken(
                    payload.userId,
                    payload.tokenId
                )
            }
        }

        const response: ApiResponse<null> = {
            success: true,
            data: null,
            message: 'Logout successful',
        }

        const nextResponse = NextResponseSuccess(response)

        // Clear cookies
        nextResponse.cookies.delete('authToken')
        nextResponse.cookies.delete('refreshToken')

        return nextResponse
    } catch (error) {
        console.error('Logout API error:', error)
        return NextResponseInternalError({ error: (error as Error).message })
    }
}

export const POST = authRateLimit(logoutHandler)
