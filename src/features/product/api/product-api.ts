import { BaseProduct, TBaseProduct, TProduct } from '../model/product';
import Client from 'api/client';

const URL = '/products'

const GetAll = async (): Promise<TProduct[]> => {
    return await Client.Get<TProduct[]>(URL);
}

const Get = async (name: string): Promise<TProduct> => {
    return await Client.Get<TProduct>(`${URL}/${name}`);
}

const Post = async (product: TBaseProduct): Promise<TProduct> => {
    return await Client.Post<TBaseProduct, TProduct>(URL, BaseProduct.create(product));
}

const Put = async (product: TBaseProduct): Promise<TProduct> => {
    return await Client.Put<TBaseProduct, TProduct>(`${URL}/${product.name}`, BaseProduct.create(product));
}

const PatchImage = async (product: TProduct, file: File): Promise<TProduct> => {
    const formData = new FormData();
    formData.append('image', file);

    const productImageURL = await Client.Patch<FormData, string>(`${URL}/${product.name}/image`, formData);

    product.files.image = productImageURL;

    return product;
}

const Delete = async (product: TBaseProduct) => {
    await Client.Delete(`${URL}/${product.name}`)
}

const ProductApi = {
    getAll: GetAll,
    get: Get,
    post: Post,
    put: Put,
    patchImage: PatchImage,
    delete: Delete
}

export default ProductApi
