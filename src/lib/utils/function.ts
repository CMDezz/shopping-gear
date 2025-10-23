type ParsedFormData = { [k: string]: FormDataEntryValue }
export const parseFormData = (formData: FormData): ParsedFormData => {
    const data = Object.fromEntries(formData.entries())
    return data
}
