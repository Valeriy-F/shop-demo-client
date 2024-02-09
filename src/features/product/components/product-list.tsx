import ProductAddForm from './form/product-add-form'
import ProductEditForm from './form/product-edit-form'
import ProductListItemView from './product-list-item-view'
import { Grid } from '@mui/material'
import Error from 'components/error'
import { OverlayLoading } from 'components/ui/loading'
import { ModelResponseError } from 'model/error'
import { ELoadingState, useAppStore } from 'store/app-store'

const ProductList = () => {
    const { productStore: {
        products,
        productsLoading,
        isAddMode,
        productForEdit
    } } = useAppStore()

    let pageContent = <></>

    switch (productsLoading.state) {
        case ELoadingState.Pending:
            pageContent = <OverlayLoading />

            break;

        case ELoadingState.Success:
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

        case ELoadingState.Error:
            pageContent = <Error error={productsLoading.error as ModelResponseError} />

            break;
    }

    return pageContent
}

export default ProductList
