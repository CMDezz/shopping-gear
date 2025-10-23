import 'server-only'
import { ObjectId } from 'mongodb'
import {
    CreateProductData,
    ProductSearchParams,
    UpdateProductData,
} from './product.types'

export interface Product {
    _id?: string
    name: string
    price: number
    description: string
    imageUrl?: string
}

export interface ProductDocument extends Omit<Product, '_id'> {
    _id: string
}

export interface ProductRepository {
    getList(params: ProductSearchParams): Promise<Array<ProductDocument>>
    getById(id: string): Promise<ProductDocument | null>
    create(params: CreateProductData): Promise<ProductDocument>
    // update(data: UpdateProductData): Promise<ProductDocument>
    // findById(id: string): Promise<ProductDocument | null>
    // deleteOne(id: string): Promise<boolean>
    // deleteMany(ids: Array<string>): Promise<boolean>
}

export interface ProductService {
    getList(params: ProductSearchParams): Promise<ProductDocument[]>
    getById(id: string): Promise<ProductDocument | null>
    createProduct(params: CreateProductData): Promise<ProductDocument>
    // updateProduct(data: UpdateProductData): Promise<ProductDocument>
    // findById(id: string): Promise<ProductDocument | null>
    // deleteOne(id: string): Promise<boolean>
    // deleteMany(ids: Array<string>): Promise<boolean>
}
