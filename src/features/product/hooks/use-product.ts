import ProductApi from '../api/product-api';
import { TProductFormData } from '../components/form/product-form';
import { Product, TBaseProduct, TProduct } from '../model/product';

type TUseProductAddProps = {
    afterProductCreatedHook?: (product: TProduct) => void;
    afterImageFileUploadedHook?: (product: TProduct) => void;
}

type TUseProductEditProps = {
    afterProductUpdatedHook?: (product: TProduct) => void;
    afterImageFileUploadedHook?: (product: TProduct) => void;
    afterAllDataUpdatedHook?: (product: TProduct) => void;
}

type TUseProductDeleteProps = {
    afterProductDeletedHook?: (product: TBaseProduct) => void;
}

const useProductsFetch = () => {
    return async () => {
        try {
            return await ProductApi.getAll();
        } catch (error) {
            const errorMessage = `Fialed to fetch product list.`;

            console.error(errorMessage, error);

            throw new Error(errorMessage);
        }
    }
}

const useProductFetch = () => {
    return async (productName: string) => {
        try {
            return await ProductApi.get(productName);
        } catch (error) {
            const errorMessage = `'Failed to fetch product "${productName}".'`;

            console.error(errorMessage, error);

            throw new Error(errorMessage);
        }
    };
}

const useProductAdd = ({ afterProductCreatedHook, afterImageFileUploadedHook }: TUseProductAddProps) => {
    return async ({ product, files }: TProductFormData) => {
        const imageFile = files.image;

        let productResponse: TProduct;

        try {
            productResponse = await ProductApi.post(product);

            afterProductCreatedHook && afterProductCreatedHook(productResponse);
        } catch (error) {
            const errorMessage = `Fialed to create new product "${product.name}".`;

            console.error(errorMessage, error);

            throw new Error(errorMessage);
        }

        if (imageFile) {
            try {
                productResponse = await ProductApi.patchImage(productResponse, imageFile);

                afterImageFileUploadedHook && afterImageFileUploadedHook(productResponse);
            } catch (error) {
                const errorMessage = `Failed to upload image file "${imageFile}" for product "${product.name}".`;

                console.error(errorMessage, error);

                throw new Error(errorMessage);
            }
        }
    };
};

const useProductEdit = ({ afterAllDataUpdatedHook, afterImageFileUploadedHook, afterProductUpdatedHook }: TUseProductEditProps) => {
    return async ({ product, files }: TProductFormData) => {
        const imageFile = files.image;

        if (!Product.isTypeOf(product)) {
            product = Product.create(product);
        }

        const requests = [
            ProductApi.put(product)
                .then(productResponse => {
                    afterProductUpdatedHook && afterProductUpdatedHook(productResponse);
                })
                .catch(error => {
                    const errorMessage = `Failed to update product "${product.name}".`;

                    console.error(errorMessage, error);

                    throw new Error(errorMessage);
                })
        ];

        if (imageFile) {
            const patchImageRequest = ProductApi.patchImage(product as TProduct, imageFile)
                .then(productResponse => {
                    afterImageFileUploadedHook && afterImageFileUploadedHook(productResponse);
                })
                .catch(error => {
                    const errorMessage = `Failed to upload image file "${imageFile.name}" for product "${product.name}".`;

                    console.error(errorMessage, error);

                    throw new Error(errorMessage);
                });

            requests.push(patchImageRequest);
        }

        return Promise.all(requests).then(responses => {
            afterAllDataUpdatedHook && afterAllDataUpdatedHook(product as TProduct);

            return responses;
        });
    };
};

const useProductDelete = ({ afterProductDeletedHook }: TUseProductDeleteProps) => {
    return async (product: TBaseProduct) => {

        try {
            await ProductApi.delete(product);

            afterProductDeletedHook && afterProductDeletedHook(product);
        } catch (error) {
            const errorMessage = `Failed to delete product "${product.name}".`;

            console.error(errorMessage, error);

            throw new Error(errorMessage);
        }
    };
};

const useProduct = () => ({
    useProductAdd,
    useProductDelete,
    useProductEdit,
    useProductFetch,
    useProductsFetch,
})

export default useProduct

export {
    useProductAdd,
    useProductDelete,
    useProductEdit,
    useProductFetch,
    useProductsFetch
};
