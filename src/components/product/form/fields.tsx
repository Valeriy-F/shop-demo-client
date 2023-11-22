import { TProductFormData } from './product-form';
import { InputAdornment } from '@mui/material';
import { FileInputField, TextField } from 'components/ui/input';
import { Controller } from 'react-hook-form';
import { TFormFieldProps } from 'types/form';

const NameProductFormField = ({ control, errors }: TFormFieldProps<TProductFormData>) => (
    <Controller
        key= "product.name"
        name= "product.name"
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
            error={!!errors.product?.name}
            helperText={errors.product?.name?.message ?? 'Valid underscore string'}
            onBlur={onBlur}
            onChange={onChange}
            inputRef={ref}
        />}
    />
)

const DisplayNameProductFormField = ({control, errors}: TFormFieldProps<TProductFormData>) => (
    <Controller
        key= "product.displayName"
        name= "product.displayName"
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
            error={!!errors.product?.displayName}
            helperText={errors.product?.displayName?.message ?? ''}
            onBlur={onBlur}
            onChange={onChange}
            inputRef={ref}
        />}
    />
)

const PriceProductFormField = ({control, errors}: TFormFieldProps<TProductFormData>) => (
    <Controller
        key= "product.price"
        name= "product.price"
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
            error={!!errors.product?.price}
            helperText={errors.product?.price?.message ?? ''}
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

const DescriptionProductFormField = ({control, errors}: TFormFieldProps<TProductFormData>) => (
    <Controller
        key= "product.description"
        name= "product.description"
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
            value={value || ''}
            onBlur={onBlur}
            onChange={onChange}
            inputRef={ref}
        />}
    />
)

const ImageFileProductFormField = ({control, errors}: TFormFieldProps<TProductFormData>) => (
    <Controller
        key="files.image"
        name= "files.image"
        control={control}
        render={({ field: {
            name,
            value,
            ref,
            onChange,
            onBlur
        }}) => <FileInputField
            name={name}
            label='Product image'
            value={value}
            inputProps={{ accept: 'image/*' }}
            onBlur={onBlur}
            onChange={onChange}
            inputRef={ref}
            error={!!errors.files?.image}
            helperText={errors.files?.image?.message ?? ''}
        />}
    />
)

export {
    DescriptionProductFormField,
    DisplayNameProductFormField,
    ImageFileProductFormField,
    NameProductFormField,
    PriceProductFormField
};
