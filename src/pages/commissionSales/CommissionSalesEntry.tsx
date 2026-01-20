/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { } from "react-redux";
import {
    setSupplier,
    setPaymentMethod,
    setDate,
    setNotes,
    resetForm
} from "../../redux/features/commissionSales/commissionSalesSlice";
import type { RootState } from "../../redux/store";
import ItemsForm from "./ItemsForm"; // ← Items Form Component
import { useGetAllSuppliersNameQuery } from "../../redux/features/supplier/supplierApi";
import { toast } from "react-toastify";
import CustomerSearchableSelectFields from "./CustomerSearchableSelectFields";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useCommissionSalesEntryMutation } from "../../redux/features/commissionSales/commissionSalesApi";

interface CommissionSalesEntryProps {
    onClose: () => void;
}


const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

const CommissionSalesEntry: React.FC<CommissionSalesEntryProps> = ({ onClose }) => {
    const commissionSales = useAppSelector((state: RootState) => state.commissionSales);
    const dispatch = useAppDispatch();

    const [search, setSearch] = React.useState("");
    const [openDropdown, setOpenDropdown] = React.useState(false);
    const debouncedSearch = useDebounce(search, 300);


    const paymentMethods = ['Cash', 'Bank', 'Bkash', 'Nagad', 'Rocket', 'Card',];

    const { data } = useGetAllSuppliersNameQuery({ search: debouncedSearch, limit: 20 })
    const suppliers = data?.data || [];
    const suppliersData = suppliers?.map((p: any) => ({ name: p.name, _id: p._id })) || [];
    const [createCommissionSales] = useCommissionSalesEntryMutation();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {

            const result = await createCommissionSales(commissionSales);
            if (result?.data?.success) {
                toast.update(toastId, { render: result?.data?.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                dispatch(resetForm())
                onClose();

            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });

            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });

        }

    };



    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg space-y-6">
            {/* Customer Info */}
            <CustomerSearchableSelectFields />



            {/* Supplier & Payment */}
            <div className="grid grid-cols-2 gap-4">
                {/* Supplier ( custom searchable select) */}
                <div className="col-span-1 relative">
                    <label className="block font-medium text-gray-700 mb-1">
                        সাপ্লাইয়ার
                    </label>
                    <input
                        type="text"
                        value={search ||
                            suppliersData?.find((s: any) => s._id === commissionSales?.supplier)?.name ||
                            ""}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setOpenDropdown(true);
                        }}
                        onFocus={() => setOpenDropdown(true)}
                        className="input input-bordered  rounded px-3 py-2 w-full"
                        placeholder="Select supplier"
                    />

                    {openDropdown && suppliersData.length > 0 && (
                        <ul className="absolute z-10 w-full max-h-40 overflow-auto border bg-white rounded shadow mt-1">
                            {suppliersData.map((p: any) => (
                                <li
                                    key={p._id}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => {
                                        dispatch(setSupplier(p._id));
                                        setSearch("");
                                        setOpenDropdown(false);
                                    }}
                                >
                                    {p.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium">পেমেন্ট মেথড</label>
                    <select
                        value={commissionSales.paymentMethod}
                        onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
                        className="select select-bordered w-full"
                    >
                        {paymentMethods.map((method) => (
                            <option key={method} value={method}>
                                {method}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Date */}
            <div>
                <label className="block mb-1 font-medium">Sales Date</label>
                <input
                    type="datetime-local"
                    value={commissionSales.date}
                    onChange={(e) => dispatch(setDate(e.target.value))}
                    className="border rounded px-3 py-2 w-full"
                />
            </div>

            <div className="mt-4 flex  gap-5">
                <div className="p-3 bg-green-100 rounded text-sm">
                    <b>Total Amount:</b> {commissionSales.totalAmount} ৳
                </div>
                <div className="p-3 bg-blue-100 rounded text-sm">
                    <b>Total Commission:</b> {commissionSales.totalCommission} ৳
                </div>
            </div>

            {/* Notes */}
            <div>
                <label className="block mb-1 font-medium">Notes</label>
                <textarea
                    value={commissionSales.notes}
                    onChange={(e) => dispatch(setNotes(e.target.value))}
                    className="border rounded px-3 py-2 w-full h-20 resize-none"
                />
            </div>

            {/* Items Section */}
            <ItemsForm />

            {/* Submit */}
            <div className="flex justify-end mb-20">
                <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default CommissionSalesEntry;
