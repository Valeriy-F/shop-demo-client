import Layout from 'components/layout';
import ProductList from 'components/product/product-list';
import { ProductListProvider } from 'context/product/product-list';

export default function ProductListPage() {
    return (
        <ProductListProvider>
            <Layout>
                <ProductList />
            </Layout>
        </ProductListProvider>
    )
}
