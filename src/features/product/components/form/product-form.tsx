import { yupValidationSchema } from './product-form-validation';
import { Product, TBaseProduct } from '../../model/product';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import Card, { TCardActionsData, TCardMediaData, TCardProps } from 'components/ui/card';
import { Loading } from 'components/ui/loading';
import { Alert } from 'components/ui/notification';
import { closeSnackbar } from 'notistack';
import { MouseEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TFormProps } from 'types/form';

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
    const [submitError, setSubmitError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const product = formData?.product;

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<TProductFormData>({
        defaultValues: formData,
        resolver: yupResolver(yupValidationSchema)
    });

    const beforeContent = submitError ? <Alert type='error' title='Error' text={submitError} sx={{
        borderRadius: '0'
    }} /> : <></>

    const content = <>{ formFields.map(formField => formField({ control, errors }))}</>;

    const mediaData: TCardMediaData = {
        component: 'img',
        src: Product.isTypeOf(product) ? product.files.image : process.env.PUBLIC_URL + 'images/prodduct-no-foto.webp'
    }

    const actionsData: TCardActionsData = {
        leftSide: isLoading ? <Loading /> : <Button type='submit'>Save</Button>,
    }

    if (onCancelButtonClick) {
        actionsData.rightSide = <Button color='secondary' onClick={onCancelButtonClick}>Close</Button>
    }

    const cardProps: TCardProps = {
        beforeContent,
        content,
        mediaData,
        actionsData,
    }

    const submitHandlerWrapper = async (data: TProductFormData) => {
        closeSnackbar()
        setSubmitError(undefined)
        setIsLoading(true)

        try {
            await submitHandler(data);
        } catch (error: any) {
            setSubmitError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(submitHandlerWrapper)}>
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
    type TProductFormData,
    type TProductFormProps,
    createFormData
};
