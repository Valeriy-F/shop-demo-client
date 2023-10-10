import IProduct from 'types/product'
import ProductApi, { TProductDeleteRequest, TProductPostRequest, TProductPutRequest } from 'api/product-api'
import { useState } from 'react'

export type TUseProductHttpRequestProps = {
    onSuccess?: (product: IProduct) => void
}

export type TUseProductPostResponse = {
    productPost: TProductPostRequest,
    productPostError?: Error
}

export type TUseProductPutResponse = {
    productPut: TProductPutRequest,
    productPutError?: Error
}

export type TUseProductDeleteResponse = {
    productDelete: TProductDeleteRequest,
    productDeleteError?: Error
}

export function useProductPost(props?: TUseProductHttpRequestProps): TUseProductPostResponse  {
    const onSuccess = props?.onSuccess
    const [error, setError] = useState<Error>()

    const productHttpRequest = async (product: IProduct): Promise<IProduct> => {
        try {
            await ProductApi.post(product)

            onSuccess && onSuccess(product)

            return product
        } catch (error: any) {
            console.error(`Failed to create product "${product.name}".`, error)
            setError(error)

            throw error
        }
    }

    return {
        productPost: productHttpRequest,
        productPostError: error
    }
}

export function useProductPut(props?: TUseProductHttpRequestProps): TUseProductPutResponse {
    const onSuccess = props?.onSuccess
    const [error, setError] = useState<Error>()

    const productHttpRequest = async (product: IProduct): Promise<IProduct> => {
        try {
            await ProductApi.put(product)

            onSuccess && onSuccess(product)

            return product
        } catch (error: any) {
            console.error(`Failed to update product "${product.name}".`, error)
            setError(error)

            throw error
        }
    }

    return {
        productPut: productHttpRequest,
        productPutError: error
    }
}

export function useProductDelete(props?: TUseProductHttpRequestProps): TUseProductDeleteResponse {
    const onSuccess = props?.onSuccess
    const [error, setError] = useState<Error>()

    const productHttpRequest = async (product: IProduct): Promise<void> => {
        try {
            await ProductApi.delete(product)

            onSuccess && onSuccess(product)
        } catch (error: any) {
            console.error(`Failed to delete product "${product.name}".`, error)
            setError(error)

            throw error
        }
    }

    return {
        productDelete: productHttpRequest,
        productDeleteError: error
    }
}