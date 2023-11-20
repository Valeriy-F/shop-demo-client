import { Delete } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import Card, { TCardActionsData, TCardMediaData, TCardProps } from 'components/ui/card';
import { Product } from 'model/product';

type TProductListItemViewProps = {
    product: Product,
    startProductEditProcess?: (product: Product) => void,
    deleteProduct?: (product: Product) => void
}

export default function ProductListItemView(props: TProductListItemViewProps) {
    const {
        product,
        startProductEditProcess,
        deleteProduct
    } = props

    const mediaData: TCardMediaData = {
        component: 'img',
        src: product.files.image
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
        leftSide: startProductEditProcess && <Button size="small" onClick={event => {
                event.preventDefault()
                startProductEditProcess(product)
            }}>Edit</Button>,
        rightSide: deleteProduct && <Button size="small" color='error' onClick={event => {
                event.preventDefault()
                deleteProduct(product)
            }} startIcon={<Delete />}>Delete</Button>
    }

    const cardProps: TCardProps = {
        content,
        mediaData,
        actionsData,
        actionAreaUrl: product.name || ''
    }

    return <Card {...cardProps} />
}

export { type TProductListItemViewProps };

