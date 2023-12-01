export type ResponseError = {
    message: string,
    property: string | null
}

export type TStatusAware = {
    status: number,
    statusText: string
}

export type ResponseInfo<T = null> = {
    data: T,
    errors: ResponseError[]
} & TStatusAware
