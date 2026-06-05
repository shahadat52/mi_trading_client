import React from 'react';
import { DateTime } from '../../../utils/formatDateTime';
import ImagePreviewButton from '../../../components/ImagePreviewButton';



type Invoice = {
    _id: string
    invoice: string;
    product: string;
    sku: string;
    purchaseType: 'regular' | 'due' | 'commission';
    unit: "কেজি" | "পিস" | "মণ" | "বস্তা" | "লিটার" | "বক্স" | "টন";
    supplier: any;
    quantity: number;
    purchaseQty: number;
    bosta: number;
    lot: string;
    labour: number;
    commission: number;
    isCommissionPaid: boolean
    isOthersPaid: boolean
    isLabourPaid: boolean
    others: number;
    othersField: string;
    purchaseDate?: Date;
    purchasePrice: number;
    reorderLevel: number;
    isPaid: boolean;
    isVerified: boolean;
    isDeleted?: boolean;
    paidAmount: number;
    note: string;
    imageurl: string
    createdAt?: Date;
    updatedAt?: Date;
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

    const { invoice, bosta, product, imageurl, commission, lot, note, purchasePrice, purchaseQty, supplier, purchaseDate, unit, othersField, paidAmount, others, labour, } = invoiceData;



    return (
        <div className="max-w-4xl mb-10 mx-auto p-6 bg-white shadow-md rounded-md mt-6">
            {/* Header */}
            <div className="flex justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Invoice #{invoice}</h1>
                    <p className="text-gray-500">Date:{DateTime(purchaseDate)}</p>

                    <div>
                        <ImagePreviewButton
                            imageUrl={imageurl}
                            buttonText="View Bill"
                        />
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-semibold">Customer: {supplier?.name}</p>
                    <p className="font-semibold">Lot: {lot}</p>
                </div>
            </div>

            {/* Items Table */}
            <table className="w-full border border-gray-200 mb-6">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border">Product</th>
                        <th className="px-4 py-2 border">Quantity</th>
                        <th className="px-4 py-2 border">Bosta</th>
                        <th className="px-4 py-2 border">Unit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-50 transition">
                        <td className="px-4 py-2 border">{product}</td>
                        <td className="px-4 py-2 border text-center">{purchaseQty}</td>
                        <td className="px-4 py-2 border text-center">{bosta}</td>
                        <td className="px-4 py-2 border text-center">{unit}</td>
                    </tr>
                </tbody>
            </table>

            {/* Summary */}
            <div className="flex justify-end mb-6 space-y-2 flex-col">
                <div className="flex justify-between w-[75%]">
                    <span>Product Price: </span>
                    <span>{Number(purchasePrice) * Number(purchaseQty)}</span>
                </div>
                <div className="flex justify-between w-[75%]">
                    <span>Commission:</span>
                    <span>{commission}</span>
                </div>
                <div className="flex justify-between w-[75%]">
                    <span>Labour:</span>
                    <span>{labour.toFixed(2)}</span>
                </div>
                <div className="flex justify-between w-[75%]">
                    <span>{othersField?.trim() ? othersField : 'Other'}</span>
                    <span>{others.toFixed(2)}</span>
                </div>

                <div className="flex justify-between w-[75%] font-semibold">
                    <span>Paid Amount:</span>
                    <span>{paidAmount.toFixed(2)}</span>
                </div>
            </div>

            {/* Comments */}
            {note && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md border">
                    <h2 className="font-semibold mb-2">Note</h2>
                    <p>{note}</p>
                </div>
            )}
        </div>
    );
};

export default BepariInvoicePage;