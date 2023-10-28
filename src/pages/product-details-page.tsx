import Layout from 'components/layout';
import ProductDetails from 'components/product/product-details';
import { ProductProvider } from 'context/product/product';

export default function ProductDetailsPage() {
    return (
        <ProductProvider>
            <Layout>
                <ProductDetails />
            </Layout>
        </ProductProvider>
    )
}
