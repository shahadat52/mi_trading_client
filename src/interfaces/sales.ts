
export type TSalesProducts = {
    _id: string;
    name: string;
    product: string;
    stockQty: number;
    salesPrice: number;
    purchasePrice: number;
    total: number
};


export type TSaleItem = {
    product: string;
    quantity: number;
    salePrice: number;
    totalPrice: number;
    purchasePrice?: number;
    profit?: number;
};

export type TSales = {
    customer: string
    invoice: string;
    date: Date;
    items: TSaleItem[];
    broker: string;
    subtotal: number;
    discount: number;
    vat: number;
    grandTotal: number;
    grandProfit: number;
    paidAmount: number;
    dueAmount: number;
    paymentMethod: string;
    supplier?: string; // Commission-based seller
    commissionRef?: string;
    salesType: "regular" | "commission" | "due";
    createdBy: string;
    status: "unpaid" | "partial" | "paid";
    isDelivered: boolean;
    isDeleted: boolean;
}