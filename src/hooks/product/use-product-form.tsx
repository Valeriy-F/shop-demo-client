import { yupResolver } from '@hookform/resolvers/yup';
import { InputAdornment } from '@mui/material';
import { THttpRequest } from 'api/client';
import TextField from 'components/ui/input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import IProduct from 'types/product';
import * as yup from 'yup';

type TUseProductFormProps = {
    sendForm: THttpRequest<IProduct, IProduct>
    product?: IProduct,
}

const validationSchema = yup
    .object({
        name: yup.string().trim().required(),
        displayName: yup.string().trim().required(),
        price: yup.number().positive().required(),
        description: yup.string()
    })
    .required()

const useProductForm = ({ product, sendForm }: TUseProductFormProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<IProduct>({
        defaultValues: product || {
            name: '',
            displayName: '',
            price: 0,
            description: ''
        },
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<IProduct> = sendForm

    const buildProductFormName = () => (
        <Controller
            name= "name"
            control={control}
            render={({ field: {
                name,
                value,
                ref,
                onChange,
                onBlur
            } }) => <TextField
                name={name}
                value={value}
                label='Name'
                placeholder='Enter product name...'
                error={!!errors.name}
                helperText={errors.name?.message ?? 'Valid underscore string'}
                onBlur={onBlur}
                onChange={onChange}
                inputRef={ref}
            />}
        />
    )

    const buildProductFormDisplayName = () => (
        <Controller
            name= "displayName"
            control={control}
            render={({ field: {
                name,
                value,
                ref,
                onChange,
                onBlur
            } }) => <TextField
                name={name}
                value={value}
                label='Display name'
                placeholder='Enter product display name...'
                error={!!errors.displayName}
                helperText={errors.displayName?.message ?? ''}
                onBlur={onBlur}
                onChange={onChange}
                inputRef={ref}
            />}
        />
    )

    const buildProductFormPrice = () => (
        <Controller
            name= "price"
            control={control}
            render={({ field: {
                name,
                value,
                ref,
                onChange,
                onBlur
            } }) => <TextField
                type='number'
                label='Price'
                placeholder='Enter product price...'
                error={!!errors.price}
                helperText={errors.price?.message ?? ''}
                InputProps={{
                    startAdornment: <InputAdornment position="start">&#8381;</InputAdornment>,
                }}
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                inputRef={ref}
            />}
        />
    )

    const buildProductFormDescription = () => (
        <Controller
            name= "description"
            control={control}
            render={({ field: {
                name,
                value,
                ref,
                onChange,
                onBlur
            } }) => <TextField
                multiline
                label='Description'
                placeholder='Enter product description...'
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                inputRef={ref}
            />}
        />
    )

    return {
        formFields: {
            buildProductFormName,
            buildProductFormDisplayName,
            buildProductFormPrice,
            buildProductFormDescription
        },
        handleSubmit: () => handleSubmit(onSubmit)
    }
}

export default useProductForm
