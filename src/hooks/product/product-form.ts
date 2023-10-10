import ConflictException from 'api/exceptions/ConflictException'
import { ChangeEvent, FormEvent, useState } from 'react'
import { TProductFormEventTartget, TProductFormProps } from 'components/product/product-form'

export type TUseProductFormProps = TProductFormProps

export function useProductForm({ sendForm, defaultValue }: TUseProductFormProps) {
    const [name, setName] = useState<string | undefined>(defaultValue?.name)
    const [nameErrors, setNameErrors] = useState<string[]>([])
    const [displayName, setDisplayName] = useState<string | undefined>(defaultValue?.displayName)
    const [displayNameErrors, setDisplayNameErrors] = useState<string[]>([])
    const [price, setPrice] = useState<number | undefined>(defaultValue?.price)
    const [priceErrors, setPriceErrors] = useState<string[]>([])
    const [description, setDescription] = useState<string | undefined>(defaultValue?.description || undefined)
    const [descriptionErrors, setDescriptionErrors] = useState<string[]>([])

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value)
    }

    const handleDisplayNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDisplayName(event.currentTarget.value)
    }

    const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(event.currentTarget.value))
    }

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.currentTarget.value)
    }

    const handleFormSubmitError = (error: unknown) => {
    
        if (error instanceof ConflictException) {
            error.getResponseInfo().errors.forEach(error => {
                switch (error.property) {
                    case 'name':
                        setNameErrors(prevState => [...prevState, error.message])

                        break

                    case 'displayName':
                        setDisplayNameErrors(prevState => [...prevState, error.message])

                        break

                    case 'price':
                        setPriceErrors(prevState => [...prevState, error.message])

                        break

                    case 'description':
                        setDescriptionErrors(prevState => [...prevState, error.message])

                        break
                }
            })
        }
    }

    const resetState = () => {
        setName(undefined)
        setDisplayName(undefined)
        setPrice(undefined)
        setDescription(undefined)
    }

    const resetErrors = () => {
        setNameErrors([])
        setDisplayNameErrors([])
        setPriceErrors([])
        setDescriptionErrors([])
    }

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault()

        resetErrors()

        const target = event.target as TProductFormEventTartget

        try {
            await sendForm({
                name: defaultValue?.name || target.name.value,
                displayName: target.displayName.value,
                price: target.price.value,
                description: target.description.value
            })

            if (!defaultValue) {
                resetState()
            }
        } catch (error: unknown) {
            handleFormSubmitError(error)
        }
    }

    return {
        nameFeildProps: {
            type: 'text',
            name: 'name',
            value: name,
            placeholder: 'Name (unique)',
            onChange: handleNameChange,
            errors: nameErrors
        },
        displayNameFeildProps: {
            type: 'text',
            name: 'displayName',
            value: displayName,
            placeholder: 'Display name',
            onChange: handleDisplayNameChange,
            errors: displayNameErrors
        },
        priceFieldProps: {
            type: 'number',
            name: 'price',
            value: price,
            placeholder: 'Price',
            onChange: handlePriceChange,
            errors: priceErrors
        },
        descriptionFieldProps: {
            name: 'description',
            value: description,
            placeholder: 'Enter product description...',
            onChange: handleDescriptionChange,
            errors: descriptionErrors
        },
        handleFormSubmit
    }
}
