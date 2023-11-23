import { ProductApi, TBaseProduct, TProduct } from 'features/product'
import {
    baseApi,
    providesTagsList,
    responseHandler,
    transformErrorResponse,
    transformResponse
    } from 'store/api'

const TAG_PRODUCT = 'Product'

const productApi = baseApi
    .enhanceEndpoints({
        addTagTypes: [TAG_PRODUCT]
    })
    .injectEndpoints({
        overrideExisting: true,
        endpoints: (builder) => ({
            getProducts: builder.query<TProduct[], any>({
                query: () => ({
                    url: ProductApi.URL,
                    responseHandler
                }),
                transformResponse: transformResponse<TProduct[]>,
                transformErrorResponse: transformErrorResponse<TProduct[]>,
                providesTags: products => providesTagsList<TProduct[], typeof TAG_PRODUCT>(products, TAG_PRODUCT)
            }),
            getProduct: builder.query<TProduct, string>({
                query: productName => ({
                    url: ProductApi.URL + '/' + productName,
                    responseHandler
                }),
                transformResponse: transformResponse<TProduct>,
                transformErrorResponse: transformErrorResponse<TProduct>,
                providesTags: (product, error, arg) => [{ type: TAG_PRODUCT, name: arg }]
            }),
            addProduct: builder.mutation<TProduct, TBaseProduct>({
                query: product => ({
                    url: ProductApi.URL,
                    method: 'POST',
                    body: product,
                    responseHandler
                }),
                transformResponse: transformResponse<TProduct>,
                transformErrorResponse: transformErrorResponse<TProduct>,
                invalidatesTags: (product, error, arg) => {
                    return error ? [] : [{ type: TAG_PRODUCT, name: arg.name }]
                }
            }),
            editProduct: builder.mutation<TProduct, TBaseProduct>({
                query: product => ({
                    url: ProductApi.URL + '/' + product.name,
                    method: 'PUT',
                    body: product,
                    responseHandler
                }),
                transformResponse: transformResponse<TProduct>,
                transformErrorResponse: transformErrorResponse<TProduct>,
                invalidatesTags: (product, error, arg) => {
                    return error ? [] : [{ type: TAG_PRODUCT, name: arg.name }]
                }
            }),
            deleteProduct: builder.mutation<void, TBaseProduct>({
                query: product => ({
                    url: ProductApi.URL + '/' + product.name,
                    method: 'DELETE',
                    responseHandler
                }),
                transformErrorResponse: transformErrorResponse<TProduct>,
                invalidatesTags: (product, error, arg) => {
                    return error ? [] : [{ type: TAG_PRODUCT, name: arg.name }]
                }
            }),
            uploadImageFile: builder.mutation({
                query: ({ product, file }) => {
                    const formData = new FormData()
                    formData.append('image', file)

                    return {
                        url: `${ProductApi.URL}/${product.name}/image`,
                        method: 'PATCH',
                        body: formData,
                        responseHandler
                    }
                },
                transformResponse: transformResponse<TProduct>,
                transformErrorResponse: transformErrorResponse<TProduct>,
                invalidatesTags: (product, error, arg) => {
                    return error ? [] : [{ type: TAG_PRODUCT, name: arg.product.name }]
                }
            })
        })
    })

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
    useEditProductMutation,
    useDeleteProductMutation,
    useUploadImageFileMutation
} = productApi
