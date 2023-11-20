import ApiException from './exceptions/ApiException';
import ClientErrorException from './exceptions/ClientErrorException';
import ConflictException from './exceptions/ConflictException';
import InternalServerErrorException from './exceptions/InternalServerErrorException';
import NotFoundException from './exceptions/NotFoundException';
import { ResponseInfo } from './types/TApi';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const validateResponseInfo = <T>(responseInfo: ResponseInfo<T>) => {
    if (responseInfo.status >= 500) {
        throw new InternalServerErrorException('Somthing went wrong!')
    }

    if (responseInfo.status === 404) {
        throw new NotFoundException<T>(responseInfo)
    }

    if (responseInfo.status === 409) {
        throw new ConflictException<T>(responseInfo)
    }

    if (responseInfo.status >= 400) {
        throw new ClientErrorException<T>(responseInfo)
    }
}

const getResponseData = <T>(responseInfo: ResponseInfo<T>): T => {
    validateResponseInfo<T>(responseInfo)

    return responseInfo.data
}

const createExceptionByError = (error: any): Error => {
    console.error(error);

    return (error instanceof ApiException) ? error : new ApiException(`Error occurred during sending request.`, error)
}

const client = axios.create({
    baseURL: 'http://0.0.0.0:3001/api',
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
