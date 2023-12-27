import Error from 'components/error'
import Layout from 'components/layout'
import { OverlayLoading } from 'components/ui/loading'
import NavigationContext from 'context/navigation-context'
import { ProductAddButton, ProductList, useGetProducts } from 'features/product'
import { ModelResponseError } from 'model/error'
import { useContext } from 'react'
import { useAppStore } from 'store/app-store'

const ProductListPage = () => {
    const { productStore: {
        isAddMode,
        productForEdit,
        setIsAddMode
    } } = useAppStore()
    const navigationProviderValue = useContext(NavigationContext)
    const isEditMode = (!!productForEdit)


    const {data: products, error, status} = useGetProducts()

    let pageContent = <></>

    switch (status) {
        case 'pending':
            pageContent = <OverlayLoading />

            break;

        case 'success':
            pageContent = <ProductList products={products} />

            break;

        case 'error':
            pageContent = <Error error={error as ModelResponseError} />

            break;
    }

    return (
        <NavigationContext.Provider value={{
            navigationMenuData: navigationProviderValue.navigationMenuData,
            navigationRightMenuData: [
                ...navigationProviderValue.navigationRightMenuData,
                <ProductAddButton
                    key={navigationProviderValue.navigationRightMenuData.length}
                    disabled={isEditMode || isAddMode}
                    onClick={() => {
                        if (isEditMode || isAddMode) {
                            return
                        }

                        setIsAddMode(true)
                    }}
                />
            ]

        }}>
            <Layout>
                {pageContent}
            </Layout>
        </NavigationContext.Provider>
    )
}

export default ProductListPage
