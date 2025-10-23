import { ObjectId } from 'mongodb'

export interface Product {
    _id?: ObjectId
    name: string
    price: number
    description: string
    imageUrl?: string
    imageBlob?: Blob
    category?: string
}

export interface ProductDocument extends Omit<Product, '_id'> {
    _id: ObjectId
}

export const 