import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ModelResponseError } from 'model/error'
import { ResponseInfo } from './types/api'

const validateResponseInfo = <T>(responseInfo: ResponseInfo<T>) => {
    if (responseInfo.status >= 400) {
        throw ModelResponseError.create(responseInfo)
    }
}

const getResponseData = <T>(responseInfo: ResponseInfo<T>): T => {
    validateResponseInfo<T>(responseInfo)

    return responseInfo.data
}

const createExceptionByError = (error: any): Error => {
    return (error instanceof ModelResponseError) ? error : new ModelResponseError(`Error occurred during sending request.`, error)
}

const client = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    validateStatus: (status: number) => (status < 600)
})

const Get = async <T extends unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
        const response: AxiosResponse<ResponseInfo<T>> = await client.get(url, config)

        return getResponseData(response.data)
    } catch (error: any) {
        throw createExceptionByError(error)
    }
}

const Post = async<TReq, TRes>(url: string, data: TReq): Promise<TRes> => {
    try {
        const response: AxiosResponse<ResponseInfo<TRes>> = await client.post(url, data)

        return getResponseData<TRes>(response.data)
    } catch (error) {
        throw createExceptionByError(error)
    }
}

const Put = async<TReq, TRes>(url: string, data: TReq): Promise<TRes> => {
    try {
        const response: AxiosResponse<ResponseInfo<TRes>> = await client.put(url, data)

        return getResponseData<TRes>(response.data)
    } catch (error) {
        throw createExceptionByError(error)
    }
}

const Patch = async<TReq, TRes>(url: string, data: TReq): Promise<TRes> => {
    try {
        const response: AxiosResponse<ResponseInfo<TRes>> = await client.patch(url, data);

        return getResponseData<TRes>(response.data);
    } catch (error) {
        throw createExceptionByError(error);
    }
}

const Delete = async <TRes>(url: string) => {
    try {
        const response: AxiosResponse<ResponseInfo<TRes>> = await client.delete(url)

        validateResponseInfo<TRes>(response.data)
    } catch (error: any) {
        throw createExceptionByError(error)
    }
}

const Client = {
    Get,
    Post,
    Put,
    Patch,
    Delete
}

export default Client
