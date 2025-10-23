import { dbManager } from '@/lib/infrastructure'
import { ProductService, ProductDocument } from './product.model'
import { productRepository } from './product.repository'
import { CreateProductData, ProductSearchParams } from './product.types'
export const productService: ProductService = {
    async getList(params: ProductSearchParams): Promise<ProductDocument[]> {
        //do something with the keyword
        const serializedKeyword = params.keyword
        return productRepository.getList({
            ...params,
            keyword: serializedKeyword,
        })
    },
    async getById(id: string): Promise<ProductDocument | null> {
        return productRepository.getById(id)
    },
    async createProduct(params: CreateProductData): Promise<ProductDocument> {
        // const imageBlob = params.imageBlob

        //do something convert blob to url
        const imageUrl = '/randomUrl'
        return await productRepository.create({ ...params, imageUrl: imageUrl })
    },
}
