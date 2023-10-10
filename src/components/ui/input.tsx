import { ChangeEvent } from 'react'
import { FieldErrors } from './field-error'

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

export default function Input({
    type = 'text',
    value = '',
    errors = [],
    placeholder,
    name,
    label,
    onChange
}: TInputProps) {
    return (
        <div className='flex flex-col items-start py-1'>
            {label && <label>{label}</label>}
            
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className='w-full px-2 py-1 border rounded-md placeholder:text-sm outline-none' />
            
            {(errors.length > 0) && <FieldErrors fieldName='name' errors={errors} />}
        </div>
    )
}

export function Textarea({
    value = '',
    errors = [],
    placeholder,
    name,
    label,
    onChange
}: TTextareaProps) {
    return (
        <div className='h-full flex flex-col items-start py-1'>
            {label && <label>{label}</label>}
            <textarea
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className='w-full h-full px-2 py-1 border rounded-md placeholder:text-sm outline-none'
            ></textarea>

            {(errors.length > 0) && <FieldErrors fieldName='name' errors={errors} />}
        </div>
    )
}