import { TProduct } from '../model/product'
import { Typography } from '@mui/material'
import Error from 'components/error'
import Card, { TCardActionsData, TCardMediaData, TCardProps } from 'components/ui/card'
import { ButtonLink } from 'components/ui/link'
import { ResponseError } from 'model/error'

type TProductDetailsProps = {
    product: TProduct | null,
    fetchProductError?: Error
}

const ProductDetails = ({product, fetchProductError}: TProductDetailsProps) => {
    if (fetchProductError) {
        return <Error error={(fetchProductError instanceof ResponseError) ? fetchProductError : ResponseError.create(fetchProductError)} />
    }

    if (!product) {
        return (<></>)
    }

    const mediaData: TCardMediaData = {
        component: 'img',
        src: product.files.image as string,
        height: '500'
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
        leftSide: <ButtonLink size="small" href='/products'>Back</ButtonLink>
    }

    const cardProps: TCardProps = {
        content,
        mediaData,
        actionsData
    }

    return <Card {...cardProps} />
}

export default ProductDetails
