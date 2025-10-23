import type { JwtPayload } from '@/lib/core/utils/jwt'
import type { NextRequest } from 'next/server'

declare module 'next/server' {
    interface NextRequest {
        user?: JwtPayload
    }
}
