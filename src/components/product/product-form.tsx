import { Button, InputAdornment } from '@mui/material';
import { TProductPutRequest } from 'api/product-api';
import Card, { TCardActionsData, TCardMediaData, TCardProps } from 'components/ui/card';
import TextField from 'components/ui/input';
import { useProductForm } from 'hooks/product/product-form';
import { MouseEvent } from 'react';
import IProduct from 'types/product';

export type TProductFormEventTartget = EventTarget & {
    name: { value: string }
    displayName: { value: string }
    price: { value: number }
    description: { value: string }
}

export type TProductFormProps = {
    sendForm: TProductPutRequest
    defaultValue?: IProduct,
    cancelButtonHandler?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
}

export default function ProductForm(props: TProductFormProps) {
    const {defaultValue: product, cancelButtonHandler} = props

    const {
        nameFeildProps,
        displayNameFeildProps,
        priceFieldProps,
        descriptionFieldProps,
        handleFormSubmit
    } = useProductForm(props)

    const mediaData: TCardMediaData = {
        component: 'img',
        src: process.env.PUBLIC_URL + "/images/product.webp"
    }

    const content = (<>
        {!product && <TextField {...nameFeildProps} />}
        <TextField {...displayNameFeildProps} />
        <TextField
            {...priceFieldProps}
            InputProps={{
                startAdornment: <InputAdornment position="start">&#8381;</InputAdornment>,
            }}
        />
        <TextField {...descriptionFieldProps} />
    </>)

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
        <form onSubmit={handleFormSubmit}>
            <Card {...cardProps} />
        </form>
    );
}
