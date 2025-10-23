'use server'
import { productSchema } from '@/lib/shared'
import { productService } from './product.service'
import { ProductSearchParams } from './product.types'
import { ResponseError, ResponseSuccess } from '@/lib/infrastructure/errors'
import { ProductDocument } from './product.model'
import { withValidation } from '@/lib/infrastructure'

const getListAction = async (params: ProductSearchParams) => {
    try {
        const result = await productService.getList(params)
        return ResponseSuccess<ProductDocument[]>({ data: result })
    } catch (error) {
        return ResponseError({
            error: (error as Error).message,
        })
    }
}

const getByIdAction = async (id: string) => {
    try {
        const result = await productService.getById(id)
        return ResponseSuccess<ProductDocument | null>({ data: result })
    } catch (error) {
        return ResponseError({
            error: (error as Error).message,
        })
    }
}

const createProductAction = withValidation(productSchema, async (data) => {
    try {
        const result = await productService.createProduct(data)
        return ResponseSuccess<ProductDocument>({ data: result })
    } catch (error) {
        return ResponseError({
            error: (error as Error).message,
        })
    }
})

export { getListAction, getByIdAction, createProductAction }
