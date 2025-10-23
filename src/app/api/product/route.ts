import { ProductDocument } from '@/lib/features/products/product.model'
import { productService } from '@/lib/features/products/product.service'
import { CreateProductData } from '@/lib/features/products/product.types'
import { apiRateLimit, withAuth } from '@/lib/infrastructure'
import {
    NextResponseInternalError,
    NextResponseSuccess,
} from '@/lib/infrastructure/errors'
import { ApiResponse } from '@/lib/shared'
import { NextRequest, NextResponse } from 'next/server'

const createProductHandler = async (
    req: NextRequest
): Promise<NextResponse> => {
    try {
        const data = (await req.json()) as CreateProductData

        const result = await productService.createProduct(data)
        return NextResponseSuccess({
            data: result,
        })
    } catch (error) {
        return NextResponseInternalError({
            error: (error as Error).message,
        })
    }
}

export const POST = apiRateLimit(withAuth(createProductHandler))
