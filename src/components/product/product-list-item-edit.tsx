import ProductForm from './product-form';
import { ProductListItemContext } from 'context/product/product-list-item';
import { useContext } from 'react';
import IProduct from 'types/product';

type TProductListItemEditProps = {
    product: IProduct
}

export default function ProductListItemEdit({product}: TProductListItemEditProps) {
    const {productPut, toggleEditModeOnClick} = useContext(ProductListItemContext)

    return (
        <ProductForm sendForm={productPut} defaultValue={product} cancelButtonHandler={toggleEditModeOnClick} />
    )
}
