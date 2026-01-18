/* eslint-disable @typescript-eslint/no-explicit-any */

import { DateTime } from "../../utils/formatDateTime";


// Define the Sale interface (replace with the actual structure if different)
interface Sale {
    invoice: string;
    customer: {
        phone: string
        name: string;
    };
    phone: string;
    grandTotal: number;
    createdAt: string;
    items: any[];
}

interface Props {
    sale: Sale;
    onInvoice: (sale: Sale) => void;
    setDelivery: any;
}

const SalesCard: React.FC<Props> = ({ sale, onInvoice, setDelivery }) => {
    return (
        <div className="rounded-lg border bg-white p-4 shadow-sm space-y-2">
            <div className="flex justify-between">
                <span className="font-semibold">ইনভয়েস</span>
                <span>{sale.invoice}</span>
            </div>

            <div className="text-sm space-y-1">
                <div className="flex justify-between">
                    <span className="font-semibold">কাস্টমার:</span>
                    <span>{sale?.customer?.name}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">ফোন:</span>
                    <span>{sale?.customer?.phone}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">মোট:</span>
                    <span>{sale.grandTotal}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">তারিখ:</span>
                    <span>{DateTime(sale.createdAt)}</span>
                </div>
            </div>

            <div className="flex gap-2 pt-2">
                <button
                    onClick={() => onInvoice(sale)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded text-sm"
                >
                    মেমো
                </button>
                <button
                    onClick={() => setDelivery(sale)}
                    className="flex-1 border py-2 rounded text-sm"
                >
                    ডেলিভারি এন্টি
                </button>
            </div>
        </div>
    );
};

export default SalesCard;