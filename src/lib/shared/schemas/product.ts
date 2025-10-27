// src/libs/schemas/product.ts
import { z } from 'zod'

export const productSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z
        .string()
        .min(10, 'Description must be at least 10 characters'),
    price: z
        .transform(Number)
        .pipe(z.number().positive('price must be positive')),
})

export const createProductSchema = productSchema
export const updateProductSchema = productSchema.partial()

export type ProductFormData = z.infer<typeof productSchema>
export type CreateProductFormData = z.infer<typeof productSchema>
export type UpdateProductFormData = z.infer<typeof updateProductSchema>
