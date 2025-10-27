import React from 'react'
import { Field, FieldError, FieldLabel } from '@components/molecules'
import { Input, InputProps } from '@/components/atoms'
import {
    ControllerFieldState,
    ControllerRenderProps,
    FieldValues,
    // UseFormStateReturn,
} from 'react-hook-form'
import clsx from 'clsx'

type RHFRenderProps<T extends FieldValues> = {
    field: ControllerRenderProps<T, any>
    fieldState: ControllerFieldState
    // formState?: UseFormStateReturn<T>
}

type ComponentProps<T extends FieldValues> = RHFRenderProps<T> & {
    label: string
    fieldClassName?: string
} & InputProps
function InputWithLabelTop<T extends FieldValues>({
    field,
    fieldState,
    // formState,
    label,
    fieldClassName,
    ...inputProps
}: ComponentProps<T>) {
    return (
        <Field
            className={clsx(
                'my-2 min-w-[150px] px-3 lg:min-w-[530px]',
                fieldClassName
            )}
            data-invalid={fieldState.invalid}
        >
            <FieldLabel htmlFor={inputProps.id || field.name}>
                {label}
            </FieldLabel>
            <Input
                {...field}
                id={inputProps.id || field.name} //should be filled for normal behavior with label
                aria-invalid={fieldState.invalid}
                {...inputProps}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )
}

export default InputWithLabelTop
