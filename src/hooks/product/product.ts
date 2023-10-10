import IProduct from 'types/product'
import ProductApi from 'api/product-api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function useProductList() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [error, setError] = useState<Error>()
    

    const addProduct = (product: IProduct) => {
        setProducts(prevState => [...prevState, product])
    }

    const updateProduct = (product: IProduct) => {
        setProducts(prevState => prevState.map(currentPropduct => (currentPropduct.name === product.name) ? product : currentPropduct))
    }

    const deleteProduct = (product: IProduct) => {
        setProducts(prevState => prevState.filter(currentProduct => (currentProduct.name !== product.name)))
    }

    useEffect(() => {
        ProductApi.getAll()
            .then(products => setProducts(products))
            .catch(error => {
                console.error('Failed to fetch products for product list.', error)
                setError(error)
            })
    }, [])

    return {
        products,
        fetchProductsError: error,
        addProduct,
        updateProduct,
        deleteProduct
    }
}

export function useProductDetails() {
    const params = useParams()
    const [product, setProduct] = useState<IProduct | null>(null)
    const [error, setError] = useState<Error>()

    useEffect(() => {
        ProductApi.get(params.name as string)
            .then(product => setProduct(product))
            .catch(error => {
                console.error('Failed to fetch product.', error)
                setError(error)
            })
    }, [params.name])

    return {
        product,
        fetchProductError: error
    }
}
