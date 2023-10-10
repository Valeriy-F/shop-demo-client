import IProduct from 'types/product'
import ProductListItemEdit from './product-list-item-edit'
import ProductListItemView from './product-list-item-view'
import { ProductListItemContext } from 'context/product/product-list-item'
import { useContext } from 'react'

export type TProductListItemProps = {
    product: IProduct,
}

export default function ProductListItem({ product }: TProductListItemProps) {
    const { isEditMode } = useContext(ProductListItemContext)

    return isEditMode
        ? <ProductListItemEdit product={product} />
        : <ProductListItemView product={product} />
}