import 'server-only'
import { ObjectId } from 'mongodb'
import { CreateUserData, UpdateUserData } from './publicTypes'

export interface User {
    _id?: ObjectId
    email: string
    password: string
    firstName: string
    lastName: string
    createdAt: Date
    updatedAt: Date
    refreshTokens?: string[]
}

export interface UserDocument extends Omit<User, '_id'> {
    _id: ObjectId
}

export interface UserRepository {
    create(userData: CreateUserData): Promise<UserDocument>
    findByEmail(email: string): Promise<UserDocument | null>
    findById(id: string): Promise<UserDocument | null>
    updateProfile(
        userId: string,
        updateData: UpdateUserData
    ): Promise<UserDocument | null>
    addRefreshToken(userId: string, refreshToken: string): Promise<void>
    removeRefreshToken(userId: string, refreshToken: string): Promise<void>
    removeAllRefreshTokens(userId: string): Promise<void>
}

export interface UserService {
    createUser(userData: CreateUserData): Promise<UserDocument>
    getUserByEmail(email: string): Promise<UserDocument | null>
    getUserById(id: string): Promise<UserDocument | null>
    validatePassword(user: UserDocument, password: string): Promise<boolean>
    updateUserProfile(
        userId: string,
        updateData: UpdateUserData
    ): Promise<UserDocument | null>
    addRefreshToken(userId: string, refreshToken: string): Promise<void>
    removeRefreshToken(userId: string, refreshToken: string): Promise<void>
    removeAllRefreshTokens(userId: string): Promise<void>
}
