export type TDelivery = {
    _id?: string;
    deliveryBy: { name: string };
    deliveryTime: Date;
    via: string;
    sales: { invoice: string };
    destination: string;
    description: string
}