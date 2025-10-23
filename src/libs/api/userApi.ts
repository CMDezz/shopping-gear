import { api } from '@/libs/api/client';
import type { 
  User, 
  ApiResponse 
} from '@/libs/types/api';

// User API services
export const userApi = {
  // Get user profile using HTTP API
  getProfile: async (): Promise<ApiResponse<User>> => {
    return api.get('/user/profile');
  },

  // Update user profile using HTTP API
  updateProfile: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    return api.put('/user/profile', userData);
  },
};
