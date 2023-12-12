import ProductAddForm from './form/product-add-form'
import ProductEditForm from './form/product-edit-form'
import ProductListItemView from './product-list-item-view'
import { Grid } from '@mui/material'
import Error from 'components/error'
import { OverlayLoading } from 'components/ui/loading'
import { observer } from 'mobx-react-lite'
import { ModelResponseError } from 'model/error'
import { useAppStore } from 'store/app-store'

const ProductList = () => {
    const { productStore: {
        products,
        productsLoading,
        isAddMode,
        productForEdit
    } } = useAppStore()

    let pageContent = <></>

    switch (productsLoading.state) {
        case 'pending':
            pageContent = <OverlayLoading />

            break;

        case 'success':
            pageContent = (
                <Grid container spacing={4} alignItems='stretch'>
                    {isAddMode &&
                        <Grid item xs={12} md={6} lg={4} >
                            <ProductAddForm />
                        </Grid>
                    }

                    {products.map(product => {
                        const isProductForEdit = (productForEdit && productForEdit.name === product.name)

                        return (
                            <Grid item xs={12} md={6} lg={4} key={product.name} >
                                {isProductForEdit
                                    ? <ProductEditForm product={product} />
                                    : <ProductListItemView product={product} />}
                            </Grid>
                        )
                    })}
                </Grid>
            )

            break;

        case 'error':
            pageContent = <Error error={productsLoading.error as ModelResponseError} />

            break;
    }

    return pageContent
}

export default observer(ProductList)
