import {
    DescriptionProductFormField,
    DisplayNameProductFormField,
    ImageFileProductFormField,
    NameProductFormField,
    PriceProductFormField
    } from './fields'
import ProductForm, { createFormData } from './product-form'
import { BaseProduct } from '../../model/product'
import { useAddProduct } from 'features/product/hooks/use-product-form'
import { useAppStore } from 'store/app-store'

const ProductAddForm = () => {
    const { productStore: { setIsAddMode } } = useAppStore()
    const addProduct = useAddProduct()

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
            submitHandler={addProduct}
            onCancelButtonClick={() => {
                setIsAddMode(false)
            }}
        />
    )
}

export default ProductAddForm

