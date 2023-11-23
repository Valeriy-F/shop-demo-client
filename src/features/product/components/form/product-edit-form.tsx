import {
    DescriptionProductFormField,
    DisplayNameProductFormField,
    ImageFileProductFormField,
    PriceProductFormField
    } from './fields';
import ProductForm, { createFormData, TProductFormProps } from './product-form';
import ProductApi from '../../api/product-api';
import { Product, TProduct } from '../../model/product';
import { MouseEvent } from 'react';

type TProductEditFormProps = {
    product: TProduct,
    afterProductUpdatedHook?: (product: TProduct) => void;
    afterImageFileUploadedHook?: (product: TProduct) => void;
    afterAllDataUpdatedHook?: (product: TProduct) => void;
    onCancelButtonClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
}

export default function ProductEditForm(props: TProductEditFormProps) {
    const {
        product,
        afterProductUpdatedHook,
        afterImageFileUploadedHook,
        afterAllDataUpdatedHook,
        onCancelButtonClick
    } = props

    const submirHandler: TProductFormProps['submitHandler'] = async ({ product, files }) => {
        const imageFile = files.image;
        if (!Product.isTypeOf(product)) {
            product = Product.create(product);
        }


        const requests = [
            ProductApi.put(product)
                .then(productResponse => {
                    afterProductUpdatedHook && afterProductUpdatedHook(productResponse);
                })
                .catch(error => {
                    const errorMessage = `Failed to update product "${product.name}".`

                    console.error(errorMessage, error)

                    throw new Error(errorMessage)
                })
        ]

        if (imageFile) {
            const patchImageRequest = ProductApi.patchImage(product as TProduct, imageFile)
                .then(productResponse => {
                    afterImageFileUploadedHook && afterImageFileUploadedHook(productResponse);
                })
                .catch(error => {
                    const errorMessage = `Failed to upload image file "${imageFile.name}" for product "${product.name}".`

                    console.error(errorMessage, error)

                    throw new Error(errorMessage)
                })

            requests.push(patchImageRequest)
        }

        return Promise.all(requests).then(responses => {
            afterAllDataUpdatedHook && afterAllDataUpdatedHook(product as TProduct);

            return responses
        })
    }

    return (
        <ProductForm
            formData={createFormData(product)}
            submitHandler={submirHandler}
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
