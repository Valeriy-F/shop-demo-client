import Client from './client';
import { BaseProduct, Product } from 'model/product';
import { TBaseProduct, TProduct } from 'types/product';

export type TProductGetAllRequest = typeof GetAll
export type TProductGetRequest = typeof Get
export type TProductPostRequest = typeof Post
export type TProductPutRequest = typeof Put
export type TProductPatchImageRequest = typeof PatchImage;
export type TProductDeleteRequest = typeof Delete

const URL = '/products'

const GetAll = async (): Promise<Product[]> => {
    const products = await Client.Get<TProduct[]>(URL);

    return products.map(product => Product.create(product));
}

const Get = async (name: string): Promise<Product> => {
    const product = await Client.Get<TProduct>(`${URL}/${name}`);

    return Product.create(product);
}

const Post = async (product: TBaseProduct): Promise<Product> => {
    if (product instanceof BaseProduct) {
        product = product.toSimpleObject();
    }

    const productResponse = await Client.Post<TBaseProduct, TProduct>(URL, product);

    return Product.create(productResponse);
}

const Put = async (product: TBaseProduct): Promise<Product> => {
    if (product instanceof BaseProduct) {
        product = product.toSimpleObject()
    }

    const productResponse = await Client.Put<TBaseProduct, TProduct>(`${URL}/${product.name}`, product);

    return Product.create(productResponse);
}

const PatchImage = async (product: TProduct, file: File): Promise<Product> => {
    const formData = new FormData();
    formData.append('image', file);

    const productImageURL = await Client.Patch<FormData, string>(`${URL}/${product.name}/image`, formData);

    product.files.image = productImageURL;

    return Product.create(product);
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
