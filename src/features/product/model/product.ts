type TBaseProduct = {
    name: string,
    displayName: string,
    price: number,
    description?: string;
};

type TProduct = {
    files: TProductFiles;
} & TBaseProduct;

type TProductFiles = {
    image: string;
};

class BaseProduct {
    name: string = '';
    displayName: string = '';
    price: number = 0;
    description?: string;

    static isTypeOf(object: any ): object is TBaseProduct  {
        return ('name' in object)
            && ('displayName' in object)
            && ('price' in object)
    }

    apply(object: TBaseProduct) {
        this.name = object.name;
        this.displayName = object.displayName;
        this.price = object.price;
        this.description = object.description;
    }

    toSimpleObject() {
        return {
            name: this.name,
            displayName: this.displayName,
            price: this.price,
            description: this.description
        }
    }
};

class Product extends BaseProduct {
    files: ProductFiles = new ProductFiles();

    static create(): Product;
    static create(object: TBaseProduct): Product;
    static create(object?: TBaseProduct): Product {
        const newInstance = new Product();

        if (!object) {
            return newInstance;
        }

        newInstance.apply(object);

        return newInstance;
    }

    static isTypeOf(object: any): object is TProduct {
        return BaseProduct.isTypeOf(object)
            && ('files' in object)
    }

    apply(object: TBaseProduct) {
        super.apply(object)

        if (object instanceof Product || Product.isTypeOf(object)) {
            this.files.image = object.files.image;
        }
    }

    toSimpleObject() {
        return super.toSimpleObject()
    }
}

class ProductFiles {
    image: string = '';

    static isTypeOf(object: any): object is TProductFiles {
        return ('image' in object);
    }
};

export {
    type TBaseProduct,
    type TProduct,
    type TProductFiles,
    BaseProduct,
    Product
};
