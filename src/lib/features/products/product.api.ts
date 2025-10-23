import { api } from '@/lib/infrastructure/api'
import type { ApiResponse } from '@/lib/shared/types'
import { CreateProductData } from './product.types'

// Product API services
export const productApi = {
    // Get all products
    getProducts: async (page = 1, limit = 10): Promise<ApiResponse<any[]>> => {
        return api.get(`/products?page=${page}&limit=${limit}`)
    },

    // Get product by ID
    getProduct: async (id: string): Promise<ApiResponse<any>> => {
        return api.get(`/products/${id}`)
    },

    // Create product (admin only)
    createProduct: async (
        productData: CreateProductData
    ): Promise<ApiResponse<any>> => {
        return api.post('/products', productData)
    },

    // Update product (admin only)
    updateProduct: async (
        id: string,
        productData: any
    ): Promise<ApiResponse<any>> => {
        return api.put(`/products/${id}`, productData)
    },

    // Delete product (admin only)
    deleteProduct: async (id: string): Promise<ApiResponse<null>> => {
        return api.delete(`/products/${id}`)
    },
}
