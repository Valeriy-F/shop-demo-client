import { Add as AddIcon } from '@mui/icons-material';
import { Fab } from '@mui/material';
import Layout from 'components/layout';
import NavigationContext from 'context/navigation-context';
import { Product, ProductApi, ProductList } from 'features/product';
import { buildProductDeleteHandler } from 'features/product/components/form/product-delete';
import { useContext, useEffect, useState } from 'react';

export default function ProductListPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [fetchProductsError, setFetchProductsError] = useState<Error>()
    const [isAddMode, setIsAddMode] = useState(false)
    const [productForEdit, setProductForEdit] = useState<Product | null>(null)

    const navigationProviderValue = useContext(NavigationContext)

    useEffect(() => {
        ProductApi.getAll()
            .then(products => setProducts(products))
            .catch(error => {
                console.error('Failed to fetch products for product list.', error)
                setFetchProductsError(error)
            })
    }, [])

    const addProductToList = (product: Product) => {
        setProducts(prevState => [...prevState, product])
    }

    const updateProductInList = (product: Product) => {
        setProducts(prevState => prevState.map(currentPropduct => (currentPropduct.name === product.name) ? product : currentPropduct))
    }

    const removeProductFromList = (product: Product) => {
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
                        afterProductCreatedHook: product => {
                            addProductToList(product);
                            setIsAddMode(false);
                        },
                        afterImageFileUploadedHook: product => {
                            updateProductInList(product)
                        },
                        onCancelButtonClick: event => {
                            event.preventDefault();
                            setIsAddMode(false);
                        }
                    }}
                    productEditFormProps={{
                        afterProductUpdatedHook: updateProductInList,
                        afterAllDataUpdatedHook: product => {
                            setProductForEdit(null);
                        },
                        onCancelButtonClick: event => {
                            event.preventDefault();
                            setProductForEdit(null);
                        }
                    }}
                    productViewProps={{
                        startProductEditProcess: setProductForEdit,
                        deleteProduct: buildProductDeleteHandler({afterProductDeletedHook: removeProductFromList})
                    }}
                />
            </Layout>
        </NavigationContext.Provider>
    )
}
