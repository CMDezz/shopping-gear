'use client'
import React from 'react'
import { Button } from '@/components/atoms'
import { Input } from '@/components/atoms/Input/Input'
import { Label } from '@/components/atoms/Label/Label'
import { TextArea } from '@/components/atoms/TextArea/TextArea'
import { Card, CardContent, CardHeader } from '@/components/molecules'
import { createProductAction } from '@/lib/features/products/product.actions'
import { toast } from 'sonner'

function CreateProduct() {
    const submitActionCreate = async (formData: FormData) => {
        const result = await createProductAction(formData)
        console.log(result)

        if (result.success) {
            toast.error('Success fully')
        } else {
            toast.error('Failed to create product')
        }
    }
    return (
        <div className="flex items-center justify-center p-5">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <h5>CreateProduct</h5>
                </CardHeader>
                <CardContent>
                    <form action={submitActionCreate}>
                        <div className="mx-3 my-2 flex gap-3">
                            <Label htmlFor="product-name">Product name</Label>
                            <Input
                                id="product-name"
                                name="name"
                                required
                                placeholder="enter product name"
                            />
                        </div>
                        <div className="mx-3 my-2 flex gap-3">
                            <Label htmlFor="product-price">Product price</Label>
                            <Input
                                id="product-price"
                                name="price"
                                required
                                type="number"
                                placeholder="enter product name"
                            />
                        </div>
                        <div className="mx-3 my-2 flex gap-3">
                            <Label htmlFor="product-description">
                                Product description
                            </Label>
                            <TextArea
                                id="product-description"
                                name="description"
                                required
                                placeholder="enter product name"
                            />
                        </div>
                        <Input
                            type="file"
                            placeholder="Pick image"
                            accept="image/*"
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateProduct
