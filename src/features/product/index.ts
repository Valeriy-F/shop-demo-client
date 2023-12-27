export { default as ProductDetails } from './components/product-details';
export { default as ProductList } from './components/product-list';
export { type TBaseProduct, type TProduct } from './model/product';
export { ProductAddButton } from './components/ui/product-add-button'
export {
    useDeleteProductHandler,
    useGetProduct,
    useGetProducts,
    usePatchProductImageFileHandler,
    usePostProductHandler,
    usePutProductHandler
} from './hooks/use-product-api'
