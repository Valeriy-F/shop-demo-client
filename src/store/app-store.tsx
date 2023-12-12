import {
    createProductStore,
    createProductStoreEnv,
    ProductStore,
    TProductStoreEnv
    } from 'features/product/store/product-store'
import {
    castToSnapshot,
    getEnv,
    Instance,
    types
    } from 'mobx-state-tree'
import { createContext, PropsWithChildren, useContext } from 'react'

type TAppStore = Instance<typeof AppStore>

type TAppStoreEnv = {
    productStoreEnv: TProductStoreEnv
}

type TAppStoreProviderProps = PropsWithChildren

const AppStore = types
    .model('AppStore', {
        productStore: ProductStore
    })
    .views(self => ({
        get productStoreEnv(): TProductStoreEnv {
            return getEnv(self).productStoreEnv
        }
    }))
    .actions(self => {
        return {
            afterCreate() {
                self.productStore.loadProducts()
            }
        }
    })

const appStore = AppStore.create(
        {
            productStore: castToSnapshot(createProductStore())
        },
        {
            productStoreEnv: createProductStoreEnv()
        }
    )

const AppStoreContext = createContext<TAppStore>(appStore)

const AppStoreProvider = ({ children }: TAppStoreProviderProps) => {
    return (
        <AppStoreContext.Provider value= { appStore } >
            { children }
        </AppStoreContext.Provider>
    )
}

const useAppStore = () => useContext(AppStoreContext)

export {
    type TAppStore,
    type TAppStoreEnv,
    AppStoreProvider,
    useAppStore
}
