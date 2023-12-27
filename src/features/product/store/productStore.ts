import ProductApi from '../api/product-api'
import { TProductFormData } from '../components/form/product-form'
import { Product, TBaseProduct, TProduct } from '../model/product'
import { action, makeAutoObservable, runInAction } from 'mobx'
import { ModelResponseError } from 'model/error'

type TProductStore = {
    products: TProduct[],
    productForEdit: TProduct | null,
    isAddMode: boolean,
    productsLoading: {
        state: 'pending' | 'success' | 'error',
        error: ModelResponseError | null
    },
    loadProducts: () => void,
    addProduct: (data: TProductFormData) => Promise<void>,
    editProduct: (data: TProductFormData) => Promise<void[]>,
    deleteProduct: (product: TBaseProduct) => Promise<void>,
    getProduct: (productName: string) => TProduct | undefined,
    updateProduct: (product: TProduct) => void,
    removeProduct: (product: TBaseProduct) => void
}

const createProductStore = (): TProductStore => {
    const loadProducts = action(async () => {
        productStore.products = []
        productStore.productsLoading.state = 'pending'

        try {
            const products = await ProductApi.getAll()

            runInAction(() => {
                productStore.products = products
                productStore.productsLoading.state = 'success'
            })
        } catch (error) {
            runInAction(() => {
                productStore.productsLoading.state = 'error'
                productStore.productsLoading.error = ModelResponseError.create(error)
            })
        }
    })

    const addProduct = action(async ({ product, files }: TProductFormData) => {
        const imageFile = files.image

        let productResponse: TProduct

        try {
            productResponse = await ProductApi.post(product)
            productStore.updateProduct(productResponse)

            runInAction(() => {
                productStore.isAddMode = false
            })
        } catch (error) {
            throw ModelResponseError.create(error)
        }

        if (imageFile) {
            try {
                productResponse = await ProductApi.patchImage(productResponse, imageFile)
                productStore.updateProduct(productResponse)
            } catch (error) {
                throw ModelResponseError.create(error)
            }
        }
    })

    const editProduct = action(async ({ product, files }: TProductFormData) => {
        const imageFile = files.image

        if (!Product.isTypeOfProduct(product)) {
            product = Product.create(product)
        }

        const requests = [
            ProductApi.put(product)
                .then(productResponse => {
                    productStore.updateProduct(productResponse)
                })
                .catch(error => {
                    throw ModelResponseError.create(error)
                })
        ]

        if (imageFile) {
            const patchImageRequest = ProductApi.patchImage(product as TProduct, imageFile)
                .then(productResponse => {
                    productStore.updateProduct(productResponse)
                })
                .catch(error => {
                    throw ModelResponseError.create(error)
                })

            requests.push(patchImageRequest)
        }

        return Promise.all(requests).then(responses => {
            runInAction(() => {
                productStore.productForEdit = null
            })

            return responses
        })
    })

    const deleteProduct = action(async (product: TBaseProduct) => {

        try {
            await ProductApi.delete(product)

            productStore.removeProduct(product)
        } catch (error) {
            throw ModelResponseError.create(error)
        }
    })

    const getProduct = action((productName: string): TProduct | undefined => {
        return productStore.products.find(currentProduct => currentProduct.name === productName)
    })

    const updateProduct = action((product: TProduct) => {
        const existingProduct = getProduct(product.name)

        if (!existingProduct) {
            productStore.products.push(product)

            return
        }

        const indexOfExistingProduct = productStore.products.indexOf(existingProduct)

        productStore.products.splice(indexOfExistingProduct, 1, product)
    })

    const removeProduct = action((product: TBaseProduct) => {
        const existingProduct = getProduct(product.name)

        if (!existingProduct) {
            return
        }

        const indexOfExistingProduct = productStore.products.indexOf(existingProduct)

        productStore.products.splice(indexOfExistingProduct, 1)
    })

    const productStore: TProductStore = {
        products: [],
        productForEdit: null,
        isAddMode: false,
        productsLoading: {
            state: 'pending',
            error: null
        },
        loadProducts,
        addProduct,
        editProduct,
        deleteProduct,
        getProduct,
        updateProduct,
        removeProduct
    }

    return makeAutoObservable(productStore)
}

export default createProductStore
