import { api } from '@/libs/api/client';
import type { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  ApiResponse 
} from '@/libs/types/api';

// Auth API services
export const authApi = {
  // Login using HTTP API
  login: async (credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    return api.post('/auth/login', credentials);
  },

  // Register using HTTP API
  register: async (userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    return api.post('/auth/register', userData);
  },

  // Logout using HTTP API
  logout: async (): Promise<ApiResponse<null>> => {
    return api.post('/auth/logout');
  },
};
