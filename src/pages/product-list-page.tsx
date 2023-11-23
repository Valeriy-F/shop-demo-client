import Error from 'components/error'
import Layout from 'components/layout'
import { OverlayLoading } from 'components/ui/loading'
import NavigationContext from 'context/navigation-context'
import { enableAddMode, ProductList, useGetProductsQuery } from 'features/product'
import { ProductAddButton } from 'features/product/components/ui/product-add-button'
import { selectProductForEdit } from 'features/product/store/products-slice'
import { ResponseError } from 'model/error'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'store/hooks'

export default function ProductListPage() {
    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProductsQuery('')
    const dispatch = useDispatch()
    const productForEdit = useSelector(selectProductForEdit)
    const navigationProviderValue = useContext(NavigationContext)
    const isEditMode = (productForEdit !== null)

    let pageContent

    if (isLoading) {
        pageContent = <OverlayLoading />
    } else if (isSuccess) {
        pageContent = <ProductList products={products} />
    } else if (isError) {
        pageContent = <Error error={ResponseError.create(error)} />
    }

    return (
        <NavigationContext.Provider value={{
            navigationMenuData: navigationProviderValue.navigationMenuData,
            navigationRightMenuData: [
                ...navigationProviderValue.navigationRightMenuData,
                <ProductAddButton
                    key={navigationProviderValue.navigationRightMenuData.length}
                    disabled={isEditMode}
                    onClick={(event) => !isEditMode && dispatch(enableAddMode())}
                />
            ]

        }}>
            <Layout>
                {pageContent}
            </Layout>
        </NavigationContext.Provider>
    )
}
