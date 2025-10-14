export type TOrder = {
    _id: string;
    orderId: string;
    customerName: string;
    quantity: number;
    orderProducts: [];
    image: string;
    orderDate: Date;
    status: 'pending' | 'completed' | 'cancelled';
    totalAmount: number;
    phone: string;
    createdAt?: string;
    shippingAddress?:
    {
        district: string
        subDistrict: string
        address: string;

    }

}