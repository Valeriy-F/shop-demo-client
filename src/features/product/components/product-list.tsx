import ProductAddForm, { TProductAddFormProps } from './form/product-add-form';
import ProductEditForm, { TProductEditFormProps } from './form/product-edit-form';
import ProductListItemView, { TProductListItemViewProps } from './product-list-item-view';
import { TProduct } from '../model/product';
import { Grid } from '@mui/material';
import Error from 'components/error';

type TProductListProps = {
    products: TProduct[],
    isAddMode: boolean,
    productForEdit: TProduct | null,
    fetchProductsError?: Error,
    productAddFormProps: TProductAddFormProps,
    productEditFormProps: Omit<TProductEditFormProps, 'product'>,
    productViewProps?: Omit<TProductListItemViewProps, 'product'>
}

const ProductList = (props: TProductListProps) => {
    const {
        products,
        isAddMode,
        productForEdit,
        fetchProductsError,
        productAddFormProps,
        productEditFormProps,
        productViewProps
    } = props

    if (fetchProductsError) {
        return <Error error={fetchProductsError} />
    }

    return (
        <div>
            <Grid container spacing={4} alignItems='stretch'>
                {isAddMode &&
                    <Grid item xs={12} md={6} lg={4} >
                        <ProductAddForm {...productAddFormProps} />
                    </Grid>
                }

                {products.map(product => {
                    if (productForEdit && productForEdit !== product) {
                        delete productViewProps?.startProductEditProcess;
                    }

                    return (
                        <Grid item xs={12} md={6} lg={4} key={product.name} >
                            {(productForEdit === product)
                                ? <ProductEditForm product={product} {...productEditFormProps} />
                                : <ProductListItemView product={product} {...productViewProps} />}
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export default ProductList
