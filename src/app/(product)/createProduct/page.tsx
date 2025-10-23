'use client'
import React from 'react'
import { Button } from '@/components/atoms'
import { Input } from '@/components/atoms/Input/Input'
import { Label } from '@/components/atoms/Label/Label'
import { TextArea } from '@/components/atoms/TextArea/TextArea'
import { Card, CardContent, CardHeader } from '@/components/molecules'

function CreateProduct() {
    const submitActionCreate = async (formData: FormData) => {}
    return (
        <div className="flex items-center justify-center p-5">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <h5>CreateProduct</h5>
                </CardHeader>
                <CardContent>
                    <form action={submitActionCreate}>
                        <div className="mx-3 my-2 flex gap-3">
                            <Label>Product name</Label>
                            <Input placeholder="enter product name" />
                        </div>
                        <div className="mx-3 my-2 flex gap-3">
                            <Label>Product price</Label>
                            <Input placeholder="enter product name" />
                        </div>
                        <div className="mx-3 my-2 flex gap-3">
                            <Label>Product description</Label>
                            <TextArea placeholder="enter product name" />
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
