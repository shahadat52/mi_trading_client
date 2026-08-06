/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import InvoiceEditModal from "./InvoiceEditModal";
import { MdDelete } from "react-icons/md";
import Modal from "../../../components/Modal";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { setDueShow } from "../../../redux/features/sales/salesSlice";
import { format } from "date-fns";
import Loading from "../../../components/Loading";


// Define the Sale interface (replace with the actual structure if different)
interface Sale {
    _id: string
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
    loading: boolean;
    setLoading: any;
    handleDeleteInvoice: any
}

const SalesCard: React.FC<Props> = ({ sale, onInvoice, setDelivery, loading, setLoading, handleDeleteInvoice }) => {
    const dispatch = useAppDispatch();
    const [selectedInvoice, setSelectedInvoice] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const dueShow = useAppSelector((state) => state.sales.dueShow)


    return (
        <div className="rounded-lg border bg-white p-4 shadow-sm space-y-1">

            <div onClick={() =>
            (
                setLoading(true),
                handleDeleteInvoice(sale?._id)
            )}>
                <span className="text-3xl text-red-600">{loading ? <Loading /> : <MdDelete />}</span>
            </div>
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
                    <span>{format(sale.createdAt, 'dd/MM/yyyy')}:({format(sale.createdAt, 'hh:mm')})</span>
                </div>
            </div>

            <div className="flex gap-2 pt-2">
                <button
                    onClick={() => onInvoice(sale)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded text-sm"
                >
                    Memo
                </button>
                <button onClick={() => dispatch(setDueShow(!dueShow))} className="text-sm px-2 py-1 border rounded">{dueShow ? 'Hide Due' : 'Show Due'}</button>

                <button
                    onClick={() => setDelivery(sale)}
                    className="flex-1 border py-2 rounded text-sm"
                >
                    Delivery
                </button>
                <button
                    className="flex-1 bg-orange-600 text-white py-2 rounded text-sm"
                    onClick={() => {
                        setSelectedInvoice((sale as any));
                        setIsOpen(true)
                    }}
                >
                    Edit
                </button>
            </div>

            {
                isOpen && <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <InvoiceEditModal onClose={() => setIsOpen(false)} sale={selectedInvoice} />
                </Modal>
            }

        </div>
    );
};

export default SalesCard;