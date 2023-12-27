import { TProduct } from 'features/product'
import { Dispatch, SetStateAction, useState } from 'react'

type TProductSore = {
    productForEdit: TProduct | null,
    isAddMode: boolean,
    setIsAddMode: Dispatch<SetStateAction<boolean>>,
    enableEditMode: (product: TProduct) => void,
    disableEditMode: () => void
}

const ProductStore = (): TProductSore => {
    const [isAddMode, setIsAddMode] = useState<boolean>(false)
    const [productForEdit, setProductForEdit] = useState<TProduct | null>(null)

    const enableEditMode = (product: TProduct) => {
        setProductForEdit(product)
    }

    const disableEditMode = () => {
        setProductForEdit(null)
    }

    return {
        productForEdit,
        isAddMode,
        setIsAddMode,
        enableEditMode,
        disableEditMode
    }
}

export { ProductStore, type TProductSore }
