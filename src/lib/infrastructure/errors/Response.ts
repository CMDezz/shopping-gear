import { ApiResponse } from '@/lib/shared'

const defaultSuccessResponse = {
    success: true,
    message: 'Successful',
}

const defaultErrorResponse = {
    success: false,
    data: null,
    error: 'Error response',
    message: 'Something went wrong!',
}

type Response<T = any> = Partial<ApiResponse<T>>
type ResponseError = Partial<ApiResponse<null>>

export const ResponseSuccess = <T>(response: Response<T>) => {
    return {
        ...defaultSuccessResponse,
        ...response,
    }
}

export const ResponseError = (response: ResponseError) => {
    return {
        ...defaultErrorResponse,
        ...response,
    }
}
