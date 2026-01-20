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


export type TAddProduct = {
    _id: string;
    id: string;
    supplier: string;
    product: string;
    purchaseDate?: string;
    name: string;
    sku?: string;
    category?: string;
    lot: string;
    purchasePrice: number;
    stockQty?: number;
    reorderLevel?: number;
    isPaid?: boolean;
    note?: string;
    image?: any;
    createdAt: string;
    updatedAt: string;
};

export interface TPurchase {
    product: string; // Product name
    purchaseType: "normal" | "due" | "commission";
    supplier: string; // Supplier name
    commissionPerUnit?: number;
    totalCommission?: number;
    dueAmount?: number;
    quantity: number;
    lot: string
    purchaseDate?: Date | undefined;
    invoice: string;
    purchasePrice: number;
    reorderLevel: number;
    isPaid: boolean;
    note: string;
    createdAt?: Date;
    updatedAt?: Date;
};