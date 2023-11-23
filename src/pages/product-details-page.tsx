import Layout from 'components/layout';
import { Product, ProductApi, ProductDetails } from 'features/product';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetailsPage() {
    const routeParams = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [fetchProductError, setFfetchProductError] = useState<Error>()

    useEffect(() => {
        ProductApi.get(routeParams.name as string)
            .then(product => setProduct(product))
            .catch(error => {
                console.error('Failed to fetch product.', error)
                setFfetchProductError(error)
            })
    }, [routeParams.name])

    return (
        <Layout>
            <ProductDetails product={product} fetchProductError={fetchProductError} />
        </Layout>
    )
}
