import ProductApi from '../api/product-api'
import { TBaseProduct } from '../model/product'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useErrorHandler } from 'model/error'

const useGetProducts = () => useQuery({
    queryKey: ['products'],
    queryFn: ProductApi.getAll,
    staleTime: 1000 * 60
})

const useGetProduct = (productName: string) => useQuery({
    queryKey: ['product', productName],
    queryFn: () => ProductApi.get(productName),
    staleTime: 1000 * 60
})

const usePostProductHandler = () => {
    const handleError = useErrorHandler()
    const addProductToList = useAddProductToList()
    const postProductMutation = useMutation({
        mutationFn: (product: TBaseProduct) => ProductApi.post(product),
        onSuccess: addProductToList
    })

    return async (product: TBaseProduct) => {
        try {
            await postProductMutation.mutateAsync(product)
        } catch (error: any) {
            throw handleError(error)
        }
    }
}

const usePutProductHandler = () => {
    const handleError = useErrorHandler()
    const updateProductInList = useUpdateProductInList()
    const putProductMutation = useMutation({
        mutationFn: (product: TBaseProduct) => ProductApi.put(product),
        onSuccess: updateProductInList
    })

    return async (product: TBaseProduct) => {
        try {
            await putProductMutation.mutateAsync(product)
        } catch (error: any) {
            throw handleError(error)
        }
    }
}

const useDeleteProductHandler = () => {
    const handleError = useErrorHandler()
    const removeProductFromList = useRemoveProductFromList()
    const deleteProductMutation = useMutation({
        mutationFn: async (product: TBaseProduct) => ProductApi.delete(product).then(() => product),
        onSuccess: removeProductFromList
    })

    return async (product: TBaseProduct) => {
        try {
            await deleteProductMutation.mutateAsync(product)
        } catch (error: any) {
            throw handleError(error)
        }
    }
}

const usePatchProductImageFileHandler = () => {
    const handleError = useErrorHandler()
    const updateProductInList = useUpdateProductInList()
    const patchProductImageFileMutation = useMutation({
        mutationFn: (data: { product: TBaseProduct, file: File }) => ProductApi.patchImage(data.product, data.file),
        onSuccess: updateProductInList
    })

    return async (product: TBaseProduct, file: File) => {
        try {
            await patchProductImageFileMutation.mutateAsync({ product, file })
        } catch (error: any) {
            throw handleError(error)
        }
    }
}

const useAddProductToList = () => {
    const queryClient = useQueryClient()

    return (product: TBaseProduct) => {
        queryClient.setQueryData(
            ['products'],
            (products: TBaseProduct[]) => [...products, product]
        )
    }
}

const useUpdateProductInList = () => {
    const queryClient = useQueryClient()

    return (product: TBaseProduct) => {
        queryClient.setQueryData(
            ['products'],
            (products: TBaseProduct[]) => products.map(currentPropduct => (currentPropduct.name === product.name) ? product : currentPropduct)
        )
    }
}

const useRemoveProductFromList = () => {
    const queryClient = useQueryClient()

    return (product: TBaseProduct) => {
        queryClient.setQueryData(
            ['products'],
            (products: TBaseProduct[]) => products.filter(currentProduct => (currentProduct.name !== product.name))
        )
    }
}

export {
    useGetProducts,
    useGetProduct,
    usePostProductHandler,
    usePutProductHandler,
    usePatchProductImageFileHandler,
    useDeleteProductHandler
}
