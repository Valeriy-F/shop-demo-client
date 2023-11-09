import { Button } from '@mui/material';
import { TProductPutRequest } from 'api/product-api';
import Card, { TCardActionsData, TCardMediaData, TCardProps } from 'components/ui/card';
import useProductForm from 'hooks/product/use-product-form';
import { MouseEvent } from 'react';
import IProduct from 'types/product';

type TProductFormProps = {
    sendForm: TProductPutRequest
    defaultValue?: IProduct,
    cancelButtonHandler?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
}

export default function ProductForm(props: TProductFormProps) {
    const {
        defaultValue: product,
        cancelButtonHandler,
        sendForm
    } = props

    const {
        formFields,
        handleSubmit
    } = useProductForm({product, sendForm});

    const nameField = !product
        ? formFields.buildProductFormName() : <></>

    const content = (<>
        {nameField}
        {formFields.buildProductFormDisplayName()}
        {formFields.buildProductFormPrice()}
        {formFields.buildProductFormDescription()}
    </>)

    const mediaData: TCardMediaData = {
        component: 'img',
        src: process.env.PUBLIC_URL + "/images/product.webp"
    }

    const actionsData: TCardActionsData = {
        leftSide: <Button type='submit'>Save</Button>,
    }

    if (cancelButtonHandler) {
        actionsData.rightSide = <Button color='secondary' onClick={cancelButtonHandler}>Close</Button>
    }

    const cardProps: TCardProps = {
        content,
        mediaData,
        actionsData,
    }

    return (
        <form onSubmit={handleSubmit()}>
            <Card {...cardProps} />
        </form>
    );
}
