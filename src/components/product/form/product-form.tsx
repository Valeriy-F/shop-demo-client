import { yupValidationSchema } from './product-form-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import Card, { TCardActionsData, TCardMediaData, TCardProps } from 'components/ui/card';
import { Loading } from 'components/ui/loading';
import { Alert } from 'components/ui/notification';
import { BaseProduct, Product } from 'model/product';
import { closeSnackbar } from 'notistack';
import { MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TFormProps } from 'types/form';
import { TBaseProduct } from 'types/product';

type TProductFormData = {
    product: TBaseProduct,
    files: {
        image?: File | null;
    };
}

type TProductFormProps = {
    onCancelButtonClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
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
        src: (product instanceof Product) ? product.files.image : process.env.PUBLIC_URL + 'images/prodduct-no-foto.webp'
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
        if (data.files) {
            if (!(data.product instanceof Product) && Product.isTypeOf(data.product)) {
                const product = new Product();
                product.apply(data.product);

                data.product = product;
            }
        } else {
            if (!(data.product instanceof BaseProduct) && BaseProduct.isTypeOf(data.product)) {
                const product = new BaseProduct();
                product.apply(data.product);

                data.product = product;
            }
        }

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

const createFormData = (product: BaseProduct): TProductFormData => {
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
