import ConflictException from 'api/exceptions/ConflictException';
import { TProductFormEventTartget, TProductFormProps } from 'components/product/product-form';
import { ChangeEvent, FormEvent, useState } from 'react';

export type TUseProductFormProps = TProductFormProps

export function useProductForm({ sendForm, defaultValue }: TUseProductFormProps) {
    const [name, setName] = useState<string>(defaultValue?.name || '')
    const [nameErrors, setNameErrors] = useState<string[]>([])
    const [displayName, setDisplayName] = useState<string>(defaultValue?.displayName || '')
    const [displayNameErrors, setDisplayNameErrors] = useState<string[]>([])
    const [price, setPrice] = useState<number>(defaultValue?.price || 0)
    const [priceErrors, setPriceErrors] = useState<string[]>([])
    const [description, setDescription] = useState<string>(defaultValue?.description || '')
    const [descriptionErrors, setDescriptionErrors] = useState<string[]>([])

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value)
    }

    const handleDisplayNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDisplayNameErrors([])
        setDisplayName(event.currentTarget.value)
    }

    const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPriceErrors([])
        setPrice(Number(event.currentTarget.value))
    }

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionErrors([])
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
        setName('')
        setDisplayName('')
        setPrice(0)
        setDescription('')
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
            id: 'name',
            name: 'name',
            value: name,
            label: 'Name',
            placeholder: 'Enter product name...',
            required: true,
            error: (nameErrors.length > 0),
            helperText: (nameErrors.length > 0) ? nameErrors[0] : '',
            onChange: handleNameChange,
        },
        displayNameFeildProps: {
            type: 'text',
            id: 'displayName',
            name: 'displayName',
            value: displayName,
            label: 'Display name',
            placeholder: 'Enter product display name...',
            required: true,
            error: (displayNameErrors.length > 0),
            helperText: (displayNameErrors.length > 0) ? displayNameErrors[0] : '',
            onChange: handleDisplayNameChange,
        },
        priceFieldProps: {
            type: 'number',
            id: 'price',
            name: 'price',
            value: price,
            label: 'Price',
            placeholder: 'Enter product price...',
            required: true,
            error: (priceErrors.length > 0),
            helperText: (priceErrors.length > 0) ? priceErrors[0] : '',
            onChange: handlePriceChange,
        },
        descriptionFieldProps: {
            multiline: true,
            id: 'description',
            name: 'description',
            value: description,
            label: 'Description',
            placeholder: 'Enter product description...',
            error: (descriptionErrors.length > 0),
            helperText: (descriptionErrors.length > 0) ? descriptionErrors[0] : '',
            onChange: handleDescriptionChange,
        },
        handleFormSubmit
    }
}
