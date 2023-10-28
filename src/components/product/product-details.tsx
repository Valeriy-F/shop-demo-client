import { Button, Typography } from '@mui/material';
import Error from 'components/error';
import Card, { TCardActionsData, TCardMediaData, TCardProps } from 'components/ui/card';
import { ProductContext } from 'context/product/product';
import { useContext } from 'react';
import IProduct from 'types/product';

export type TProductDetailsProps = {
    product: IProduct | null
}

export default function ProductDetails() {
    const { product, fetchProductError } = useContext(ProductContext)

    if (fetchProductError) {
        return (
            <Error error={fetchProductError} />
        )
    }

    if (!product) {
        return (<></>)
    }

    const mediaData: TCardMediaData = {
        component: 'img',
        src: process.env.PUBLIC_URL + "/images/product.webp"
    }

    const content = (<>
        <Typography gutterBottom variant="h5" component="div" sx={{
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 'bold'
        }}>
            {product.displayName}
        </Typography>
        <Typography gutterBottom variant="h6" component="div" sx={{
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 'bold'
        }}>
            {product.price} &#8381;
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {product.description}
        </Typography>
    </>)

    const actionsData: TCardActionsData = {
        leftSide: <Button size="small" href='/products'>Back</Button>,
    }

    const cardProps: TCardProps = {
        content,
        mediaData,
        actionsData
    }

    return <Card {...cardProps} />
}
