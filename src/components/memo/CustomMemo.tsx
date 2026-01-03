/* eslint-disable @typescript-eslint/ban-ts-comment */

// import { FaEnvelope, FaFacebookF, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';


import { useState } from "react";

type TItem = {
    description: string;
    qty: number;
    rate: number;
};
const OriginalMemo = ({ onClose }: { onClose: () => void }) => {

    const [items, setItems] = useState<TItem[]>([
        { description: "", qty: 0, rate: 0 },
    ]);

    const handleChange = (
        index: number,
        field: keyof TItem,
        value: string | number
    ) => {
        const updated = [...items];
        // @ts-ignore
        updated[index][field] = value;
        setItems(updated);
    };

    const addRow = () => {
        setItems([...items, { description: "", qty: 0, rate: 0 }]);
    };

    const totalAmount = items.reduce(
        (sum, item) => sum + item.qty * item.rate,
        0
    )
    return (
        <div className="overflow-auto fixed inset-0 z-50 flex justify-center items-start bg-black/40 p-4 print:bg-white print:static">
            <div className="relative w-[520px] bg-white border-4 border-orange-500 shadow-lg print:shadow-none">

                {/* WATERMARK */}
                <div
                    className="absolute inset-0 opacity-40 blur-sm pointer-events-none"
                    style={{
                        backgroundImage: "url('/mi_logo.png')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "20% center",
                        backgroundSize: "60%",
                    }}
                />

                {/* CONTENT */}
                <div className="relative">

                    {/* HEADER */}
                    <div className="bg-orange-500 text-white text-center py-3 border-b-4 border-green-600">
                        <h1 className="text-xl font-bold">M/S M.I TRADING</h1>
                        <p className="text-xs">
                            Hardware, Sanitary, Pipe & Fittings Store
                        </p>
                        <p className="text-[11px] mt-1">
                            Kotwali, Chattogram | 01842-753607
                        </p>
                    </div>

                    {/* INFO */}
                    <div className="grid grid-cols-2 gap-2 p-3 text-sm border-b">
                        <div>
                            <p>
                                <span className="font-semibold">Memo No:</span> _______
                            </p>
                            <p>
                                <span className="font-semibold">Customer:</span> ___________
                            </p>
                            <p>
                                <span className="font-semibold">Address:</span> ___________
                            </p>
                        </div>
                        <div className="text-right">
                            <p>
                                <span className="font-semibold">Date:</span>{" "}
                                {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* TABLE */}
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-orange-100">
                                <th className="border p-1 w-8">SL</th>
                                <th className="border p-1">Description</th>
                                <th className="border p-1 w-14">Qty</th>
                                <th className="border p-1 w-20">Rate</th>
                                <th className="border p-1 w-24">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, i) => (
                                <tr key={i}>
                                    <td className="border p-1 text-center">{i + 1}</td>
                                    <td className="border p-1">
                                        <input
                                            className="w-full outline-none bg-transparent"
                                            value={item.description}
                                            onChange={(e) =>
                                                handleChange(i, "description", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td className="border p-1">
                                        <input
                                            type="number"
                                            className="w-full outline-none bg-transparent text-right"
                                            value={item.qty}
                                            onChange={(e) =>
                                                handleChange(i, "qty", Number(e.target.value))
                                            }
                                        />
                                    </td>
                                    <td className="border p-1">
                                        <input
                                            type="number"
                                            className="w-full outline-none bg-transparent text-right"
                                            value={item.rate}
                                            onChange={(e) =>
                                                handleChange(i, "rate", Number(e.target.value))
                                            }
                                        />
                                    </td>
                                    <td className="border p-1 text-right">
                                        {item.qty * item.rate || ""}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* ADD ROW */}
                    <div className="p-2 print:hidden">
                        <button
                            onClick={addRow}
                            className="text-xs px-2 py-1 border rounded hover:bg-gray-50"
                        >
                            + Add Row
                        </button>
                    </div>

                    {/* TOTAL */}
                    <div className="flex justify-end gap-6 p-3 border-t text-sm font-semibold">
                        <span>Total</span>
                        <span className="w-32 text-right border-b border-dashed">
                            {totalAmount}
                        </span>
                    </div>

                    {/* FOOTER */}
                    <div className="flex justify-between p-3 text-xs border-t">
                        <div>
                            <p>Customer Signature</p>
                            <div className="mt-6 w-32 border-t"></div>
                        </div>
                        <div className="text-right">
                            <p>Authorized Signature</p>
                            <div className="mt-6 w-32 border-t ml-auto"></div>
                        </div>
                    </div>

                </div>

                {/* ACTION BUTTONS */}
                <div className="flex justify-between p-3 border-t print:hidden">
                    <button
                        onClick={() => window.print()}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        Print
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-50 text-red-700 rounded"
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OriginalMemo;