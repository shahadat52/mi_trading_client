export type TDelivery = {
    _id?: string;
    deliveryBy: string;
    deliveryTime: Date;
    via: string;
    sales: {
        customer: any,
        invoice: string
    };
    destination: string;
    description: string;
    createdAt: Date
    updatedAt: Date
}