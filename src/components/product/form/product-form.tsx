import { ProductFormDataBuilder, TProductFormData } from './product-form-data';
import { yupValidationSchema } from './product-form-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import Card, { TCardActionsData, TCardMediaData, TCardProps } from 'components/ui/card';
import { Loading } from 'components/ui/loading';
import { BaseProduct, Product } from 'model/product';
import { MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TFormProps } from 'types/form';

type TProductFormProps = {
    product: BaseProduct,
    onCancelButtonClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
} & TFormProps<TProductFormData>


const ProductForm = ({ product, formFields, submitHandler, onCancelButtonClick }: TProductFormProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const formDataBuilder = new ProductFormDataBuilder(product);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<TProductFormData>({
        defaultValues: formDataBuilder.build(),
        resolver: yupResolver(yupValidationSchema)
    });

    const content = formFields.map(formField => formField({ control, errors }));

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

        setIsLoading(true)

        try {
            await submitHandler(data);
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

export default ProductForm
export { type TProductFormProps }
