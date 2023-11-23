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
    protected name: string = '';
    protected displayName: string = '';
    protected price: number = 0;
    protected description?: string;

    static create(): TBaseProduct;
    static create(object: TBaseProduct): TBaseProduct;
    static create(object?: TBaseProduct): TBaseProduct {
        const newInstance = new BaseProduct();

        if (object) {
            newInstance.apply(object);
        }

        return newInstance.toSimpleObject();
    }

    static isTypeOf(object: any): object is TBaseProduct {
        return ('name' in object)
            && ('displayName' in object)
            && ('price' in object);
    }

    protected apply(object: TBaseProduct) {
        this.name = object.name;
        this.displayName = object.displayName;
        this.price = object.price;
        this.description = object.description;
    }

    protected toSimpleObject(): TBaseProduct {
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

    static create(): TProduct;
    static create(object: TBaseProduct): TProduct;
    static create(object?: TBaseProduct): TProduct {
        const newInstance = new Product();

        if (object) {
            newInstance.apply(object);
        }

        return newInstance.toSimpleObject();
    }

    static isTypeOf(object: any): object is TProduct {
        return BaseProduct.isTypeOf(object)
            && ('files' in object)
    }

    apply(object: TBaseProduct) {
        super.apply(object)

        if (Product.isTypeOf(object)) {
            this.files.apply(object.files)
        }
    }

    protected toSimpleObject(): TProduct {
        return {
            ...super.toSimpleObject(),
            files: this.files.toSimpleObject()
        };
    }
}

class ProductFiles {
    private image: string = '';

    static isTypeOf(object: any): object is TProductFiles {
        return ('image' in object);
    }

    static create(): TProductFiles;
    static create(object: TProductFiles): TProductFiles;
    static create(object?: TProductFiles): TProductFiles {
        const newInstance = new ProductFiles();

        if (object) {
            newInstance.apply(object);
        }

        return newInstance.toSimpleObject();
    }

    apply(object: TProductFiles) {
        this.image = object.image;
    }

    toSimpleObject(): TProductFiles {
        return {
            image: this.image
        }
    }
};

export {
    type TBaseProduct,
    type TProduct,
    type TProductFiles,
    BaseProduct,
    Product
};
