/* eslint-disable @typescript-eslint/no-explicit-any */


// Define the Sale interface (replace with the actual structure if different)
interface Sale {
    invoice: string;
    customer: {
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
    onDelivery: (items: any[]) => void;
}

const SalesCard: React.FC<Props> = ({ sale, onInvoice, onDelivery }) => {
    return (
        <div className="rounded-lg border bg-white p-4 shadow-sm space-y-2">
            <div className="flex justify-between">
                <span className="font-semibold">Invoice</span>
                <span>{sale.invoice}</span>
            </div>

            <div className="text-sm space-y-1">
                <p><strong>Customer:</strong> {sale.customer.name}</p>
                <p><strong>Phone:</strong> {sale.phone}</p>
                <p><strong>Total:</strong> ৳{sale.grandTotal}</p>
                <p><strong>Date:</strong> {new Date(sale.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="flex gap-2 pt-2">
                <button
                    onClick={() => onInvoice(sale)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded text-sm"
                >
                    Invoice
                </button>
                <button
                    onClick={() => onDelivery(sale.items)}
                    className="flex-1 border py-2 rounded text-sm"
                >
                    Delivery
                </button>
            </div>
        </div>
    );
};

export default SalesCard;