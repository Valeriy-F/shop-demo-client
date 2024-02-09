import {
    Control,
    FieldErrors,
    FieldValues,
    SubmitHandler
    } from 'react-hook-form';

type TFormField<TFormData extends FieldValues> = (props: TFormFieldProps<TFormData>) => JSX.Element;

type TFormFieldProps<TFormData extends FieldValues> = {
    control: Control<TFormData>,
    errors: FieldErrors<TFormData>
}

type TFormProps<TFormData extends FieldValues> = {
    submitHandler: SubmitHandler<TFormData>
    formFields: TFormField<TFormData>[]
    formData?: TFormData
}

export {
    type TFormField,
    type TFormFieldProps,
    type TFormProps
};
