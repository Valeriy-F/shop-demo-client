import Layout from 'components/layout'
import { ProductDetails } from 'features/product'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { useAppStore } from 'store/app-store'

const ProductDetailsPage = () => {
    const { productStore } = useAppStore()
    const routeParams = useParams()

    return (
        <Layout>
            <ProductDetails product={productStore.getProduct(routeParams.name as string)} />
        </Layout>
    )
}

export default observer(ProductDetailsPage)
