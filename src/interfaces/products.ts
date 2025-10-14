/* eslint-disable @typescript-eslint/no-explicit-any */
export type TProduct = {
    _id?: string;
    name: string;
    image?: any;
    images?: any;
    category: string;
    zoomImg: string;
    subCategory: string;
    description: string;
    price: number;
    quantity: number;
    size: string
    ratings: number;
    status: string;
}