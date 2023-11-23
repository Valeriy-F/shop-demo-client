export { default as ProductApi } from './api/product-api'
export { default as ProductDetails } from './components/product-details'
export { default as ProductList } from './components/product-list'
export { default as useProduct } from './hooks/use-product'
export { type TBaseProduct, type TProduct } from './model/product'
export {
    useAddProductMutation,
    useDeleteProductMutation,
    useEditProductMutation,
    useGetProductQuery,
    useGetProductsQuery,
    useUploadImageFileMutation
} from './store/product-api-slice'
export {
    enableAddMode, default as productReducer
} from './store/products-slice'
