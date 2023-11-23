import {
    DescriptionProductFormField,
    DisplayNameProductFormField,
    ImageFileProductFormField,
    PriceProductFormField
    } from './fields'
import ProductForm, { createFormData } from './product-form'
import { TProduct } from '../../model/product'
import { useProductEdit } from 'features/product/hooks/use-product'
import { setProductForEdit } from 'features/product/store/products-slice'
import { useDispatch } from 'store/hooks'

type TProductEditFormProps = {
    product: TProduct
}

export default function ProductEditForm({ product }: TProductEditFormProps) {
    const dispatch = useDispatch()
    const submitHandler = useProductEdit()

    return (
        <ProductForm
            formData={createFormData(product)}
            submitHandler={submitHandler}
            formFields={[
                ImageFileProductFormField,
                DisplayNameProductFormField,
                PriceProductFormField,
                DescriptionProductFormField
            ]}
            onCancelButtonClick={event => {
                event.preventDefault()

                dispatch(setProductForEdit(null))
            }}
        />
    )
}

export { type TProductEditFormProps }
