import Error from 'components/error'
import Layout from 'components/layout'
import { OverlayLoading } from 'components/ui/loading'
import { ProductDetails, useGetProductQuery } from 'features/product'
import { ResponseError } from 'model/error'
import { useParams } from 'react-router-dom'

const ProductDetailsPage = () => {
    const { name } = useParams()
    const {
        data: product,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProductQuery(name as string)

    let pageContent;

    if (isLoading) {
        pageContent = <OverlayLoading />;
    } else if (isSuccess) {
        pageContent = <ProductDetails product={product} />
    } else if (isError) {
        pageContent = <Error error={ResponseError.create(error)} />
    }

    return (
        <Layout>
            {pageContent}
        </Layout>
    )
}

export default ProductDetailsPage

