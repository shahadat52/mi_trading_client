import React from 'react';
import { format } from 'date-fns';



type Invoice = {
    supplier: any;
    lot: any;
    couthaOf: any;
    import: string;
    importDate: Date;
    description: string;
    invoice: string;
    transport_rent?: number;
    kuli: number;
    brokary: number;
    arot?: number;
    haolat?: number;
    godi?: number;
    tohori?: number;
    subTotal: number,
    discount: number,
    broker: string
    joma: number;
    grandTotal: number;
    isPaid: boolean;
    isTransfared: boolean;
    createdBy: any
    paymentMethod: string
};

type Props = {
    invoiceData?: Invoice;
    loading?: boolean;
};

const BepariInvoicePage: React.FC<Props> = ({ invoiceData, loading = false }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">Loading...</p>
            </div>
        );
    }

    if (!invoiceData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">No invoice data found.</p>
            </div>
        );
    }

    const { invoice, lot, supplier, importDate, import: productDetails, grandTotal, joma, kuli, subTotal, createdBy, arot, godi, tohori, transport_rent }: Invoice = invoiceData;



    return (
        <div className="max-w-4xl mx-auto p-6 mb-6 bg-white shadow-md rounded-md mt-6">
            {/* Header */}
            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Invoice #{invoice}</h1>
                    <p className="text-gray-500">Date:{format(importDate, 'dd/MM/yyyy')}</p>

                </div>
                <div className="text-right">
                    <p className="font-semibold">Supplier/Bepari: {supplier?.name}</p>
                    <p className="font-semibold">Lot: {lot}</p>
                </div>
            </div>

            {/* Summary */}
            <div className="flex justify-end mb-6 space-y-2 flex-col">
                <div className="flex justify-between w-[75%]">
                    <span>পন্যের বিবরন: </span>
                    <span>{productDetails}</span>
                </div>



                <div className="flex justify-between w-[75%]">
                    <span>লেবার</span>
                    <span>{kuli}</span>
                </div>
                <div className="flex justify-between w-[75%]">
                    <span>আড়তদারী</span>
                    <span>{arot}</span>
                </div>
                <div className="flex justify-between w-[75%]">
                    <span>পরিবহন ভাড়া</span>
                    <span>{transport_rent}</span>
                </div>
                <div className="flex justify-between w-[75%]">
                    <span>গদি</span>
                    <span>{godi}</span>
                </div>
                <div className="flex justify-between w-[75%]">
                    <span>তহরী</span>
                    <span>{tohori}</span>
                </div>
                <hr />
                <div className="flex justify-between w-[75%]">
                    <span>Sub Total</span>
                    <span>{subTotal?.toFixed(2)}</span>
                </div>

                <div className="flex text-red-600 justify-between w-[75%]">
                    <span>Joma:</span>
                    <span>{joma?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between w-[75%]">
                    <span>Grand Total:</span>
                    <span>{grandTotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between w-[75%]">
                    <span>চৌথাকারী</span>
                    <span>{createdBy?.name}</span>
                </div>
            </div>
        </div>
    );
};

export default BepariInvoicePage;