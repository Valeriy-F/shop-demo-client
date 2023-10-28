import ProductForm from './product-form';
import { ProductListContext } from 'context/product/product-list';
import { useContext } from 'react';

export default function ProductListItemAdd() {
    const {createProduct, disableAddNewProductMode} = useContext(ProductListContext)

    return (
        <ProductForm sendForm={createProduct} cancelButtonHandler={disableAddNewProductMode}/>
    )
}
