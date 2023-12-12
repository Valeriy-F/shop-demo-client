import createProductStore from 'features/product/store/productStore'
import { observer } from 'mobx-react-lite'
import { createContext, ReactNode, useContext } from 'react'

type TAppStore = typeof appStore

type TAppStoreProviderProps = {
    children: ReactNode | ReactNode[]
}

const appStore = {
    productStore: createProductStore()
}

const AppStoreContext = createContext<TAppStore>(appStore)

const AppStoreProvider = observer(({ children }: TAppStoreProviderProps) => {
    return (
        <AppStoreContext.Provider value= { appStore } >
            { children }
        </AppStoreContext.Provider>
    )
})

const useAppStore = () => useContext(AppStoreContext)

export { AppStoreProvider, useAppStore }
