import Error from 'components/error'
import IProduct from 'types/product'
import { ProductContext } from 'context/product/product'
import { useContext } from 'react'

export type TProductDetailsProps = {
    product: IProduct | null
}

export default function ProductDetails() {
    const { product, fetchProductError } = useContext(ProductContext)

    if (fetchProductError) {
        return (
            <Error error={fetchProductError} />       
        )
    }

    if (!product) {
        return (<></>)
    }

    return (
        <div className="p-4">
            <div className="text-2xl font-bold p-4 flex justify-center">
                {product.displayName}
            </div>
            <div className='py-2 '>
                <span className='pr-2 '>Price:</span>
                <span className='font-bold '>{product.price} &#8381;</span>
            </div>
            <div>
                {product.description}
            </div>
        </div>
    )
}