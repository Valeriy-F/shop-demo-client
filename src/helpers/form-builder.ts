interface IFormDataBuilder<TFormData> {
    build(): TFormData;
}

abstract class AFormDataBuilder<TData, TFormData> implements IFormDataBuilder<TFormData> {
    readonly data: TData;

    constructor(data: TData) {
        this.data = data;
    }

    abstract build(): TFormData
}

export default AFormDataBuilder
export { type IFormDataBuilder }
