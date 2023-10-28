import { Delete } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import Card, { TCardActionsData, TCardMediaData, TCardProps } from 'components/ui/card';
import { ProductListItemContext } from 'context/product/product-list-item';
import { MouseEvent, useContext } from 'react';
import IProduct from 'types/product';

type TProductListItemViewProps = {
    product: IProduct
}

export default function ProductListItemView({ product }: TProductListItemViewProps) {
    const {productDelete, toggleEditModeOnClick} = useContext(ProductListItemContext)

    const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        productDelete(product)
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
        leftSide: <Button size="small" onClick={toggleEditModeOnClick}>Edit</Button>,
        rightSide: <Button size="small" color='error' onClick={handleDeleteClick} startIcon={<Delete />}>Delete</Button>
    }

    const cardProps: TCardProps = {
        content,
        mediaData,
        actionsData,
        actionAreaUrl: product.name || ''
    }

    return <Card {...cardProps} />
}
