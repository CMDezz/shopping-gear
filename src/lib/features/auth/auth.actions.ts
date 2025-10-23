'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { loginSchema, registerSchema } from '@/lib/shared/schemas'
import {
    withValidation,
    withAuthServerAction,
} from '@/lib/infrastructure/middleware'
import { userService } from './user.service'
import { generateTokenPair, verifyAccessToken } from '@/lib/utils'

// Server Action: Login with validation middleware
export const loginAction = withValidation(loginSchema, async (data) => {
    try {
        // Find user by email
        const user = await userService.getUserByEmail(data.email)

        if (!user) {
            return {
                success: false,
                error: 'Invalid email or password',
            }
        }

        // Validate password
        const isValidPassword = await userService.validatePassword(
            user,
            data.password
        )

        if (!isValidPassword) {
            return {
                success: false,
                error: 'Invalid email or password',
            }
        }

        // Generate tokens
        const { accessToken, refreshToken, tokenId } = generateTokenPair({
            _id: user._id.toString(),
            email: user.email,
        })

        // Store refresh token in database
        await userService.addRefreshToken(user._id.toString(), tokenId)

        // Set cookies
        const cookieStore = await cookies()
        cookieStore.set('authToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60, // 15 minutes
        })

        cookieStore.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
        })

        console.log('Login successful for user:', user.email)

        return {
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id.toString(),
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
            },
        }
    } catch (error) {
        console.error('Login error:', error)
        return {
            success: false,
            error: 'An unexpected error occurred',
        }
    }
})

// Server Action: Register with validation middleware
export const registerAction = withValidation(registerSchema, async (data) => {
    try {
        // Check if user already exists
        const existingUser = await userService.getUserByEmail(data.email)
        if (existingUser) {
            return {
                success: false,
                error: 'User with this email already exists',
            }
        }

        // Create new user
        const newUser = await userService.createUser({
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
        })

        // Generate tokens
        const { accessToken, refreshToken, tokenId } = generateTokenPair({
            _id: newUser._id.toString(),
            email: newUser.email,
        })

        // Store refresh token in database
        await userService.addRefreshToken(newUser._id.toString(), tokenId)

        // Set cookies
        const cookieStore = await cookies()
        cookieStore.set('authToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60, // 15 minutes
        })

        cookieStore.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
        })

        console.log('Registration successful for user:', newUser.email)

        return {
            success: true,
            message: 'Registration successful',
            data: {
                user: {
                    id: newUser._id.toString(),
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                },
            },
        }
    } catch (error) {
        console.error('Registration error:', error)
        return {
            success: false,
            error: 'An unexpected error occurred',
        }
    }
})

// Server Action: Logout
export async function logoutAction(): Promise<void> {
    try {
        const cookieStore = await cookies()
        const refreshToken = cookieStore.get('refreshToken')?.value

        if (refreshToken) {
            const payload = verifyAccessToken(refreshToken)
            if (payload) {
                await userService.removeRefreshToken(
                    payload.userId,
                    refreshToken
                )
            }
        }

        // Clear cookies
        cookieStore.delete('authToken')
        cookieStore.delete('refreshToken')

        console.log('User logged out')
        revalidatePath('/')
        redirect('/login')
    } catch (error) {
        console.error('Logout error:', error)
        // Still redirect even if there's an error
        revalidatePath('/')
        redirect('/login')
    }
}

// Server Action: Get User Profile with auth middleware
export const getUserProfileAction = withAuthServerAction(
    registerSchema.pick({}), // Empty schema for auth-only actions
    async (data, userId) => {
        try {
            const user = await userService.getUserById(userId)

            if (!user) {
                return {
                    success: false,
                    error: 'User not found',
                }
            }

            return {
                success: true,
                data: {
                    id: user._id.toString(),
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    createdAt: user.createdAt.toISOString(),
                    updatedAt: user.updatedAt.toISOString(),
                },
            }
        } catch (error) {
            console.error('Get user profile error:', error)
            return {
                success: false,
                error: 'Failed to fetch user profile',
            }
        }
    }
)
