import IProduct from 'types/product'
import { createContext, ReactNode } from 'react'
import { useProductDetails } from 'hooks/product/product'

type TProductContext = {
    product: IProduct | null,
    fetchProductError?: Error
}

type TProductProviderProps = {
    children: ReactNode
}

export const ProductContext = createContext<TProductContext>({
    product: null
})

export function ProductProvider({ children }: TProductProviderProps) {
    const { product, fetchProductError } = useProductDetails()

    return (
        <ProductContext.Provider value={{
            product,
            fetchProductError
        }}>
            {children}
        </ProductContext.Provider>
    )
}