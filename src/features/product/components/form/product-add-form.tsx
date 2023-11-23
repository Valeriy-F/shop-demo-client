import {
    DescriptionProductFormField,
    DisplayNameProductFormField,
    ImageFileProductFormField,
    NameProductFormField,
    PriceProductFormField
    } from './fields';
import ProductForm, { createFormData, TProductFormProps } from './product-form';
import ProductApi from '../../api/product-api';
import { BaseProduct, Product } from '../../model/product';
import { MouseEvent } from 'react';

type TProductAddFormProps = {
    afterProductCreatedHook?: (product: Product) => void;
    afterImageFileUploadedHook?: (product: Product) => void;
    onCancelButtonClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
}

export default function ProductAddForm(props: TProductAddFormProps) {
    const {
        afterProductCreatedHook,
        afterImageFileUploadedHook,
        onCancelButtonClick
    } = props;

    const submitHandler: TProductFormProps['submitHandler'] = async ({ product, files }) => {
        const imageFile = files.image;

        let productResponse: Product;

        try {
            productResponse = await ProductApi.post(product);

            afterProductCreatedHook && afterProductCreatedHook(productResponse);
        } catch (error) {
            const errorMessage = `Fialed to create new product "${product.name}".`

            console.error(errorMessage, error)

            throw new Error(errorMessage)
        }

        if (imageFile) {
            try {
                await ProductApi.patchImage(productResponse, imageFile);

                afterImageFileUploadedHook && afterImageFileUploadedHook(productResponse)
            } catch (error) {
                const errorMessage = `Failed to upload image file "${imageFile}" for product "${product.name}".`

                console.error(errorMessage, error)

                throw new Error(errorMessage)
            }
        }
    }

    return (
        <ProductForm
            formData={createFormData(new BaseProduct())}
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
