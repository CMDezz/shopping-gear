// src/libs/middleware/serverActions.ts
import { z } from 'zod'
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/lib/utils'

export function withValidation<T extends z.ZodSchema>(
    schema: T,
    handler: (data: z.infer<T>) => Promise<{
        success: boolean
        message?: string
        error?: string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?: any
    }>
) {
    return async (formData: FormData) => {
        try {
            // Convert FormData to object
            const data = Object.fromEntries(formData.entries())

            // Validate with Zod
            const validatedData = schema.parse(data)

            // Execute handler
            return await handler(validatedData)
        } catch (error) {
            if (error instanceof z.ZodError) {
                return {
                    success: false,
                    error: error.issues[0].message,
                }
            }

            return {
                success: false,
                error: 'An unexpected error occurred',
            }
        }
    }
}

export function withAuthServerAction<T extends z.ZodSchema>(
    schema: T,
    handler: (
        data: z.infer<T>,
        userId: string
    ) => Promise<{
        success: boolean
        message?: string
        error?: string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?: any
    }>
) {
    return async (formData: FormData) => {
        try {
            // Get token from cookies
            const cookieStore = await cookies()
            const token = cookieStore.get('authToken')?.value

            if (!token) {
                return {
                    success: false,
                    error: 'Authentication required',
                }
            }

            // Verify token
            const payload = verifyAccessToken(token)
            if (!payload) {
                return {
                    success: false,
                    error: 'Invalid or expired token',
                }
            }

            // Convert FormData to object
            const data = Object.fromEntries(formData.entries())

            // Validate with Zod
            const validatedData = schema.parse(data)

            // Execute handler with user ID
            return await handler(validatedData, payload.userId)
        } catch (error) {
            if (error instanceof z.ZodError) {
                return {
                    success: false,
                    error: error.issues[0].message,
                }
            }

            return {
                success: false,
                error: 'An unexpected error occurred',
            }
        }
    }
}
