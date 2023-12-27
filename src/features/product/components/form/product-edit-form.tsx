import {
    DescriptionProductFormField,
    DisplayNameProductFormField,
    ImageFileProductFormField,
    PriceProductFormField
    } from './fields'
import ProductForm, { createFormData } from './product-form'
import { useEditProduct } from '../../hooks/use-product-form'
import { TProduct } from '../../model/product'
import { useAppStore } from 'store/app-store'

type TProductEditFormProps = {
    product: TProduct,
}

const ProductEditForm = ({ product }: TProductEditFormProps) => {
    const { productStore: { disableEditMode } } = useAppStore()
    const editProduct = useEditProduct()

    return (
        <ProductForm
            formData={createFormData(product)}
            submitHandler={editProduct}
            formFields={[
                ImageFileProductFormField,
                DisplayNameProductFormField,
                PriceProductFormField,
                DescriptionProductFormField
            ]}
            onCancelButtonClick={() => {disableEditMode()}}
        />
    )
}

export default ProductEditForm
