import React from 'react';
import { DateTime } from '../../../utils/formatDateTime';

type Item = {
    name: string;
    product: string;
    quantity: number;
    supplyQty: number;
    supplyBosta: number;
    bosta: number;
    unit: string;
    [key: string]: any;
};

type Invoice = {
    broker: string;
    comments: string;
    createdAt: string;
    createdBy: string;
    customer: { name: string, phone: string };
    customerCommission: number;
    date: string;
    grandTotal: number;
    invoice: string;
    isDeleted: boolean;
    isDelivered: boolean;
    isVerified: boolean;
    items: Item[];
    labour: number;
    others: number;
    paidAmount: number;
    paymentMethod: string;
    status: string;
    subtotal: number;
};

type Props = {
    invoiceData?: Invoice;
    loading?: boolean;
};

const CustomerInvoicePage: React.FC<Props> = ({ invoiceData, loading = false }) => {
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

    const {
        invoice,
        date,
        customer,
        items,
        subtotal,
        labour,
        others,
        grandTotal,
        paidAmount,
        paymentMethod,
        status,
        comments,
        broker,
        customerCommission,
    } = invoiceData;

    const perProductsCommission = items?.reduce((initialValue, item) => initialValue + item?.commission, 0)
    const totalCommission = (Number(perProductsCommission) || 0) + (Number(customerCommission) || 0)

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-6 mb-6">
            {/* Header */}
            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Invoice #{invoice}</h1>
                    <p className="text-gray-500">Date:{DateTime(date)}</p>
                </div>
                <div className="text-right">
                    <p className="font-semibold">Customer: {customer.name}</p>
                    <p className="text-gray-500">Broker: {broker || 'N/A'}</p>
                </div>
            </div>

            {/* Items Table */}
            <table className="w-full border border-gray-200 mb-6">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border">#</th>
                        <th className="px-4 py-2 border">Item</th>
                        <th className="px-4 py-2 border">Quantity</th>
                        <th className="px-4 py-2 border">Bosta</th>
                        <th className="px-4 py-2 border">Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-4 text-gray-500">
                                No items added.
                            </td>
                        </tr>
                    ) : (
                        items.map((item, index) => (
                            <tr key={item.product} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-2 border text-center">{index + 1}</td>
                                <td className="px-4 py-2 border">{item.name}</td>
                                <td className="px-4 py-2 border text-center">{item.supplyQty}</td>
                                <td className="px-4 py-2 border text-center">{item.supplyBosta}</td>
                                <td className="px-4 py-2 border text-center">{item.unit}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Summary */}
            <div className="flex justify-end mb-6 space-y-2 flex-col">
                <div className="flex justify-between w-[75%]">
                    <span>Subtotal: </span>
                    <span>{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between w-[75%]">
                    <span>Total Commission:</span>
                    <span>{totalCommission}</span>
                </div>
                <div className="flex justify-between w-[75%]">
                    <span>Labour:</span>
                    <span>{labour.toFixed(2)}</span>
                </div>
                <div className="flex justify-between w-[75%]">
                    <span>Others:</span>
                    <span>{others.toFixed(2)}</span>
                </div>
                <div className="flex justify-between w-[75%] font-semibold">
                    <span>Grand Total:</span>
                    <span>{grandTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between w-[75%] font-semibold">
                    <span>Paid Amount:</span>
                    <span>{paidAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between w-[75%]">
                    <span>Payment Method:</span>
                    <span>{paymentMethod}</span>
                </div>
                <div className="flex justify-between w-[75%]">
                    <span>Status:</span>
                    <span className={`${status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>{status}</span>
                </div>

            </div>

            {/* Comments */}
            {comments && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md border">
                    <h2 className="font-semibold mb-2">Comments</h2>
                    <p>{comments}</p>
                </div>
            )}
        </div>
    );
};

export default CustomerInvoicePage;