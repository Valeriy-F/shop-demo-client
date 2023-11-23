import { ResponseError, ResponseInfo } from './types/api'

const isResponseErrorType = (data: any): data is ResponseError => {
    return data
        && (typeof data === 'object')
        && ('property' in data)
        && ('messsage' in data)
}

const isResponseInfoType = (data: any): data is ResponseInfo => {
    return data
        && (typeof data === 'object')
        && ('status' in data)
        && ('statusText' in data)
        && (typeof data.data !== 'undefined')
        && Array.isArray(data.errors)
}

const createDefaultResponseInfo = (): ResponseInfo => {
    return {
        data: null,
        errors: [],
        status: 0,
        statusText: ''
    }
}

const createResponseError = (data: any): ResponseError => {
    if (!data) {
        throw new Error(`Failed to create response error object. Data "${data}" is invalid`)
    }

    if (isResponseErrorType(data)) {
        return data
    }

    if (typeof data === 'string') {
        return { property: null, message: data }
    }

    if (data.message) {
        return { property: null, message: data.messge }
    }

    throw new Error(`Failed to create response error object. Data "${data}" is invalid`)
}

const createResponseInfo = (data: any): ResponseInfo => {
    if (!data || (typeof data !== 'object')) {
        throw new Error(`Failed to create response info object. Data "${data}" is invalid`)
    }

    if (isResponseInfoType(data)) {
        return data
    }

    const responseInfo = createDefaultResponseInfo()

    if (data.status) {
        responseInfo.status = data.status
    }

    if (data.statusText) {
        responseInfo.statusText = data.statusText
    } else if (data.message) {
        responseInfo.statusText = data.message
    }

    if (data.data) {
        responseInfo.data = data.data
    } else if (data.message) {
        responseInfo.data = data.message
    }

    if (data.errors) {
        const responseErros: ResponseError[] = []

        if (Array.isArray(data.errors)) {
            for (const error of data.errors) {
                try {
                    responseErros.push(createResponseError(error))
                } catch (error) {
                }
            }
        } else if (typeof data.errors === 'string') {
            responseErros.push(createResponseError(data.errors))
        }
    }

    return responseInfo
}

const ResponseHandler = {
    createResponseInfo,
    isResponseInfoType,
}

export default ResponseHandler
