import Client, { THttpRequest } from './client'
import IProduct from 'types/product'

export type TProductGetAllRequest = THttpRequest<undefined, IProduct[]>
export type TProductGetRequest = THttpRequest<string, IProduct>
export type TProductPostRequest = THttpRequest<IProduct, IProduct>
export type TProductPutRequest = THttpRequest<IProduct, IProduct>
export type TProductDeleteRequest = THttpRequest<IProduct, void>

const URL = '/products'

const GetAll = async (): Promise<IProduct[]> => {
    return await Client.Get<IProduct[]>(URL)
}

const Get = async (name: string): Promise<IProduct> => {
    return await Client.Get<IProduct>(`${URL}/${name}`)
}

const Post = async (product: IProduct): Promise<IProduct> => {
    return await Client.Post<IProduct>(URL, product)
}

const Put = async (product: IProduct): Promise<IProduct> => {
    return await Client.Put<IProduct>(`${URL}/${product.name}`, product)
}

const Delete = async (product: IProduct) => {
    await Client.Delete(`${URL}/${product.name}`)
}

const ProductApi = {
    getAll: GetAll,
    get: Get,
    post: Post,
    put: Put,
    delete: Delete
}

export default ProductApi