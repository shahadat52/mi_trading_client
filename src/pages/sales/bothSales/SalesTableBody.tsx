/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Modal from '../../../components/Modal';
import InvoiceEditModal from './InvoiceEditModal';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { setDueShow } from '../../../redux/features/sales/salesSlice';
import { format } from 'date-fns';

interface SalesTableBodyProps {
    row: any;
    page: number;
    limit: number;
    idx: number;
    openInvoice: (row: any) => void;
    setDelivery: (row: any) => void;
}

const SalesTableBody: React.FC<SalesTableBodyProps> = ({ row, page, limit, idx, openInvoice, setDelivery }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [selectedInvoice, setSelectedInvoice] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const dueShow = useAppSelector((state) => state.sales.dueShow)

    const handleOpenMemo = (no: string) => {
        if (no.includes("MI(S)")) {
            navigate(`/invoice/${no}`)
        } else {
            return
        }
    };
    return (
        <React.Fragment key={row._id}>
            <tr className="border-t hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2">{(page - 1) * limit + idx + 1}</td>
                <td onClick={(e) => {
                    e.stopPropagation();
                    handleOpenMemo(row?.invoice);
                }} className="px-4 py-2">{row.invoice}</td>
                <td className="px-4 py-2">{row?.customer?.name}</td>
                <td className="px-4 py-2">{row?.customer?.phone}</td>
                <td className="px-4 py-2">{format(row.date, 'dd/MM/yyyy')} <br />{format(row.date, 'hh:mm')}</td>
                <td className="px-4 py-2 ">{row?.grandTotal}</td>
                <td className="px-4 py-2 ">{row?.paidAmount || 0}</td>
                <td className="px-4 py-2">
                    <span
                        className={`px-2 py-1 text-xs rounded font-medium ${row?.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : row?.status === "unpaid"
                                ? "bg-red-100 text-red-700"
                                : row?.status === "partial"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                    >
                        {row?.status}
                    </span>
                </td>
                <td
                    onClick={() => setDelivery(row)}
                    className={`cursor-pointer px-4 py-2  p-2   rounded ${row?.isDelivered ? 'text-green-700' : 'text-red-700'}`}>{row?.isDelivered ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2">
                    <div className="flex gap-2">
                        <button onClick={() => dispatch(setDueShow(!dueShow))} className="text-sm px-2 py-1 border rounded">{dueShow ? 'Hide Due' : 'Show Due'}</button>
                        <button onClick={() => openInvoice(row)} className="text-sm px-2 py-1 border rounded">View</button>
                        <button onClick={() => {
                            setSelectedInvoice((row as any));
                            setIsOpen(true)
                        }} className="text-sm px-2 py-1 border rounded">Edit</button>

                    </div>
                </td>
            </tr>

            {
                isOpen && <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <InvoiceEditModal onClose={() => setIsOpen(false)} sale={selectedInvoice} />
                </Modal>
            }
        </React.Fragment>
    );
};

export default SalesTableBody;