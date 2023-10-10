import IProduct from 'types/product'
import ProductForm from './product-form'
import { Link } from 'react-router-dom'
import { ProductListItemContext } from 'context/product/product-list-item'
import { useContext } from 'react'

type TProductListItemEditProps = {
    product: IProduct
}

export default function ProductListItemEdit({product}: TProductListItemEditProps) {
    const {productPut, toggleEditModeOnClick} = useContext(ProductListItemContext)

    console.log('Render Product edit form ' + product.name)

    return (
        <div>
            <div className='text-right'>
                <Link to='#' onClick={toggleEditModeOnClick}>Cancel</Link>
            </div>
            <div>
                <ProductForm sendForm={productPut} defaultValue={product} />
            </div>
        </div>
    )
}