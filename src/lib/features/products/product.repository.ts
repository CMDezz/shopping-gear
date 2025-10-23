import { dbManager } from '@/lib/infrastructure'
import { Product, ProductDocument, ProductRepository } from './product.model'
import { CreateProductData, ProductSearchParams } from './product.types'

export const productRepository: ProductRepository = {
    async getList(params: ProductSearchParams): Promise<ProductDocument[]> {
        const collection =
            await dbManager.getCollection<ProductDocument>('products')

        const query: Record<string, any> = {}
        const conditions = []

        if (params.keyword) {
            conditions.push({ name: { $regex: params.keyword, $options: 'i' } })
        }

        // if (params.collection) {
        //     conditions.push({ $regex: params.collection, $options: 'i' })
        // }
        if (conditions.length > 0) {
            query.$or = conditions
        }
        const limit = params.limit ?? undefined
        const offset = params.offset ?? undefined

        let result = collection.find(query)
        if (limit != undefined) {
            result = result.limit(limit)
            if (offset != undefined) result = result.skip(offset * limit)
        }

        return await result.toArray()
    },

    async getById(id: string): Promise<ProductDocument | null> {
        const collection =
            await dbManager.getCollection<ProductDocument>('products')

        return await collection.findOne({
            _id: id,
        })
    },
    async create(params: CreateProductData): Promise<ProductDocument> {
        const collection =
            await dbManager.getCollection<ProductDocument>('products')

        const product: Product = {
            name: params.name,
            description: params.description,
            price: params.price,
            imageUrl: '/',
        }
        const result = await collection.insertOne(params as ProductDocument)
        return { ...product, _id: result.insertedId.toString() }
    },
}
