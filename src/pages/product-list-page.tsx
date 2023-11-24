import { Add as AddIcon } from '@mui/icons-material';
import { Fab } from '@mui/material';
import Layout from 'components/layout';
import NavigationContext from 'context/navigation-context';
import {
    ProductList,
    TBaseProduct,
    TProduct,
    useProduct,
    useProductsFetch
} from 'features/product';
import { useContext, useEffect, useState } from 'react';

export default function ProductListPage() {
    const [products, setProducts] = useState<TProduct[]>([])
    const [fetchProductsError, setFetchProductsError] = useState<Error>()
    const [isAddMode, setIsAddMode] = useState(false)
    const [productForEdit, setProductForEdit] = useState<TProduct | null>(null)

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

                // Add new product button
                <Fab
                    key={navigationProviderValue.navigationRightMenuData.length}
                    size='medium'
                    color="secondary"
                    aria-label="add"
                    onClick={(event) => {
                        event.preventDefault()
                        setIsAddMode(true)
                    }}
                    sx={{
                        boxShadow: 0
                    }}
                >
                    <AddIcon />
                </Fab>
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
                            event.preventDefault();
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
                            event.preventDefault();
                            setProductForEdit(null);
                        }
                    }}
                    productViewProps={{
                        startProductEditProcess: setProductForEdit,
                        deleteProduct: useProductDelete({
                            afterProductDeletedHook: removeProductFromList
                        })
                    }}
                />
            </Layout>
        </NavigationContext.Provider>
    )
}
