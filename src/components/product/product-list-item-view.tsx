import IProduct from 'types/product'
import { Link } from 'react-router-dom'
import { MouseEvent, useContext } from 'react'
import { ProductListItemContext } from 'context/product/product-list-item'

type TProductListItemViewProps = {
    product: IProduct
}

export default function ProductListItemView({ product }: TProductListItemViewProps) {
    const {productDelete, toggleEditModeOnClick} = useContext(ProductListItemContext)

    const handleDeleteClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()

        productDelete(product)
    }

    return (
        <div>
            <div className='grid grid-cols-2'>
                <div>
                    <Link to='#' onClick={toggleEditModeOnClick} className=' hover:text-current-500'>Edit</Link>
                </div>
                <div className='text-right'>
                    <Link to='#' onClick={handleDeleteClick} className='text-red-800 hover:text-red-500'>Delete</Link>
                </div>
            </div>
            <div className="text-2xl font-bold py-2 flex justify-center">
                <Link to={product.name || ''}>{product.displayName}</Link>
            </div>
            <div className='font-bold py-2 flex justify-center'>
                {product.price} &#8381;
            </div>
            <div>
                {product.description}
            </div>
        </div>
    )
}