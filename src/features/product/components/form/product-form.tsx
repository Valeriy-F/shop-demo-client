import { yupValidationSchema } from './product-form-validation'
import { Product, TBaseProduct } from '../../model/product'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Typography } from '@mui/material'
import Card, { TCardActionsData, TCardMediaData, TCardProps } from 'components/ui/card'
import { Loading } from 'components/ui/loading'
import { Alert } from 'components/ui/notification'
import { useAppForm } from 'hooks/use-app-form'
import { useConfirm } from 'material-ui-confirm'
import { MouseEventHandler } from 'react'
import { TFormProps } from 'types/form'

type TProductFormData = {
    product: TBaseProduct,
    files: {
        image?: File | null;
    };
}

type TProductFormProps = {
    onCancelButtonClick?: MouseEventHandler
} & TFormProps<TProductFormData>

const ProductForm = ({ formData, formFields, submitHandler, onCancelButtonClick }: TProductFormProps) => {
    const product = formData?.product;
    const confirm = useConfirm()

    const {
        control,
        errors,
        submitHandler: wrappedSubmitHandler,
        formState: { isLoading, isDirty, isValid }
    } = useAppForm<TProductFormData>({
        defaultValues: formData,
        resolver: yupResolver(yupValidationSchema),
        submitHandler
    })

    const beforeContent = (errors.root && errors.root.message) ? <Alert type='error' title='Error' text={errors.root.message} sx={{borderRadius: '0'}} /> : <></>

    const content = <>{ formFields.map(formField => formField({ control, errors }))}</>;

    const mediaData: TCardMediaData = {
        component: 'img',
        src: (product && Product.isTypeOfProduct(product)) ? product.files.image : process.env.PUBLIC_URL + 'images/prodduct-no-foto.webp'
    }

    const actionsData: TCardActionsData = {
        leftSide: isLoading ? <Loading /> : <Button type='submit' disabled={!isDirty || !isValid}>Save</Button>,
    }

    if (onCancelButtonClick) {
        actionsData.rightSide = <Button color='secondary' onClick={async (event) => {
            if (isDirty) {
                try {
                    await confirm({
                        title: `Close product form?`,
                        titleProps: {color: 'secondary'},
                        description: 'All unsaved changes will be lost! Are you sure?',
                        confirmationText: <Typography color='secondary'>Yes</Typography>
                    })
                } catch (error) {
                    // Cancell form close.
                    return
                }
            }

            onCancelButtonClick(event)
        }}>Close</Button>
    }

    const cardProps: TCardProps = {
        beforeContent,
        content,
        mediaData,
        actionsData,
    }

    return (
        <form onSubmit={wrappedSubmitHandler}>
            <Card {...cardProps} />
        </form>
    );
}

const createFormData = (product: TBaseProduct): TProductFormData => {
    return {
        product,
        files: {
            image: null
        }
    }
}

export default ProductForm
export {
    createFormData, type TProductFormData,
    type TProductFormProps
}
