export interface PublicProduct {
    name: string
    price: number
    description: string
    imageUrl?: string
}

export interface CreateProductData {
    name: string
    price: number
    description: string
    imageBlob?: string
    imageUrl?: string
}

export interface UpdateProductData {
    _id: string
    name: string
    price: number
    description: string
    imageBlob?: string
}
export interface ProductSearchParams {
    _id?: string
    keyword?: string
    collection?: string
    limit?: number
    offset?: number
}
