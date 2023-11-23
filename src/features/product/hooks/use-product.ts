import ProductApi from '../api/product-api'
import { TProductFormData } from '../components/form/product-form'
import { Product, TBaseProduct, TProduct } from '../model/product'
import { useAddProductMutation, useEditProductMutation, useUploadImageFileMutation } from '../store/product-api-slice'
import { disableAddMode, setProductForEdit } from '../store/products-slice'
import { ModelResponseError } from 'model/error'
import { useDispatch } from 'store/hooks'

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

const useProductAdd = () => {
    const dispatch = useDispatch()
    const [createProduct] = useAddProductMutation()
    const [uploadImageFile] = useUploadImageFileMutation()

    return async ({ product, files }: TProductFormData) => {
        const imageFile = files.image

        let productResponse: TProduct

        try {
            productResponse = await createProduct(product).unwrap()

            dispatch(disableAddMode())
        } catch (error) {
            throw handleErrorAndCreateException(error, `Fialed to create new product "${product.name}".`)
        }

        if (imageFile) {
            try {
                await uploadImageFile({ product: productResponse, file: imageFile })
            } catch (error) {
                throw handleErrorAndCreateException(error, `Failed to upload image file "${imageFile}" for product "${product.name}".`)
            }
        }
    }
}

const useProductEdit = () => {
    const dispatch = useDispatch()
    const [updateProduct] = useEditProductMutation()
    const [uploadImageFile] = useUploadImageFileMutation()

    return async ({ product, files }: TProductFormData) => {
        const imageFile = files.image
        const productForUpdate = Product.create(product)

        const requests = [
            updateProduct(productForUpdate)
                .catch(error => {
                    throw handleErrorAndCreateException(error, `Failed to update product "${product.name}".`)
                })
        ]

        if (imageFile) {
            requests.push(
                uploadImageFile({ product: productForUpdate, file: imageFile })
                    .catch(error => {
                        throw handleErrorAndCreateException(error, `Failed to upload image file "${imageFile.name}" for product "${product.name}".`)
                    })
            )
        }

        return Promise.all(requests).then(responses => {
            dispatch(setProductForEdit(null))
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
    useProductEdit,
})

export default useProduct

export {
    useProductAdd,
    useProductEdit
}
