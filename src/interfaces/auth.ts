/* eslint-disable @typescript-eslint/no-explicit-any */
export type TAuth = {
    auth: {
        auth: {
            token: string | null;
            user: {
                email: string
                name: string;
                phone: string
                role: string
            } | null
        },
        cart: {
            items: {
                productId: string;
                name: string;
                price: number;
                quantity: number;
            }[]
        }
    }
};

export type TUser = {
    id: string
    email: string
    name: string;
    phone: string
    role: string;
    exp: any;
    ixp: any
}
