import {
    DescriptionProductFormField,
    DisplayNameProductFormField,
    ImageFileProductFormField,
    NameProductFormField,
    PriceProductFormField
    } from './fields'
import ProductForm, { createFormData } from './product-form'
import { BaseProduct } from '../../model/product'
import { useAppStore } from 'store/app-store'

const ProductAddForm = () => {
    const {productStore} = useAppStore()

    return (
        <ProductForm
            formData={createFormData(BaseProduct.create())}
            formFields={[
                ImageFileProductFormField,
                NameProductFormField,
                DisplayNameProductFormField,
                PriceProductFormField,
                DescriptionProductFormField
            ]}
            submitHandler={productStore.addProduct}
            onCancelButtonClick={() => {
                productStore.setIsAddMode(false)
            }}
        />
    )
}

export default ProductAddForm

