import ApiException from './ApiException'
import IResponseAwere from 'api/types/IResponseAware'
import { ResponseError, ResponseInfo } from 'api/types/TApi'

export default class ClientErrorException<T> extends ApiException implements IResponseAwere<T> {
    private readonly responseInfo: ResponseInfo<T>

    private static createErrorMessage<T>(responseInfo: ResponseInfo<T>): string {
        const responseErrorToString = (error: ResponseError): string => {
            let message = `Error: "${error.message}"`

            if (error.property) {
                message = `${message} of property "${error.property}".`
            }

            return message
        }

        return `Response status: ${responseInfo.statusText}(${responseInfo.status}). ${responseInfo.errors.map(responseErrorToString).join(' | ')}`
    }

    constructor(responseInfo: ResponseInfo<T>, message?: string) {
        super()

        this.responseInfo = responseInfo
        this.message = message || ClientErrorException.createErrorMessage(responseInfo)
    }

    getResponseInfo() {
        return this.responseInfo
    }
}