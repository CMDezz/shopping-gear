// src/app/api/user/profile/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@lib/infrastructure/middleware'
import { apiRateLimit } from '@lib/infrastructure/middleware'
import type { ApiResponse, User } from '@lib/shared/types'
import { userService } from '@/lib/features/auth/user.service'
import { JwtPayload } from 'jsonwebtoken'
import {
    NextResponseInternalError,
    NextResponseNotFound,
    NextResponseSuccess,
} from '@/lib/infrastructure/errors'

const getProfileHandler = async (req: NextRequest) => {
    try {
        const userData = await userService.getUserById(req.user.userId)

        if (!userData) {
            return NextResponseNotFound({
                message: 'User not found',
            })
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
            message: 'Profile retrieved successfully',
        }

        return NextResponseSuccess(response)
    } catch (error) {
        console.error('Get profile API error:', error)

        return NextResponseInternalError({ error: (error as Error).message })
    }
}

export const GET = apiRateLimit(withAuth(getProfileHandler))
