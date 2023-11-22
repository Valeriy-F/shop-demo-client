import {
    DescriptionProductFormField,
    DisplayNameProductFormField,
    ImageFileProductFormField,
    PriceProductFormField
    } from './fields';
import ProductForm, { TProductFormProps } from './product-form';
import ProductApi from 'api/product-api';
import { Product } from 'model/product';
import { MouseEvent } from 'react';

type TProductEditFormProps = {
    product: Product,
    afterProductUpdatedHook?: (product: Product) => void;
    afterImageFileUploadedHook?: (product: Product) => void;
    afterAllDataUpdatedHook?: (product: Product) => void;
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
        const productForUpdate = (product instanceof Product) ? product : Product.create(product);

        const requests = [
            ProductApi.put(productForUpdate)
                .then(productResponse => {
                    productForUpdate.apply(productResponse)

                    afterProductUpdatedHook && afterProductUpdatedHook(productForUpdate);
                })
                .catch(error => {
                    const errorMessage = `Failed to update product "${productForUpdate.name}".`

                    console.error(errorMessage, error)

                    throw new Error(errorMessage)
                })
        ]

        if (imageFile) {
            const patchImageRequest = ProductApi.patchImage(productForUpdate, imageFile)
                .then(productResponse => {
                    productForUpdate.apply(productResponse)

                    afterImageFileUploadedHook && afterImageFileUploadedHook(productForUpdate);
                })
                .catch(error => {
                    const errorMessage = `Failed to upload image file "${imageFile.name}" for product "${productForUpdate.name}".`

                    console.error(errorMessage, error)

                    throw new Error(errorMessage)
                })

            requests.push(patchImageRequest)
        }

        return Promise.all(requests).then(responses => {
            afterAllDataUpdatedHook && afterAllDataUpdatedHook(productForUpdate);

            return responses
        })
    }

    return (
        <ProductForm
            product={product}
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
