import {
    createContext,
    MouseEvent,
    ReactNode,
    useContext,
    useState
    } from 'react'
import { ProductListContext } from './product-list'
import { TProductDeleteRequest, TProductPutRequest } from 'api/product-api'
import { useProductDelete, useProductPut } from 'hooks/product/product-api'

type TProductListItemContext = {
    productPut: TProductPutRequest,
    productDelete: TProductDeleteRequest,
    toggleEditModeOnClick: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void,
    isEditMode: boolean
}

type TProductListItemProviderProps = {
    children: ReactNode
}

export const ProductListItemContext = createContext<TProductListItemContext>({
    productPut: async product => product,
    productDelete: async () => { },
    toggleEditModeOnClick: () => { },
    isEditMode: false
})

export function ProductListItemProvider({ children }: TProductListItemProviderProps) {
    const [isEditMode, setIsEditMode] = useState(false)

    const {
        updateProductInList,
        removeProductFromList
    } = useContext(ProductListContext)

    const { productPut } = useProductPut({
        onSuccess: product => {
            updateProductInList(product)
            setIsEditMode(false)
        }
    })

    const { productDelete } = useProductDelete({ onSuccess: removeProductFromList })

    const toggleEditModeOnClick = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        event.preventDefault()

        setIsEditMode(!isEditMode)
    }

    return (
        <ProductListItemContext.Provider value={{
            productPut,
            productDelete,
            toggleEditModeOnClick,
            isEditMode
        }}>
            {children}
        </ProductListItemContext.Provider>
    )
}