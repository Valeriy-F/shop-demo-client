import { ModelResponseError } from 'model/error'
import { closeSnackbar, useSnackbar } from 'notistack'
import {
    FieldPath,
    FieldValues,
    SubmitHandler,
    useForm,
    UseFormProps
    } from 'react-hook-form'

type TUseAppFormProps<TFormData extends FieldValues> = {
    submitHandler: SubmitHandler<TFormData>
} & UseFormProps<TFormData>

const useAppForm = <TFormData extends FieldValues>(props: TUseAppFormProps<TFormData>) => {
    const { enqueueSnackbar } = useSnackbar()

    const {
        submitHandler,
        defaultValues,
        resolver
    } = props

    const {
        control,
        handleSubmit,
        formState,
        setError,
        clearErrors
    } = useForm<TFormData>({
        defaultValues,
        resolver
    })

    const {errors} = formState

    const submitHandlerWrapper = async (data: TFormData) => {
        closeSnackbar()
        clearErrors()

        try {
            await submitHandler(data)

            enqueueSnackbar('Form was submitted successfully', { variant: 'success' })
        } catch (error: any) {
            if (error instanceof ModelResponseError && (!error.status || error.status < 500)) {
                if (error.message) {
                    enqueueSnackbar(error.message, {
                        variant: 'error',
                        persist: true
                    })
                }

                if (error.modelError) {
                    if (error.modelError.message) {
                        setError('root', { message: error.modelError.message })
                    }

                    error.modelError.fieldErrors.forEach(fieldError => {
                        setError(fieldError.fieldName as FieldPath<TFormData>, { message: fieldError.errorText }, { shouldFocus: true })
                    })
                }
            } else {
                enqueueSnackbar('Something went wrong! :-(', {
                    variant: 'error',
                    persist: true
                })
            }
        }
    }

    return {
        formState,
        submitHandler: handleSubmit(submitHandlerWrapper),
        control,
        errors
    }
}

export { useAppForm }

