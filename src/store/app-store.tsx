import { ProductStore, TProductSore } from 'features/product/store/product-store'
import { ModelResponseError } from 'model/error'
import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect
} from 'react'

type TAppStore = {
    productStore: TProductSore
}

type TAppStoreProviderProps = PropsWithChildren

type TLoadingInfo = {
    state: ELoadingState,
    error: ModelResponseError | null
}

enum ELoadingState {
    Pending,
    Success,
    Error
}

const AppStoreContext = createContext<TAppStore | null>(null)

const AppStoreProvider = ({ children }: TAppStoreProviderProps) => {
    const appStore = {
        productStore: ProductStore()
    }

    useEffect(() => {
        appStore.productStore.loadProducts()
    }, [])

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

export {
    AppStoreProvider, ELoadingState, useAppStore, type TLoadingInfo
}

