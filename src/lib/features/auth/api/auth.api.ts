import { api } from '@/lib/infrastructure/api'
import type {
    LoginRequest,
    RegisterRequest,
    AuthResponse,
    ApiResponse,
} from '@/lib/shared/types'
import { PublicUser } from '../models'

// Auth API services
export const authApi = {
    // Login using HTTP API
    login: async (
        credentials: LoginRequest
    ): Promise<ApiResponse<AuthResponse>> => {
        return api.post('/auth/login', credentials)
    },

    // Register using HTTP API
    register: async (
        userData: RegisterRequest
    ): Promise<ApiResponse<AuthResponse>> => {
        return api.post('/auth/register', userData)
    },

    // Logout using HTTP API
    logout: async (): Promise<ApiResponse<null>> => {
        return api.post('/auth/logout')
    },
}

// User API services
export const userApi = {
    // Get user profile using HTTP API
    getProfile: async (): Promise<ApiResponse<PublicUser>> => {
        return api.get('/user/profile')
    },

    // Update user profile using HTTP API
    updateProfile: async (
        userData: PublicUser
    ): Promise<ApiResponse<PublicUser>> => {
        return api.put('/user/profile', userData)
    },
}
