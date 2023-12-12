import {
    DescriptionProductFormField,
    DisplayNameProductFormField,
    ImageFileProductFormField,
    NameProductFormField,
    PriceProductFormField
    } from './fields'
import ProductForm, { createFormData } from './product-form'
import { BaseProduct } from '../../model/product'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useAppStore } from 'store/store'

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
                runInAction(() => {productStore.isAddMode = false})
            }}
        />
    )
}

export default observer(ProductAddForm)
