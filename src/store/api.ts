import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ResponseHandler, ResponseInfo } from 'api'

const responseHandler = async (response: Response) => {
    try {
        return await response.json()
    } catch (error) {
        return response
    }
}
const transformResponse = <TData>(response: ResponseInfo<TData>) => response.data
const transformErrorResponse = <TData>(response: any): ResponseInfo<TData> => {
    return (ResponseHandler.isResponseInfoType(response.data))
        ? response.data
        : ResponseHandler.createResponseInfo(response)
}
const providesTagsList = <R extends { name: string | number }[], T extends string>(resultsWithIds: R | undefined, tagType: T) => {
        return resultsWithIds
            ? [
                { type: tagType, name: 'LIST' },
                ...resultsWithIds.map(({ name }) => ({ type: tagType, name })),
            ]
            : [{ type: tagType, name: 'LIST' }]
    }

const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: [],
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
    endpoints: builder => ({})
})

export { baseApi, responseHandler, transformResponse, transformErrorResponse, providesTagsList }
