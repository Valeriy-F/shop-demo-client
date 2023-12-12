import Layout from 'components/layout'
import NavigationContext from 'context/navigation-context'
import { ProductList } from 'features/product'
import { ProductAddButton } from 'features/product/components/ui/product-add-button'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { useAppStore } from 'store/store'

const ProductListPage = () => {
    const {productStore} = useAppStore()
    const navigationProviderValue = useContext(NavigationContext)
    const isEditMode = (!!productStore.productForEdit)

    return (
        <NavigationContext.Provider value={{
            navigationMenuData: navigationProviderValue.navigationMenuData,
            navigationRightMenuData: [
                ...navigationProviderValue.navigationRightMenuData,
                <ProductAddButton
                    key={navigationProviderValue.navigationRightMenuData.length}
                    disabled={isEditMode || productStore.isAddMode}
                    onClick={(event) => {
                        if (isEditMode || productStore.isAddMode) {
                            return
                        }

                        runInAction(() => {productStore.isAddMode = true})
                    }}
                />
            ]

        }}>
            <Layout>
                <ProductList />
            </Layout>
        </NavigationContext.Provider>
    )
}

export default observer(ProductListPage)
