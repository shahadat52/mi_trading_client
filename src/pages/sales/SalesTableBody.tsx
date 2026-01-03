/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface SalesTableBodyProps {
    row: any;
    page: number;
    limit: number;
    idx: number;
    toggleExpand: (id: string) => void;
    expandedRows: Record<string, boolean>;
    openInvoice: (row: any) => void;
    setDelivery: (row: any) => void;
}

const SalesTableBody: React.FC<SalesTableBodyProps> = ({ row, page, limit, idx, toggleExpand, expandedRows, openInvoice, setDelivery }) => {

    return (
        <React.Fragment key={row._id}>
            <tr className="border-t hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2">{(page - 1) * limit + idx + 1}</td>
                <td className="px-4 py-2">{row.invoice}</td>
                <td className="px-4 py-2">{row.customer.name}</td>
                <td className="px-4 py-2">{row.customer.phone}</td>
                <td className="px-4 py-2">{new Date(row.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 ">{row.grandTotal}</td>
                <td className="px-4 py-2 ">{row.paidAmount || 0}</td>
                <td className="px-4 py-2">
                    <span
                        className={`px-2 py-1 text-xs rounded font-medium ${row.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : row.status === "unpaid"
                                ? "bg-red-100 text-red-700"
                                : row.status === "partial"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                    >
                        {row.status}
                    </span>
                </td>
                <td
                    onClick={() => setDelivery(row)}
                    className={`cursor-pointer px-4 py-2  p-2   rounded ${row?.isDelivered ? 'text-green-700' : 'text-red-700'}`}>{row?.isDelivered ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2">
                    <div className="flex gap-2">
                        <button onClick={() => toggleExpand(row._id)} className="text-sm px-2 py-1 border rounded">{expandedRows[row._id] ? 'Hide' : 'Details'}</button>
                        <button onClick={() => openInvoice(row)} className="text-sm px-2 py-1 border rounded">View</button>


                    </div>
                </td>
            </tr>

            {/* Expanded Row: show salesProducts */}
            {(expandedRows[row?._id] as any) && (
                <tr className="bg-green-300 rounded-2xl">
                    <td colSpan={9} className="px-4 py-3">
                        <div className="overflow-auto">
                            <table className="w-full text-sm">
                                <thead className=''>
                                    <tr className="text-left text-gray-800">
                                        <th className="py-2">Product</th>
                                        <th className="py-2">Qty</th>
                                        <th className="py-2">Unit Price</th>
                                        <th className="py-2 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-100 rounded-2xl'>
                                    {row?.items?.map((p: any, i: any) => (
                                        <tr key={i} className="border-t ">
                                            <td className="p-2">{typeof p.product === 'string' ? p.product : (p.product as any)?.name || (p.product as any)?._id}</td>
                                            <td className="p-2">{p.quantity}</td>
                                            <td className="p-2">{p.salePrice}</td>
                                            <td className="p-2 text-right">{p.totalPrice}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            )}
        </React.Fragment>
    );
};

export default SalesTableBody;