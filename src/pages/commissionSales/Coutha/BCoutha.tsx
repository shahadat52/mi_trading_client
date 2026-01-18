
import React from "react";
import { QRCodeSVG } from 'qrcode.react';

type MemoItem = {
    name: string;
    quantity: number;
    price: number;
    total: number;
};

type MemoProps = {
    company: {
        name: string;
        phone: string;
        logo?: string;
    };
    customer: {
        name: string;
        phone: string;
        address: string;
    };
    memoNo: string;
    date: string;
    items: MemoItem[];
    subTotal: number;
    discount?: number;
    grandTotal: number;
};

const BepariCoutha: React.FC<MemoProps> = (item) => {
    const {
        company,
        customer,
        memoNo,
        date,
        subTotal,
        discount = 0,
        grandTotal,
    } = item;
    return (
        <div className="max-w-4xl mx-auto bg-white p-6 border border-gray-300 text-sm print:p-2">

            {/* ================= Header ================= */}
            <div className="flex justify-between items-start border-b pb-4">
                <div className="flex items-center gap-3">
                    {company?.logo && (
                        <img src={company?.logo} alt="Logo" className="h-14 w-14 object-contain" />
                    )}
                    <div>
                        <h1 className="text-xl font-bold uppercase">{company?.name}</h1>
                        <p className="text-gray-600">Phone: {company?.phone}</p>
                    </div>
                </div>

                <div className="text-right">
                    <div className="flex flex-col items-center bg-white  p-1 shadow-sm">
                        <QRCodeSVG
                            value="https://www.facebook.com/profile.php?id=100057298125999"
                            size={48}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="H"
                        />
                        <span className="text-[8px] text-blue-900 mt-[2px] font-semibold">
                            Facebook
                        </span>
                    </div>
                </div>
            </div>

            {/* ================= Customer Info ================= */}
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <h2 className="font-semibold mb-1">Customer Information</h2>
                    <p><span className="font-medium">Name:</span> {customer?.name}</p>
                    <p><span className="font-medium">Phone:</span> {customer?.phone}</p>
                    <p><span className="font-medium">Address:</span> {customer?.address}</p>
                </div>

                <div className="text-right">
                    <p><span className="font-medium">Memo No:</span> {memoNo}</p>
                    <p><span className="font-medium">Date:</span> {date}</p>
                </div>
            </div>

            {/* ================= Table ================= */}
            <div className="mt-6">
                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2 text-left">#</th>
                            <th className="border p-2 text-left">Item</th>
                            <th className="border p-2 text-center">Qty</th>
                            <th className="border p-2 text-right">Price</th>
                            <th className="border p-2 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>

            {/* ================= Summary ================= */}
            <div className="flex justify-end mt-4">
                <div className="w-64 space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{subTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount</span>
                        <span>{discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2">
                        <span>Grand Total</span>
                        <span>{grandTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* ================= Footer ================= */}
            <div className="flex justify-between mt-10">
                <div className="text-center">
                    <div className="border-t w-40 mx-auto"></div>
                    <p className="mt-1 text-xs">Customer Signature</p>
                </div>

                <div className="text-center">
                    <div className="border-t w-40 mx-auto"></div>
                    <p className="mt-1 text-xs">Authorized Signature</p>
                </div>
            </div>

            <p className="text-center text-xs mt-4 text-gray-500">
                Thank you for your business
            </p>
        </div>
    );
};

export default BepariCoutha;
