// src/lib/features/auth/services/auth.service.ts
import bcrypt from 'bcryptjs'
import { userRepository } from './user.repository'
import type { UserDocument, UserService } from './user.model'
import { CreateUserData, UpdateUserData } from './user.types'

export const userService: UserService = {
    async createUser(userData: CreateUserData): Promise<UserDocument> {
        // Hash password
        const saltRounds = 12
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds)

        const userDataWithHashedPassword = {
            ...userData,
            password: hashedPassword,
        }

        return await userRepository.create(userDataWithHashedPassword)
    },

    async getUserByEmail(email: string): Promise<UserDocument | null> {
        return await userRepository.findByEmail(email)
    },

    async getUserById(id: string): Promise<UserDocument | null> {
        return await userRepository.findById(id)
    },

    async validatePassword(
        user: UserDocument,
        password: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, user.password)
    },

    async updateUserProfile(
        userId: string,
        updateData: UpdateUserData
    ): Promise<UserDocument | null> {
        return await userRepository.updateProfile(userId, updateData)
    },

    async addRefreshToken(userId: string, refreshToken: string): Promise<void> {
        return await userRepository.addRefreshToken(userId, refreshToken)
    },

    async removeRefreshToken(
        userId: string,
        refreshToken: string
    ): Promise<void> {
        return await userRepository.removeRefreshToken(userId, refreshToken)
    },

    async removeAllRefreshTokens(userId: string): Promise<void> {
        return await userRepository.removeAllRefreshTokens(userId)
    },
}
