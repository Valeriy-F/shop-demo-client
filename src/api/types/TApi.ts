export type ResponseError = {
    message: string
    property: string | null
}

export type ResponseInfo<T> = {
    status: number
    statusText: string
    errors: ResponseError[]
    data: T
}