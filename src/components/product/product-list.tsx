import ButtonAddProduct from './ui/button-add-product'
import Error from 'components/error'
import Panel from 'components/ui/panel'
import ProductListItem from './product-list-item'
import ProductListItemAdd from './product-list-item-add'
import { ProductListContext } from 'context/product/product-list'
import { ProductListItemProvider } from 'context/product/product-list-item'
import { useContext, useMemo } from 'react'

export default function ProductList() {
    const {
        products,
        isAddMode,
        fetchProductsError,
        enableAddNewProductMode,
    } = useContext(ProductListContext)

    const productListView = useMemo(() => {
        return products.map(product => {
            return (
                <Panel key={product.name}>
                    <ProductListItemProvider>
                        <ProductListItem product={product} />
                    </ProductListItemProvider>
                </Panel>
            )
        })
    }, [products])

    if (fetchProductsError) {
        return <Error error={fetchProductsError} />
    }

    return (
        <div className="grid grid-cols-4 gap-6 auto-cols-auto md:grid-cols-2 sm:grid-cols-1">
            <ButtonAddProduct onClick={enableAddNewProductMode} />
            {isAddMode && <ProductListItemAdd />}
            {productListView}
        </div>
    )
}