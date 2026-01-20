/* eslint-disable @typescript-eslint/no-explicit-any */
export type TBepariCoutha = {
    supplier: any;
    lot: any;
    import: string;
    importDate: Date;
    description: string;
    invoice: string;
    truck_rent: number
    transport_rent: number;
    kuli: number;
    brokary: number;
    arot: number;
    haolat: number;
    godi: number;
    tohori: number;
    subTotal: number,
    discount: number,
    broker: string
    joma: number;
    grandTotal: number;
    isPaid: boolean;
    paymentMethod: string
    createdAt: Date
}