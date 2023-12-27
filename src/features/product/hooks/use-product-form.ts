import { usePatchProductImageFileHandler, usePostProductHandler, usePutProductHandler } from './use-product-api'
import { TProductFormData } from '../components/form/product-form'
import { useErrorHandler } from 'model/error'
import { useAppStore } from 'store/app-store'

const useAddProduct = () => {
    const { productStore: { setIsAddMode } } = useAppStore()
    const handleError = useErrorHandler()
    const postProduct = usePostProductHandler()
    const patchProductImageFile = usePatchProductImageFileHandler()

    return async ({ product, files }: TProductFormData) => {
        const imageFile = files.image

        try {
            await postProduct(product)

            setIsAddMode(false)

            if (imageFile) {
                await patchProductImageFile(product, imageFile)
            }
        } catch (error: any) {
            throw handleError(error)
        }
    }
}

const useEditProduct = () => {
    const { productStore: { disableEditMode } } = useAppStore()
    const handleError = useErrorHandler()
    const putProduct = usePutProductHandler()
    const patchProductImageFile = usePatchProductImageFileHandler()

    return async ({ product, files }: TProductFormData) => {
        const imageFile = files.image
        const requests = [putProduct(product)]

        if (imageFile) {
            requests.push(patchProductImageFile(product, imageFile ))
        }

        try {
            await Promise.all(requests)

            disableEditMode()
        } catch (error: any) {
            throw handleError(error)
        }
    }
}

export {
    useAddProduct,
    useEditProduct
}
