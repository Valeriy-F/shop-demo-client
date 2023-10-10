import Button from 'components/ui/button'
import Input, { Textarea } from 'components/ui/input'
import IProduct from 'types/product'
import { TProductPutRequest } from 'api/product-api'
import { useProductForm } from 'hooks/product/product-form'

export type TProductFormEventTartget = EventTarget & {
    name: { value: string }
    displayName: { value: string }
    price: { value: number }
    description: { value: string }
}

export type TProductFormSendFormHandler = (product: IProduct) => Promise<IProduct>

export type TProductFormProps = {
    sendForm: TProductPutRequest
    defaultValue?: IProduct,
}

export default function ProductForm(props: TProductFormProps) {
    const {
        nameFeildProps,
        displayNameFeildProps,
        priceFieldProps,
        descriptionFieldProps,
        handleFormSubmit
    } = useProductForm(props)

    return (
        <div>
            <div className='py-2'>
                <form onSubmit={handleFormSubmit}>
                    {!props.defaultValue && <Input {...nameFeildProps} />}
                    <Input {...displayNameFeildProps} />
                    <Input {...priceFieldProps} />
                    <Textarea {...descriptionFieldProps} />

                    <div className='pt-4'>
                        <Button name='Save' type='submit' className='w-full' />
                    </div>
                </form>
            </div>
        </div>
    )
}