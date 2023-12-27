import Error from 'components/error'
import Layout from 'components/layout'
import { OverlayLoading } from 'components/ui/loading'
import { ProductDetails, useGetProduct } from 'features/product'
import { ModelResponseError } from 'model/error'
import { useParams } from 'react-router-dom'

const ProductDetailsPage = () => {
    const { name: productName } = useParams()
    const { data: product, status, error } = useGetProduct(productName as string)

    let pageContent = <></>

    switch (status) {
        case 'pending':
            pageContent = <OverlayLoading />

            break;

        case 'success':
            pageContent = <ProductDetails product={product} />

            break;

        case 'error':
            pageContent = <Error error={error as ModelResponseError} />

            break;
    }

    return (
        <Layout>
            {pageContent}
        </Layout>
    )
}

export default ProductDetailsPage

