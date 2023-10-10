import ProductDetailsPage from './product-details-page'
import ProductListPage from './product-list-page'
import { Navigate, Route, Routes } from 'react-router-dom'
import { TNavLinkData } from '../components/ui/navigation'

const PATH_PRODUCTS = 'products'

export const navLinksData: TNavLinkData[] = [
    {
        id: 'nav-link-1',
        path: '/',
        name: 'Main'
    },
    {
        id: 'nav-link-2',
        path: `/${PATH_PRODUCTS}`,
        name: 'Products'
    }
]

export function Routing() {
    return (
        <Routes>
            <Route path={`/${PATH_PRODUCTS}/:name`} element={<ProductDetailsPage />} />
            <Route path={`/${PATH_PRODUCTS}`} element={<ProductListPage />} />
            <Route path='/' element={<Navigate to={`/${PATH_PRODUCTS}`} />} />
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
    )
}