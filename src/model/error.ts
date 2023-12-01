import ResponseHandler from 'api/response-handler'

type TModelFieldError = {
    fieldName: string,
    errorText: string
}

class ModelError extends Error {
    fieldErrors = new Map<string, TModelFieldError>()
}

class ResponseError extends Error {
    status?: number
    statusText?: string

    static create(data: any): ResponseError {
        const responseError = new ResponseError()

        if (!data) {
            return responseError
        }

        responseError.fillByData(data)

        return responseError
    }

    protected fillByData(data: any) {
        if ('status' in data) {
            this.status = data.status
        }

        if ('statusText' in data) {
            this.statusText = data.statusText
        }

        if ('message' in data) {
            this.message = data.message
        }
    }
}

class ModelResponseError extends ResponseError {
    modelError?: ModelError

    static create(data: any): ModelResponseError {
        const modelResponseError = new ModelResponseError()

        if (!data) {
            return modelResponseError
        }

        modelResponseError.fillByData(data)

        return modelResponseError
    }

    protected fillByData(data: any) {
        super.fillByData(data)

        if (ResponseHandler.isResponseInfoType(data)) {
            const modelError = new ModelError()

            if (typeof data.data === 'string') {
                modelError.message = data.data
            }

            data.errors.forEach(error => {
                const fieldName = error.property ? `product.${error.property}` : 'root'
                modelError.fieldErrors.set(fieldName, { fieldName, errorText: error.message })
            })

            this.modelError = modelError
        }
    }
}

export { ResponseError, ModelResponseError }
