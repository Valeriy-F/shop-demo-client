import { TProduct } from '../model/product'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TRequestInfo, TRootState } from 'store/store'

type TProductsState = {
    value: {
        products: TProduct[],
        productForEdit: TProduct | null,
        isAddMode: boolean
    }
} & TRequestInfo

const initialState: TProductsState = {
    value: {
        products: [],
        productForEdit: null,
        isAddMode: false
    },
    status: 'empty',
    error: null
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductForEdit: (state, action: PayloadAction<TProduct | null>) => { state.value.productForEdit = action.payload },
        enableAddMode: state => { state.value.isAddMode = true },
        disableAddMode: state => { state.value.isAddMode = false }
    }
})

const selectProductForEdit = (state: TRootState) => state.products.value.productForEdit
const selectIsAddMode = (state: TRootState) => state.products.value.isAddMode

export default productsSlice.reducer

export const {
    setProductForEdit,
    enableAddMode,
    disableAddMode
} = productsSlice.actions

export {
    selectIsAddMode,
    selectProductForEdit,
}
