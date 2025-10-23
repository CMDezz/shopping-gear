// src/libs/middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server'
import { ApiResponse } from '@/lib/shared/types'
import { verifyAccessToken, JWTPayload } from '@/lib/utils'
import { NextResponseUnauthorized } from '../errors'

export function withAuth(handler: (req: NextRequest) => Promise<NextResponse>) {
    return async (req: NextRequest) => {
        try {
            const token =
                req.cookies.get('authToken')?.value ||
                req.headers.get('authorization')?.replace('Bearer ', '')

            if (!token) {
                return NextResponseUnauthorized({
                    message: "Don't have token to access resource",
                })
            }

            const user = verifyAccessToken(token)
            if (!user) {
                return NextResponseUnauthorized({
                    message: 'Session was expired, please login again',
                })
            }
            //asign user to request context
            req.user = user

            return handler(req)
        } catch (error) {
            return NextResponseUnauthorized({
                message: "You don't have permission to access this resource",
            })
        }
    }
}
