/* ----------------------------------
   ViewModal – Professional Version
---------------------------------- */

import { formatDateTime } from "../../../utils/formatDateTime";

type PurchaseItem = {
    supplier?: { name?: string };
    product?: { name?: string };
    purchaseType?: string;
    invoice?: string;
    stockQty?: number;
    purchaseDate?: string;
    purchasePrice?: number;
    dueAmount?: number;
    commissionPerUnit?: number;
    lot?: string;
    unit?: string;
    salesPrice?: number;
    note: string
    isPaid?: boolean;
};

interface ViewModalProps {
    item: PurchaseItem | null;
    onClose: () => void;
}

export const ViewModal = ({ item, onClose }: ViewModalProps) => {
    if (!item) return null;
    const DetailRow = ({ label, value }: { label: string; value?: string | number }) => {
        if (value === undefined || value === null || value === "") return null;

        return (
            <div className="flex justify-between border-b py-1 text-sm">
                <span className="font-medium text-gray-600">{label}</span>
                <span className="text-gray-900 font-semibold">{value}</span>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 animate-fadeIn">
                <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">
                    Purchase Details
                </h2>

                <div className="space-y-1">
                    <DetailRow label="বেপারী/সাপ্লাইয়ার" value={item?.supplier?.name} />
                    <DetailRow label="পণ্য" value={item?.product?.name} />
                    <DetailRow label="ক্রয়ের ধরণ" value={item?.purchaseType} />
                    <DetailRow label="ইনভয়েস" value={item?.invoice} />
                    <DetailRow label="স্টক পরিমাণ" value={item?.stockQty} />
                    <DetailRow label="ক্রয়ের সময়" value={formatDateTime(item?.purchaseDate)} />
                    <DetailRow label="ক্রয়ের মূল্য" value={item?.purchasePrice} />
                    <DetailRow label="বাকি টাকা" value={item?.dueAmount} />

                    {item.purchaseType === "commission" && (
                        <DetailRow label="ইউনিট প্রতি কমিশন" value={item.commissionPerUnit} />
                    )}

                    <DetailRow label="Lot" value={item?.lot} />
                    <DetailRow label="Unit" value={item?.unit} />
                    <DetailRow label="Sale Price" value={item?.salesPrice} />

                    <div className="flex justify-between border-b py-1 text-sm">
                        <span className="font-medium text-gray-600">Status</span>
                        <span
                            className={`font-semibold ${item.isPaid ? "text-green-600" : "text-red-500"
                                }`}
                        >
                            {item.isPaid ? "Paid" : "Unpaid"}
                        </span>
                    </div>

                    <div className=" flex flex-col border-b py-1 text-sm">
                        <span className="font-medium text-gray-600">Note</span>
                        <span
                            className='font-semibold text-blue-600'
                        >
                            {item.note ? item.note : "N/A"}
                        </span>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full rounded-lg bg-red-500 hover:bg-red-600 transition text-white py-2 font-medium"
                >
                    Close
                </button>
            </div>
        </div>
    );
};
