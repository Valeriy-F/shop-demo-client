import {
    DescriptionProductFormField,
    DisplayNameProductFormField,
    ImageFileProductFormField,
    NameProductFormField,
    PriceProductFormField
    } from './fields'
import ProductForm, { createFormData, TProductFormProps } from './product-form'
import { BaseProduct } from '../../model/product'
import { useProductAdd } from 'features/product/hooks/use-product'
import { disableAddMode } from 'features/product/store/products-slice'
import { useDispatch } from 'store/hooks'


export default function ProductAddForm() {
    const dispatch = useDispatch()
    const submitHandler: TProductFormProps['submitHandler'] = useProductAdd()

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
            submitHandler={submitHandler}
            onCancelButtonClick={event => {
                event.preventDefault()

                dispatch(disableAddMode())
            }}
        />
    )
}
