type TBaseProduct = {
    name: string,
    displayName: string,
    price: number,
    description: string | null | undefined
}

type TProduct = TBaseProduct & {
    files: TProductFiles
}

type TProductFiles = {
    image: string
}

type TProductHandler = (product: TBaseProduct) => Promise<void> | void

const isTypeOfProductFiles = (object: any): object is TProductFiles => {
    return ('image' in object)
}

const isTypeOfBaseProduct = (object: object, strict = false): object is TBaseProduct => {
    let isBaseProduct = ('name' in object)
        && ('displayName' in object)
        && ('price' in object)
        && ('description' in object)

    if (strict) {
        isBaseProduct = isBaseProduct && Object.keys.length === 4
    }

    return isBaseProduct
}

const isTypeOfProduct = (object: object, strict = false): object is TProduct => {
    let isTypeOfProduct = isTypeOfBaseProduct(object)
        && ('files' in object)
        && isTypeOfProductFiles(object.files)

    if (strict) {
        isTypeOfProduct = isTypeOfProduct && Object.keys.length === 5
    }

    return isTypeOfProduct
}

const applyProduct = <T extends TBaseProduct>(targetProduct: T, sourceProduct: T) => {
    targetProduct.name = sourceProduct.name
    targetProduct.displayName = sourceProduct.displayName
    targetProduct.price = sourceProduct.price
    targetProduct.description = sourceProduct.description

    if (isTypeOfProduct(targetProduct) && isTypeOfProduct(sourceProduct)) {
        targetProduct.files = sourceProduct.files
    }
}

const createBaseProduct = (sourceProduct?: TBaseProduct): TBaseProduct => {
    const product = {
        name: '',
        displayName: '',
        price: 0,
        description: ''
    }

    if (sourceProduct) {
        applyProduct(product, sourceProduct)
    }

    return product
}

const createProduct = (sourceProduct?: TBaseProduct): TProduct => {
    const product = {
        ...createBaseProduct(),
        files: {
            image: ''
        }
    }

    if (sourceProduct) {
        applyProduct(product, sourceProduct)
    }

    return product
}

const BaseProduct = {
    create: createBaseProduct,
    isTypeOfBaseProduct
}

const Product = {
    create: createProduct,
    isTypeOfProduct
}

export {
    type TBaseProduct,
    type TProduct,
    type TProductFiles,
    type TProductHandler,
    BaseProduct,
    Product
}
