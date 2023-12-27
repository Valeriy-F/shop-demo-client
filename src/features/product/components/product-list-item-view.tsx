import { useDeleteProductHandler } from '../hooks/use-product-api'
import { TProduct } from '../model/product'
import { Delete } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import Card, { TCardActionsData, TCardMediaData, TCardProps } from 'components/ui/card'
import { useConfirm } from 'material-ui-confirm'
import { useSnackbar } from 'notistack'
import { useAppStore } from 'store/app-store'

type TProductListItemViewProps = {
    product: TProduct
}

const ProductListItemView = ({product}: TProductListItemViewProps) => {
    const { productStore: { productForEdit, isAddMode, enableEditMode } } = useAppStore()
    const deleteProduct = useDeleteProductHandler()
    const { enqueueSnackbar } = useSnackbar()
    const confirm = useConfirm()

    const isProductEditable = !productForEdit && !isAddMode

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
        leftSide: <Button size="small" disabled={!isProductEditable} onClick={event => {
            if (!isProductEditable) {
                return false
            }

            enableEditMode(product)
        }}>Edit</Button>,
        rightSide: <Button size="small" color='error' onClick={async (event) => {
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

export default ProductListItemView
