import ProductListItem from './product-list-item';
import ProductListItemAdd from './product-list-item-add';
import { Grid } from '@mui/material';
import Error from 'components/error';
import { ProductListContext } from 'context/product/product-list';
import { ProductListItemProvider } from 'context/product/product-list-item';
import { useContext, useMemo } from 'react';

export default function ProductList() {
    const {
        products,
        isAddMode,
        fetchProductsError
    } = useContext(ProductListContext)

    const productListView = useMemo(() => {
        return products.map(product => {
            return (
                <Grid item xs={12} md={6} lg={4} key={product.name} >
                    <ProductListItemProvider>
                        <ProductListItem product={product} />
                    </ProductListItemProvider>
                </Grid>
            )
        })
    }, [products])

    const productAddView = (
        <Grid item xs={12} md={6} lg={4} >
            <ProductListItemAdd />
        </Grid>
    )

    if (fetchProductsError) {
        return <Error error={fetchProductsError} />
    }

    return (
        <div>
            <Grid container spacing={4} alignItems='stretch'>
                {isAddMode && productAddView}
                {productListView}
            </Grid>
        </div>
    )
}
