import { ProductStore, TProductSore } from 'features/product/store/product-store'
import { createContext, PropsWithChildren, useContext } from 'react'

type TAppStore = {
    productStore: TProductSore
}

type TAppStoreProviderProps = PropsWithChildren

const AppStoreContext = createContext<TAppStore | null>(null)

const AppStoreProvider = ({ children }: TAppStoreProviderProps) => {
    const appStore = {
        productStore: ProductStore()
    }

    return (
        <AppStoreContext.Provider value={ appStore } >
            { children }
        </AppStoreContext.Provider>
    )
}

const useAppStore = (): TAppStore => {
    const appStore = useContext(AppStoreContext)

    if (!appStore) {
        throw new Error('App store is not found. Check you call it inside AppStoreProvider')
    }

    return appStore
}

export { AppStoreProvider, useAppStore }
