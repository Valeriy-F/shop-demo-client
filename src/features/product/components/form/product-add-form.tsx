import {
    DescriptionProductFormField,
    DisplayNameProductFormField,
    ImageFileProductFormField,
    NameProductFormField,
    PriceProductFormField
    } from './fields';
import ProductForm, { createFormData, TProductFormProps } from './product-form';
import { BaseProduct } from '../../model/product';

type TProductAddFormProps = Pick<TProductFormProps, 'submitHandler' | 'onCancelButtonClick'>

export default function ProductAddForm({ submitHandler, onCancelButtonClick }: TProductAddFormProps) {
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
            onCancelButtonClick={onCancelButtonClick}
        />
    )
}

export { type TProductAddFormProps }
