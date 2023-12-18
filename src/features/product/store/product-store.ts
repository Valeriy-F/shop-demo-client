import ProductApi from '../api/product-api'
import { TProductFormData } from '../components/form/product-form'
import { TBaseProduct, TProduct } from 'features/product'
import { ModelResponseError } from 'model/error'
import { Dispatch, SetStateAction, useState } from 'react'
import { ELoadingState, TLoadingInfo } from 'store/app-store'

type TProductSore = {
    products: TProduct[],
    productForEdit: TProduct | null,
    isAddMode: boolean,
    productsLoading: TLoadingInfo,
    loadProducts: () => Promise<void>,
    addProduct: (props: TProductFormData) => Promise<void>,
    editProduct: (props: TProductFormData) => Promise<void>,
    deleteProduct: (product: TBaseProduct) => Promise<void>,
    getProduct: (productName: string) => TProduct | null,
    setIsAddMode: Dispatch<SetStateAction<boolean>>,
    enableEditMode: (product: TProduct) => void,
    disableEditMode: () => void
}

const ProductStore = (): TProductSore => {
    const [products, setProducts] = useState<TProduct[]>([])
    const [productsLoadingState, setProductsLoadingState] = useState<ELoadingState>(ELoadingState.Success)
    const [productsLoadingError, setProductsLoadingError] = useState<ModelResponseError | null>(null)
    const [isAddMode, setIsAddMode] = useState<boolean>(false)
    const [productForEdit, setProductForEdit] = useState<TProduct | null>(null)

    const loadProducts = async () => {
        setProductsLoadingState(ELoadingState.Pending)

        try {
            setProducts(await ProductApi.getAll())
            setProductsLoadingState(ELoadingState.Success)
        } catch (error: any) {
            setProductsLoadingState(ELoadingState.Error)
            setProductsLoadingError(_handleError(error))
        }
    }

    const addProduct = async ({ product, files }: TProductFormData) => {
        const imageFile = files.image

        try {
            let productResponse = await ProductApi.post(product)
            _addProductToList(productResponse)
            setIsAddMode(false)

            if (imageFile) {
                productResponse = await ProductApi.patchImage(productResponse, imageFile)
                _updateProductInList(productResponse)
            }
        } catch (error: any) {
            throw _handleError(error)
        }
    }

    const editProduct = async ({ product, files }: TProductFormData) => {
        const imageFile = files.image

        const requests = [ProductApi.put(product).then(product => _updateProductInList(product as TProduct))]

        if (imageFile) {
            requests.push(
                ProductApi.patchImage(product, imageFile).then(product => _updateProductInList(product))
            )
        }

        try {
            await Promise.all(requests)
            disableEditMode()
        } catch (error: any) {
            throw _handleError(error)
        }
    }

    const deleteProduct = async (product: TBaseProduct) => {
        try {
            await ProductApi.delete(product)
            _removeProductFromList(product)
        } catch (error: any) {
            throw _handleError(error)
        }
    }

    const getProduct = (productName: string) => {
        return products.find(currentProduct => currentProduct.name === productName) || null
    }

    const enableEditMode = (product: TProduct) => {
        setProductForEdit(product)
    }

    const disableEditMode = () => {
        setProductForEdit(null)
    }

    const _addProductToList = (product: TProduct) => {
        setProducts(prevState => [...prevState, product])
    }

    const _updateProductInList = (product: TProduct) => {
        setProducts(prevState => prevState.map(currentPropduct => (currentPropduct.name === product.name) ? product : currentPropduct))
    }

    const _removeProductFromList = (product: TBaseProduct) => {
        setProducts(prevState => prevState.filter(currentProduct => (currentProduct.name !== product.name)))
    }

    const _handleError = (error: Error): ModelResponseError => {
        console.error(error.message)

        return (error instanceof ModelResponseError) ? error : ModelResponseError.create(error)
    }

    return {
        products,
        productForEdit,
        isAddMode,
        productsLoading: {
            state: productsLoadingState,
            error: productsLoadingError
        },
        loadProducts,
        addProduct,
        editProduct,
        deleteProduct,
        getProduct,
        setIsAddMode,
        enableEditMode,
        disableEditMode
    }
}

export { ProductStore, type TProductSore }

