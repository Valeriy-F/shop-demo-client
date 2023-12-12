import ProductApi, { TProductApi } from '../api/product-api'
import { TProductFormData } from '../components/form/product-form'
import { TBaseProduct, TProduct } from 'features/product'
import {
    applySnapshot,
    destroy,
    flow,
    getEnv,
    Instance,
    types
    } from 'mobx-state-tree'
import { ModelResponseError } from 'model/error'
import { TAppStoreEnv } from 'store/app-store'

type TProductStore = Instance<typeof ProductStore>

type TProductStoreEnv = {
    api: TProductApi
}

const BaseProduct = types.model('BaseProduct', {
    name: types.identifier,
    displayName: types.string,
    price: types.number,
    description: types.union(types.string, types.literal(null), types.literal(undefined))
})

const ProductFiles = types.model('ProductFiles', {
    image: types.string
})

const Product = types.compose('Product', BaseProduct, types.model({
    files: ProductFiles
}))

const ProductStore = types
    .model({
        products: types.array(Product),
        productForEdit: types.maybe(types.reference(Product)),
        isAddMode: types.optional(types.boolean, false),
        productsLoading: types.model({
            state: types.enumeration(['pending', 'success', 'error']),
            error: types.maybeNull(types.frozen<ModelResponseError>())
        })
    })
    .views(self => {
        const getProductStoreEnv = (): TProductStoreEnv => getEnv<TAppStoreEnv>(self).productStoreEnv

        const getProduct = (productName: string) => {
            return self.products.find(currentProduct => currentProduct.name === productName)
        }

        return {
            get api() {
                return getProductStoreEnv().api
            },

            getProduct
        }
    })
    .actions(self => {
        const loadProducts = flow(function* () {
            self.productsLoading.state = 'pending'

            try {
                self.products = yield self.api.getAll()
                self.productsLoading.state = 'success'
            } catch (error: any) {
                self.productsLoading.state = 'error'
                self.productsLoading.error = _handleError(error)
            }
        })

        const addProduct = flow(function* ({ product, files }: TProductFormData) {
            const imageFile = files.image

            try {
                let productResponse = yield self.api.post(product)
                updateProduct(productResponse)
                setIsAddMode(false)

                if (imageFile) {
                    productResponse = yield self.api.patchImage(productResponse, imageFile)
                    updateProduct(productResponse)
                }
            } catch (error: any) {
                throw _handleError(error)
            }
        })

        const editProduct = flow(function* ({ product, files }: TProductFormData) {
            const imageFile = files.image

            const requests = [self.api.put(product).then(updateProduct)]

            if (imageFile) {
                requests.push(
                    self.api.patchImage(product, imageFile).then(updateProduct)
                )
            }

            try {
                yield Promise.all(requests)
                disableEditMode()
            } catch (error: any) {
                throw _handleError(error)
            }
        })

        const deleteProduct = flow(function* (product: TBaseProduct) {
            try {
                yield self.api.delete(product)

                removeProduct(product)
            } catch (error: any) {
                throw _handleError(error)
            }
        })

        const setIsAddMode = (isAddMode: boolean) => {
            self.isAddMode = isAddMode
        }

        const enableEditMode = (product: TProduct) => {
            self.productForEdit = product
        }

        const disableEditMode = () => {
            self.productForEdit = undefined
        }

        const updateProduct = (product: TProduct) => {
            const existingProduct = self.getProduct(product.name)

            if (!existingProduct) {
                self.products.push(product)

                return
            }

            applySnapshot(existingProduct, product)
        }

        const removeProduct = (product: TBaseProduct) => {
            const existingProduct = self.getProduct(product.name)

            if (!existingProduct) {
                return
            }

            destroy(existingProduct)
        }

        const _handleError = (error: Error): ModelResponseError => {
            console.error(error.message)

            return (error instanceof ModelResponseError) ? error : ModelResponseError.create(error)
        }

        return {
            loadProducts,
            setIsAddMode,
            enableEditMode,
            disableEditMode,
            addProduct,
            editProduct,
            deleteProduct
        }
    })

const createProductStore = (): TProductStore => {
    return ProductStore.create({
        productForEdit: undefined,
        productsLoading: {
            state: 'pending',
            error: null
        }
    })
}

const createProductStoreEnv = (): TProductStoreEnv => {
    return {
        api: ProductApi
    }
}

export {
    type TProductStoreEnv,
    ProductStore,
    createProductStore,
    createProductStoreEnv
}
