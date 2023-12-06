import Layout from 'components/layout'
import NavigationContext from 'context/navigation-context'
import {
    ProductList,
    TBaseProduct,
    TProduct,
    useProduct,
    useProductsFetch
    } from 'features/product'
import { ProductAddButton } from 'features/product/components/ui/product-add-button'
import { useContext, useEffect, useState } from 'react'

export default function ProductListPage() {
    const [products, setProducts] = useState<TProduct[]>([])
    const [fetchProductsError, setFetchProductsError] = useState<Error>()
    const [isAddMode, setIsAddMode] = useState(false)
    const [productForEdit, setProductForEdit] = useState<TProduct | null>(null)
    const isEditMode = (productForEdit !== null)

    const { useProductAdd, useProductEdit, useProductDelete } = useProduct();
    const fetchProducts = useProductsFetch();
    const navigationProviderValue = useContext(NavigationContext)

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch(setFetchProductsError)
    }, [])

    const addProductToList = (product: TProduct) => {
        setProducts(prevState => [...prevState, product])
    }

    const updateProductInList = (product: TProduct) => {
        setProducts(prevState => prevState.map(currentPropduct => (currentPropduct.name === product.name) ? product : currentPropduct))
    }

    const removeProductFromList = (product: TBaseProduct) => {
        setProducts(prevState => prevState.filter(currentProduct => (currentProduct.name !== product.name)))
    }

    return (
        <NavigationContext.Provider value={{
            navigationMenuData: navigationProviderValue.navigationMenuData,
            navigationRightMenuData: [
                ...navigationProviderValue.navigationRightMenuData,
                <ProductAddButton
                    key={navigationProviderValue.navigationRightMenuData.length}
                    disabled={isEditMode}
                    onClick={(event) => !isEditMode && setIsAddMode(true)}
                />
            ]

        }}>
            <Layout>
                <ProductList
                    products={products}
                    isAddMode={isAddMode}
                    productForEdit={productForEdit}
                    fetchProductsError={fetchProductsError}
                    productAddFormProps={{
                        submitHandler: useProductAdd({
                            afterProductCreatedHook: product => {
                                addProductToList(product);
                                setIsAddMode(false);
                            },
                            afterImageFileUploadedHook: product => {
                                updateProductInList(product)
                            }
                        }),
                        onCancelButtonClick: event => {
                            setIsAddMode(false);
                        }
                    }}
                    productEditFormProps={{
                        submitHandler: useProductEdit({
                            afterProductUpdatedHook: updateProductInList,
                            afterImageFileUploadedHook: updateProductInList,
                            afterAllDataUpdatedHook: product => setProductForEdit(null)
                        }),
                        onCancelButtonClick: event => {
                            setProductForEdit(null);
                        }
                    }}
                    productViewProps={{
                        startProductEditProcess: setProductForEdit,
                        deleteProduct: useProductDelete({
                            afterProductDeletedHook: removeProductFromList
                        }),
                        isAddMode
                    }}
                />
            </Layout>
        </NavigationContext.Provider>
    )
}
