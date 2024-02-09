import ErrorPage from './error-page'
import ProductDetailsPage from './product-details-page'
import ProductListPage from './product-list-page'
import { SnackbarProvider } from 'components/ui/notification'
import NavigationContext from 'context/navigation-context'
import { ConfirmProvider } from 'material-ui-confirm'
import { ResponseError } from 'model/error'
import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const PATH_PRODUCTS = 'products'

export function Routing() {
    const navigationProviderValue = useContext(NavigationContext)

    navigationProviderValue.navigationMenuData = [
        {
            href: '/',
            name: 'Main'
        },
        {
            href: `/${PATH_PRODUCTS}`,
            name: 'Products'
        }
    ]

    return (
        <ConfirmProvider>
            <SnackbarProvider>
                <NavigationContext.Provider value={navigationProviderValue}>
                    <Routes>
                        <Route path={`/${PATH_PRODUCTS}/:name`} element={<ProductDetailsPage />} />
                        <Route path={`/${PATH_PRODUCTS}`} element={<ProductListPage />} />
                        <Route path='/' element={<Navigate to={`/${PATH_PRODUCTS}`} />} />
                        <Route path='*' element={<ErrorPage error={ResponseError.create({status: 404, message: 'This page is not found'})} />} />
                    </Routes>
                </NavigationContext.Provider>
            </SnackbarProvider>
        </ConfirmProvider>
    )
}
