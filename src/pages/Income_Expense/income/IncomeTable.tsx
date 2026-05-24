/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import ErrorBoundary from '../../../components/ErrorBoundary';
import TableSkeleton from '../../../components/table/TableSkeleton';
import { incomeTableHeads } from './incomeTableHeads';
import IncomeTableBody from './IncomeTableBody';
import { useDeleteTxnOfINEXMutation, useGetAllTxnQuery } from '../../../redux/features/inExTxn/inExTxnApi';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';

const IncomeTable = () => {
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [deleteTxn] = useDeleteTxnOfINEXMutation()

    const { data, isLoading, isError } = useGetAllTxnQuery({
        search,
        head: 'income',
        startDate,
        endDate,
    });

    if (isLoading) {
        return <TableSkeleton row={10} />;
    }

    if (isError) {
        return <ErrorBoundary />;
    }

    const incomes = data?.data?.data;

    const handleDelete = async (id: string) => {

        if (!confirm("ডিলিট হয়ে যাবে!")) return;

        const toastId = toast.loading("Deleting...");

        try {
            const res = await deleteTxn(id).unwrap();
            toast.update(toastId, {
                render: res.message,
                type: "success",
                isLoading: false,
                autoClose: 1500,
            });

        } catch (err: any) {
            toast.update(toastId, {
                render: err?.data?.message || "Delete failed!",
                type: "error",
                isLoading: false,
            });
        }
    };

    return (
        <div className="p-4 sm:p-6">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by destination, via, description..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded px-3 py-2 w-full text-sm"
                />
                <div className="flex  gap-2 w-full lg:w-auto">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded px-3 py-2 w-full text-sm"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded px-3 py-2 w-full text-sm"
                    />
                </div>
            </div>

            {/* Table for desktop */}
            <div className="hidden md:block overflow-x-auto mb-12">
                <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            {incomeTableHeads?.map((head: string) => (
                                <th
                                    key={head}
                                    className="px-4 py-2 border whitespace-nowrap text-left"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {incomes?.map((d: any, idx: number) => (
                            <IncomeTableBody key={d._id} d={d} idx={idx} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card layout for mobile */}
            <div className="grid gap-4 md:hidden mb-12">
                {incomes?.map((d: any, idx: number) => (
                    <div
                        key={d._id}
                        className="border rounded-lg shadow-sm p-4 bg-white"
                    >
                        <div className=" flex justify-between items-center text-sm font-semibold">
                            <p className="font-normal"> No: {idx + 1}</p>
                            <p onClick={() => handleDelete(d._id)} className="text-2xl font-bold text-red-600"><MdDelete /></p>
                        </div>
                        <p className="text-sm font-semibold">
                            আয়ের উৎস: <span className="font-normal">{d.category}</span>
                        </p>
                        <p className="text-sm font-semibold">
                            আয়কারী: <span className="font-normal">{d?.createdBy?.name}</span>
                        </p>
                        <p className="text-sm font-semibold">
                            পরিমাণ: <span className="font-normal">{d.amount}</span>
                        </p>
                        <p className="text-sm font-semibold">
                            তারিখ: <span className="font-normal">{format(d.createdAt, "dd/MM/yyyy, HH:mm a")}</span>
                        </p>
                        <p className="text-sm font-semibold">
                            বিবরণ: <span className="font-normal"> {d.description}</span>
                        </p>

                        {/* Add more fields as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IncomeTable;