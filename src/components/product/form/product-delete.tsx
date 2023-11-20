import ProductApi from 'api/product-api';
import { Product } from 'model/product';

type TProductDeleteHandlerBuilderProps = {
    afterProductDeletedHook?: (product: Product) => void
}

const buildProductDeleteHandler = (props: TProductDeleteHandlerBuilderProps) => {
    const { afterProductDeletedHook } = props

    return async (product: Product) => {

        try {
            await ProductApi.delete(product)

            afterProductDeletedHook && afterProductDeletedHook(product)
        } catch (error) {
            console.error(`Failed to delete product "${product.name}".`)
        }
    }
}

export { buildProductDeleteHandler };

