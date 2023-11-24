import { TBaseProduct, TProduct } from '../model/product';
import { Delete } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import Card, { TCardActionsData, TCardMediaData, TCardProps } from 'components/ui/card';
import { useConfirm } from 'material-ui-confirm';
import { useSnackbar } from 'notistack';

type TProductListItemViewProps = {
    product: TProduct,
    startProductEditProcess?: (product: TProduct) => void,
    deleteProduct?: (product: TBaseProduct) => Promise<void>
}

export default function ProductListItemView(props: TProductListItemViewProps) {
    const {
        product,
        startProductEditProcess,
        deleteProduct
    } = props

    const { enqueueSnackbar } = useSnackbar()
    const confirm = useConfirm()

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
        rightSide: deleteProduct && <Button size="small" color='error' onClick={async (event) => {
            event.preventDefault()

            try {
                await confirm({
                    title: `Delete product ${product.displayName}?`,
                    titleProps: {color: 'error'},
                    description: 'It will be completely deleted from the database! Are you sure?',
                    confirmationText: <Typography color='error'>Yes</Typography>
                })
            } catch (error) {
                // Deletion cancelled.
                return
            }

            try {
                await deleteProduct(product)
            } catch (error: any) {
                enqueueSnackbar(error.message, {
                    variant: 'error',
                    persist: true
                })
            }
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

