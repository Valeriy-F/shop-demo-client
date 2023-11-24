import Layout from 'components/layout';
import { ProductDetails, TProduct, useProductFetch } from 'features/product';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetailsPage() {
    const routeParams = useParams()
    const [product, setProduct] = useState<TProduct | null>(null)
    const [fetchProductError, setFfetchProductError] = useState<Error>()
    const fetchProduct = useProductFetch()

    useEffect(() => {
        fetchProduct(routeParams.name as string)
            .then(setProduct)
            .catch(setFfetchProductError)
    }, [routeParams.name])

    return (
        <Layout>
            <ProductDetails product={product} fetchProductError={fetchProductError} />
        </Layout>
    )
}
