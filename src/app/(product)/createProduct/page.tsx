'use client'
import React from 'react'
import { Button } from '@/components/atoms'
import { Card, CardContent, CardHeader } from '@/components/molecules'
import { createProductAction } from '@/lib/features/products/product.actions'
import { toast } from 'sonner'
import { Controller, useForm } from 'react-hook-form'
import { CreateProductFormData, createProductSchema } from '@/lib/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import InputWithLabel from '@/components/molecules/FormFields/InputWithLabelTop'
import { keydownPreventUnexpectedInputNumber } from '@/lib/utils'

function CreateProduct() {
    const { handleSubmit, control } = useForm<CreateProductFormData>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            price: 1,
            name: '',
            description: '',
        },
    })
    const submitActionCreate = async (data: CreateProductFormData) => {
        const result = await createProductAction(data)
        console.log(result)

        if (result.success) {
            toast.success('Success fully')
        } else {
            toast.error('Failed to create product')
        }
    }
    return (
        <div className="flex items-center justify-center p-5">
            <Card className="">
                <CardHeader>
                    <h5>CreateProduct</h5>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(submitActionCreate)}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <InputWithLabel
                                        field={field}
                                        fieldState={fieldState}
                                        label="Name"
                                    />
                                )
                            }}
                        />
                        <Controller
                            name="description"
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <InputWithLabel
                                        field={field}
                                        fieldState={fieldState}
                                        label="Description"
                                    />
                                )
                            }}
                        />
                        <Controller
                            name="price"
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <InputWithLabel
                                        onKeyDown={
                                            keydownPreventUnexpectedInputNumber
                                        }
                                        field={field}
                                        type="number"
                                        fieldState={fieldState}
                                        label="Price"
                                    />
                                )
                            }}
                        />
                        <Button type="submit">Submit ne</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateProduct
