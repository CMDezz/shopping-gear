import { ApiResponse } from '@/lib/shared'
import { NextResponse } from 'next/server'
import { success } from 'zod'

const STATUS_UNAUTHORIZED = 401
const STATUS_NOT_FOUND = 404
const STATUS_OK = 200
const STATUS_INTERNAL_ERROR = 500
const STATUS_BAD_REQUEST = 400
const STATUS_CONFLICT = 409
const STATUS_RATE_LIMIT = 429

const defaultResponseUnauthorized: ApiResponse<null> = {
    success: false,
    data: null,
    error: '401 Unauthorized',
    message: 'Unauthorized, please login again!',
}

const defaultResponseSuccess: ApiResponse<any> = {
    success: true,
    message: 'Successfull',
    data: [],
}

const defaultResponseInternalServerError: ApiResponse<null> = {
    success: false,
    data: null,
    error: '500 Internal server error',
    message: 'Something went wrong, please login again!',
}

const defaultResponseNotfound: ApiResponse<null> = {
    success: false,
    data: null,
    error: '404 Not found',
    message: 'Data not found, please try again!',
}

const defaultResponseBadRequest: ApiResponse<null> = {
    success: false,
    data: null,
    error: '400 Bad Request',
    message: 'Data not found, please try again!',
}

const defaultResponseConflict: ApiResponse<null> = {
    success: false,
    data: null,
    error: '409 Conflict',
    message: 'Values was conflict or dupplicated!',
}

const defaultResponseRateLimit: ApiResponse<null> = {
    success: false,
    data: null,
    error: '429 Rate Limit',
    message: 'Too many attemps, please hold on and try again later!',
}

type DefaultApiResponse<T = any> = Partial<ApiResponse<T>>
export const NextResponseSuccess = <T = any>(
    response: DefaultApiResponse = defaultResponseSuccess
) => {
    return NextResponse.json<DefaultApiResponse<T>>(response, {
        status: STATUS_OK,
    })
}

export const NextResponseUnauthorized = (
    response?: DefaultApiResponse<null>
) => {
    return NextResponse.json<DefaultApiResponse<null>>(
        { ...defaultResponseUnauthorized, ...response },
        {
            status: STATUS_UNAUTHORIZED,
        }
    )
}
export const NextResponseInternalError = (
    response?: DefaultApiResponse<null>
) => {
    return NextResponse.json<DefaultApiResponse<null>>(
        { ...defaultResponseInternalServerError, ...response },
        {
            status: STATUS_INTERNAL_ERROR,
        }
    )
}
export const NextResponseNotFound = (response?: DefaultApiResponse<null>) => {
    return NextResponse.json<DefaultApiResponse<null>>(
        { ...defaultResponseNotfound, ...response },
        {
            status: STATUS_NOT_FOUND,
        }
    )
}

export const NextResponseBadRequest = (response?: DefaultApiResponse<null>) => {
    return NextResponse.json<DefaultApiResponse<null>>(
        {
            ...defaultResponseBadRequest,
            ...response,
        },
        {
            status: STATUS_BAD_REQUEST,
        }
    )
}

export const NextResponseConflict = (response?: DefaultApiResponse<null>) => {
    return NextResponse.json<DefaultApiResponse<null>>(
        {
            ...defaultResponseConflict,
            ...response,
        },
        {
            status: STATUS_CONFLICT,
        }
    )
}

export const NextResponseRateLimit = (response?: DefaultApiResponse<null>) => {
    return NextResponse.json<DefaultApiResponse<null>>(
        {
            ...defaultResponseRateLimit,
            ...response,
        },
        {
            status: STATUS_RATE_LIMIT,
        }
    )
}
