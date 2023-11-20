import AFormDataBuilder from 'helpers/form-builder';
import { BaseProduct } from 'model/product';
import { TBaseProduct } from 'types/product';

type TProductFilesType = {
    image?: File | null
}

type TProductFormData = {
    product: TBaseProduct,
    files: TProductFilesType
}

class ProductFormDataBuilder extends AFormDataBuilder<BaseProduct, TProductFormData>{
    build(): TProductFormData {
        return {
            product: this.data,
            files: {
                image: null
            }
        }
    }
}


export {
    type TProductFormData,
    ProductFormDataBuilder
}

