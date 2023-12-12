import {
    DescriptionProductFormField,
    DisplayNameProductFormField,
    ImageFileProductFormField,
    PriceProductFormField
    } from './fields'
import ProductForm, { createFormData } from './product-form'
import { TProduct } from '../../model/product'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useAppStore } from 'store/store'

type TProductEditFormProps = {
    product: TProduct,
}

const ProductEditForm = ({ product }: TProductEditFormProps) => {
    const { productStore } = useAppStore()

    return (
        <ProductForm
            formData={createFormData(product)}
            submitHandler={productStore.editProduct}
            formFields={[
                ImageFileProductFormField,
                DisplayNameProductFormField,
                PriceProductFormField,
                DescriptionProductFormField
            ]}
            onCancelButtonClick={() => {
                runInAction(() => {productStore.productForEdit = null})
            }}
        />
    )
}

export default observer(ProductEditForm)
