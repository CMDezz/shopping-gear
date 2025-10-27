type ParsedFormData = { [k: string]: FormDataEntryValue }
export const parseFormData = (formData: FormData): ParsedFormData => {
    const data = Object.fromEntries(formData.entries())
    return data
}

export const keydownPreventUnexpectedInputNumber = (
    e: React.KeyboardEvent<HTMLInputElement>
) => {
    if (['e', 'E', '+', '-'].includes(e.key)) {
        e.preventDefault()
        return
    }
}
