import IProduct from 'types/product'
import {
    createContext,
    MouseEvent,
    ReactNode,
    useState
    } from 'react'
import { TProductPostRequest } from 'api/product-api'
import { useProductList } from 'hooks/product/product'
import { useProductPost } from 'hooks/product/product-api'

type TProductListContext = {
    products: IProduct[],
    isAddMode: boolean,
    createProduct: TProductPostRequest,
    updateProductInList: (product: IProduct) => void,
    removeProductFromList: (product: IProduct) => void,
    enableAddNewProductMode: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void,
    disableAddNewProductMode: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void,
    fetchProductsError?: Error
}

type TProductListProviderProps = {
    children: ReactNode
}

export const ProductListContext = createContext<TProductListContext>({
    products: [],
    isAddMode: false,
    createProduct: async product => product,
    updateProductInList: (product) => { },
    removeProductFromList: (product) => { },
    enableAddNewProductMode: (event) => { },
    disableAddNewProductMode: (event) => { }
})

export function ProductListProvider({ children }: TProductListProviderProps) {
    const [isAddMode, setIsAddMode] = useState(false)

    const {
        products,
        fetchProductsError,
        addProduct,
        updateProduct,
        deleteProduct,
    } = useProductList()

    
    const { productPost } = useProductPost({
        onSuccess: product => {
            addProduct(product)
            setIsAddMode(false)
        }
    })

    const enableAddNewProductMode = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        event.preventDefault()

        setIsAddMode(true)
    }

    const disableAddNewProductMode = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        event.preventDefault()

        setIsAddMode(false)
    }

    return (
        <ProductListContext.Provider value={{
            products,
            isAddMode,
            fetchProductsError,
            createProduct: productPost,
            updateProductInList: updateProduct,
            removeProductFromList: deleteProduct,
            enableAddNewProductMode,
            disableAddNewProductMode
        }}>
            {children}
        </ProductListContext.Provider>
    )
}

