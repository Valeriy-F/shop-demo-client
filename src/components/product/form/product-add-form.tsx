import {
    DescriptionProductFormField,
    DisplayNameProductFormField,
    ImageFileProductFormField,
    NameProductFormField,
    PriceProductFormField
    } from './fields';
import ProductForm, { TProductFormProps } from './product-form';
import ProductApi from 'api/product-api';
import { BaseProduct, Product } from 'model/product';
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
            console.error(`Fialed to create new product "${product.name}".`);

            return;
        }

        if (imageFile) {
            try {
                await ProductApi.patchImage(productResponse, imageFile);

                afterImageFileUploadedHook && afterImageFileUploadedHook(productResponse)
            } catch (error) {
                console.error(`Failed to upload image file "${imageFile}" for product "${product.name}".`, error);
            }
        }
    }

    return (
        <ProductForm
            product={new BaseProduct()}
            submitHandler={submitHandler}
            formFields={[
                ImageFileProductFormField,
                NameProductFormField,
                DisplayNameProductFormField,
                PriceProductFormField,
                DescriptionProductFormField
            ]}
            onCancelButtonClick={onCancelButtonClick}
        />
    )
}

export { type TProductAddFormProps }
