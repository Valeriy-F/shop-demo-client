import {
    DescriptionProductFormField,
    DisplayNameProductFormField,
    ImageFileProductFormField,
    PriceProductFormField
    } from './fields';
import ProductForm, { createFormData, TProductFormProps } from './product-form';
import { TProduct } from '../../model/product';

type TProductEditFormProps = {
    product: TProduct,
} & Pick<TProductFormProps, 'submitHandler' | 'onCancelButtonClick'>

export default function ProductEditForm({ product, submitHandler, onCancelButtonClick }: TProductEditFormProps) {
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
            onCancelButtonClick={onCancelButtonClick}
        />
    )
}

export { type TProductEditFormProps }
