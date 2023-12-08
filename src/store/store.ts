import { baseApi } from './api'
import { productReducer } from '../features/product'
import { configureStore } from '@reduxjs/toolkit'

type TRequestInfo = {
    status: 'empty' | 'loading' | 'completed' | 'failed',
    error?: string | null;
}

type TRootState = ReturnType<typeof store.getState>
type TDispatch = typeof store.dispatch

const store = configureStore({
    reducer: {
        products: productReducer,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware)
})

export default store
export { type TDispatch, type TRequestInfo, type TRootState }
