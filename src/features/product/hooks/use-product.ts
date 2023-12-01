import ProductApi from '../api/product-api'
import { TProductFormData } from '../components/form/product-form'
import { Product, TBaseProduct, TProduct } from '../model/product'
import { ModelResponseError } from 'model/error'

type TUseProductAddProps = {
    afterProductCreatedHook?: (product: TProduct) => void
    afterImageFileUploadedHook?: (product: TProduct) => void
}

type TUseProductEditProps = {
    afterProductUpdatedHook?: (product: TProduct) => void
    afterImageFileUploadedHook?: (product: TProduct) => void
    afterAllDataUpdatedHook?: (product: TProduct) => void
}

type TUseProductDeleteProps = {
    afterProductDeletedHook?: (product: TBaseProduct) => void
}

const handleErrorAndCreateException = (error: any, extraMessage: string): ModelResponseError => {
    if (error instanceof ModelResponseError) {
        return error
    }

    const modelResponseError = ModelResponseError.create(error)

    return modelResponseError
}

const useProductsFetch = () => {
    return async () => {
        try {
            return await ProductApi.getAll()
        } catch (error) {
            throw handleErrorAndCreateException(error, `Fialed to fetch product list.`)
        }
    }
}

const useProductFetch = () => {
    return async (productName: string) => {
        try {
            return await ProductApi.get(productName)
        } catch (error) {
            throw handleErrorAndCreateException(error, `Failed to fetch product "${productName}".`)
        }
    }
}

const useProductAdd = ({ afterProductCreatedHook, afterImageFileUploadedHook }: TUseProductAddProps) => {
    return async ({ product, files }: TProductFormData) => {
        const imageFile = files.image

        let productResponse: TProduct

        try {
            productResponse = await ProductApi.post(product)

            afterProductCreatedHook && afterProductCreatedHook(productResponse)
        } catch (error) {
            throw handleErrorAndCreateException(error, `Fialed to create new product "${product.name}".`)
        }

        if (imageFile) {
            try {
                productResponse = await ProductApi.patchImage(productResponse, imageFile)

                afterImageFileUploadedHook && afterImageFileUploadedHook(productResponse)
            } catch (error) {
                throw handleErrorAndCreateException(error, `Failed to upload image file "${imageFile}" for product "${product.name}".`)
            }
        }
    }
}

const useProductEdit = ({ afterAllDataUpdatedHook, afterImageFileUploadedHook, afterProductUpdatedHook }: TUseProductEditProps) => {
    return async ({ product, files }: TProductFormData) => {
        const imageFile = files.image

        if (!Product.isTypeOf(product)) {
            product = Product.create(product)
        }

        const requests = [
            ProductApi.put(product)
                .then(productResponse => {
                    afterProductUpdatedHook && afterProductUpdatedHook(productResponse)
                })
                .catch(error => {
                    throw handleErrorAndCreateException(error, `Failed to update product "${product.name}".`)
                })
        ]

        if (imageFile) {
            const patchImageRequest = ProductApi.patchImage(product as TProduct, imageFile)
                .then(productResponse => {
                    afterImageFileUploadedHook && afterImageFileUploadedHook(productResponse)
                })
                .catch(error => {
                    throw handleErrorAndCreateException(error, `Failed to upload image file "${imageFile.name}" for product "${product.name}".`)
                })

            requests.push(patchImageRequest)
        }

        return Promise.all(requests).then(responses => {
            afterAllDataUpdatedHook && afterAllDataUpdatedHook(product as TProduct)

            return responses
        })
    }
}

const useProductDelete = ({ afterProductDeletedHook }: TUseProductDeleteProps) => {
    return async (product: TBaseProduct) => {

        try {
            await ProductApi.delete(product)

            afterProductDeletedHook && afterProductDeletedHook(product)
        } catch (error) {
            throw handleErrorAndCreateException(error, `Failed to delete product "${product.name}".`)
        }
    }
}

const useProduct = () => ({
    useProductAdd,
    useProductDelete,
    useProductEdit,
    useProductFetch,
    useProductsFetch,
})

export default useProduct

export {
    useProductAdd,
    useProductDelete,
    useProductEdit,
    useProductFetch,
    useProductsFetch
}
