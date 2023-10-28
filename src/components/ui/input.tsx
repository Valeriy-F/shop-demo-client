import { FieldErrors } from './field-error';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { ChangeEvent } from 'react';

type TInputProps = {
    value?: string | number,
    placeholder?: string,
    name?: string,
    label?: string,
    type?: string,
    errors?: string[]
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

type TTextareaProps = {
    value?: string | number,
    placeholder?: string,
    name?: string,
    label?: string,
    errors?: string[]
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export default function TextField(props: TextFieldProps) {
    return (
        <div>
            <MuiTextField
                variant="outlined"
                size='small'
                margin='normal'
                fullWidth
                {...props}
            />
        </div>
    )
}

function Input({
    type = 'text',
    value = '',
    errors = [],
    placeholder,
    name,
    label,
    onChange
}: TInputProps) {
    return (
        <div>
            {label && <label>{label}</label>}

            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />

            {(errors.length > 0) && <FieldErrors fieldName='name' errors={errors} />}
        </div>
    )
}

function Textarea({
    value = '',
    errors = [],
    placeholder,
    name,
    label,
    onChange
}: TTextareaProps) {
    return (
        <div>
            {label && <label>{label}</label>}
            <textarea
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            ></textarea>

            {(errors.length > 0) && <FieldErrors fieldName='name' errors={errors} />}
        </div>
    )
}
