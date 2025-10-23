// src/libs/schemas/product.ts
import { z } from 'zod'

export const productSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z
        .string()
        .min(10, 'Description must be at least 10 characters'),
    price: z.coerce.number().positive('Price must be positive'),
    //   category: z.string().min(1, 'Category is required'),
    //   imageUrl: z.string().url('Invalid image URL').optional(),
})

export const createProductSchema = productSchema
export const updateProductSchema = productSchema.partial()

export type ProductFormData = z.infer<typeof productSchema>
export type CreateProductFormData = z.infer<typeof createProductSchema>
export type UpdateProductFormData = z.infer<typeof updateProductSchema>
