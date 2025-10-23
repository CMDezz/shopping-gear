import { api } from '@/lib/infrastructure/api';
import type { ApiResponse } from '@/lib/shared/types';

// Order API services
export const orderApi = {
  // Get user orders
  getOrders: async (): Promise<ApiResponse<any[]>> => {
    return api.get('/orders');
  },

  // Get order by ID
  getOrder: async (id: string): Promise<ApiResponse<any>> => {
    return api.get(`/orders/${id}`);
  },

  // Create order
  createOrder: async (orderData: any): Promise<ApiResponse<any>> => {
    return api.post('/orders', orderData);
  },

  // Update order status (admin only)
  updateOrderStatus: async (id: string, status: string): Promise<ApiResponse<any>> => {
    return api.patch(`/orders/${id}/status`, { status });
  },
};
