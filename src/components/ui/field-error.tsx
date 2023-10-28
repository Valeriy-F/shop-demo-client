type TFieldErrorProps = {
    error: string
}

type TFieldErrorsProps = {
    fieldName: string,
    errors: string[]
}

export const FieldError = ({ error }: TFieldErrorProps) => {
    return (
        <div>{error}</div>
    )
}

export const FieldErrors = ({ fieldName, errors }: TFieldErrorsProps) => {
    return (<>
        {errors.map((error: string, index: number) => (<FieldError key={`${fieldName}-error-${index}`} error={error} />))}
    </>)
}