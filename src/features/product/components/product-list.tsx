import ProductAddForm from './form/product-add-form'
import ProductEditForm from './form/product-edit-form'
import ProductListItemView from './product-list-item-view'
import { TProduct } from '../model/product'
import { selectIsAddMode, selectProductForEdit } from '../store/products-slice'
import { Grid } from '@mui/material'
import { useSelector } from 'store/hooks'

type TProductListProps = {
    products: TProduct[]
}

const ProductList = ({ products }: TProductListProps) => {
    const isAddMode = useSelector(selectIsAddMode)
    const productForEdit = useSelector(selectProductForEdit)

    return (
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
}

export default ProductList
