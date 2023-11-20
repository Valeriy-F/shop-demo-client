type TBaseProduct = {
    name: string,
    displayName: string,
    price: number,
    description?: string;
}

type TProduct = {
    files: TProductFiles
} & TBaseProduct

type TProductFiles = {
    image: string;
};


export {type TBaseProduct, type TProduct, type TProductFiles}
