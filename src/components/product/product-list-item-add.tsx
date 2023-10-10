import Panel from 'components/ui/panel'
import ProductForm from './product-form'
import { Link } from 'react-router-dom'
import { ProductListContext } from 'context/product/product-list'
import { useContext } from 'react'

export default function ProductListItemAdd() {
    const {createProduct, disableAddNewProductMode} = useContext(ProductListContext)

    return (
        <Panel>
            <div className='text-right'>
                <Link to='#' onClick={disableAddNewProductMode}>Cancel</Link>
            </div>
            <div className='text-2xl font-bold py-2'>Create new product:</div>
            <ProductForm sendForm={createProduct} />
        </Panel>
    )
}