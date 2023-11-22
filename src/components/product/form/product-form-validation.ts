import * as yup from 'yup';
import { TProductFormData } from './product-form';

const yupValidationSchema: yup.ObjectSchema<TProductFormData> = yup
    .object({
        files: yup.object({
            image: yup.mixed<File>().nullable().defined()
        }).required(),
        product: yup.object({
            name: yup.string().trim().required(),
            displayName: yup.string().trim().required(),
            price: yup.number().positive().required(),
            image: yup.mixed<File | string>(),
            description: yup.string()
        })
            .required()
    }).required();

export { yupValidationSchema };
