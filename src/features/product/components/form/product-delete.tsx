import ProductApi from '../../api/product-api';
import { TBaseProduct } from '../../model/product';

type TProductDeleteHandlerBuilderProps = {
    afterProductDeletedHook?: (product: TBaseProduct) => void
}

const buildProductDeleteHandler = (props: TProductDeleteHandlerBuilderProps) => {
    const { afterProductDeletedHook } = props

    return async (product: TBaseProduct) => {

        try {
            await ProductApi.delete(product)

            afterProductDeletedHook && afterProductDeletedHook(product)
        } catch (error) {
            const errorMessage = `Failed to delete product "${product.name}".`

            console.error(errorMessage, error)

            throw new Error(errorMessage)
        }
    }
}

export { buildProductDeleteHandler };
