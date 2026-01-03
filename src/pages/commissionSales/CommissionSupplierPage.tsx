/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { NavLink } from "react-router";
import { useGetAllPurchasesQuery } from "../../redux/features/purchase/purchaseApi";
import { useDeleteSupplierMutation, useGetAllSuppliersQuery } from "../../redux/features/supplier/supplierApi";
import TableSkeleton from "../../components/table/TableSkeleton";
import ErrorBoundary from "../../components/ErrorBoundary";
import Modal from "../../components/Modal";
import DeleteModal from "../../components/modal/DeleteModal";
import { AddSupplierModal } from "../../components/modal/AddSupplierModal";
import { ViewModal } from "./modal/ViewModal";
import { EditModal } from "./modal/EditModal";
import CommissionSalesEntry from "./CommissionSalesEntry";
import CommissionProductEntry from "./CommissionProductEntry";
import { commissionSalesTableHeads } from "../../utils/commissionSalesTableHead";

const PAGE_LIMIT = 10;

const Button = ({ children, onClick, className = "", ...props }: any) => (
    <button
        onClick={onClick}
        className={`px-3 py-2 rounded text-sm font-medium transition-colors duration-200 ${className}`}
        {...props}
    >
        {children}
    </button>
);

const CommissionSupplierPage = () => {
    // Pagination & Filters
    const [page, setPage] = useState(1);
    // const [limit, setLimit] = useState(10);
    // const [search, setSearch] = useState("");
    const [sortBy] = useState("createdAt");
    // const [order, setOrder] = useState<"asc" | "desc">("asc");
    // const [dateFrom, setDateFrom] = useState("");
    // const [dateTo, setDateTo] = useState("");
    // const [category, setCategory] = useState("All");

    // Modal States
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
    const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false);

    const [viewItem, setViewItem] = useState<any>(null);
    const [editItem, setEditItem] = useState<any>(null);
    const [deleteItem, setDeleteItem] = useState<any>(null);

    const [deleteSupplier] = useDeleteSupplierMutation();

    // API Calls
    const { data, isLoading, isError } = useGetAllPurchasesQuery({
        page,
        sortBy,
    });

    const { data: commissionData } = useGetAllSuppliersQuery({ type: "commission" });
    const suppliers = commissionData?.data || [];

    const total = data?.meta?.total || 0;
    const totalPages = Math.ceil(total / PAGE_LIMIT);

    const handleDeleteConfirm = async (id: string) => {
        console.log(id)
        try {
            const result = await deleteSupplier(id).unwrap();
            console.log(result);
            setDeleteItem(null);
        } catch (err) {
            console.error(err);
            setDeleteItem(null);
        }
    };

    // const handleSearchSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setPage(1);
    // };

    // const clearFilters = () => {
    //     setSearch("");
    //     setDateFrom("");
    //     setDateTo("");
    //     setPage(1);
    //     setCategory("All");
    // };

    if (isError) return <ErrorBoundary />;

    return (
        <div className="p-4 space-y-6">
            {/* Filter & Search */}
            {/* <form
                onSubmit={handleSearchSubmit}
                className="flex flex-col md:flex-row gap-4 justify-between items-center"
            >
                <div className="flex flex-wrap gap-2 items-center">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search customer, invoice, or phone..."
                        className="border rounded px-3 py-2 text-sm w-80 focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="border rounded px-3 py-2 text-sm"
                    />
                    <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="border rounded px-3 py-2 text-sm"
                    />

                </div>

                <div className="flex justify-between gap-5">
                    <Button
                        className="border"
                        onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                    >
                        {order === "asc" ? "Ascending" : "Descending"}
                    </Button>
                    <select
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            setPage(1);
                        }}
                        className="border rounded px-3 py-2 text-sm"
                    >
                        {[5, 10, 25, 50, 100].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>

                </div>
                <div>
                    <Button className="bg-blue-600 text-white" type="submit">
                        Search
                    </Button>
                    <Button className="border text-gray-700" type="button" onClick={clearFilters}>
                        Clear
                    </Button>
                </div>
            </form> */}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
                <Button className="bg-blue-600 text-white" onClick={() => setIsSalesModalOpen(true)}>
                    ➕ বিক্রি করুন
                </Button>
                <Button className="bg-blue-600 text-white" onClick={() => setIsProductModalOpen(true)}>
                    ➕ নতুন পন্য
                </Button>
                <Button className="bg-blue-600 text-white" onClick={() => setIsAddSupplierModalOpen(true)}>
                    ➕ নতুন সাপ্লাইয়ার
                </Button>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
                {isLoading ? (
                    <TableSkeleton row={10} />
                ) : suppliers.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No suppliers found.</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {commissionSalesTableHeads?.map((head: any, idx: number) => (
                                    <th
                                        key={idx}
                                        className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                                    >
                                        {head.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {suppliers.map((s: any, idx: number) => (
                                <tr key={idx} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-2 text-sm">
                                        <NavLink to={`/commission-purchase/${s._id}`} className="flex flex-col">
                                            <span className="font-medium">{s.name}</span>
                                            <span className="text-gray-500">{s.phone}</span>
                                        </NavLink>
                                    </td>
                                    <td className="px-4 py-2">
                                        <NavLink
                                            to={`/commission-purchase/${s._id}`}
                                            className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
                                        >
                                            সাপ্লাই
                                        </NavLink>
                                    </td>
                                    <td className="px-4 py-2">
                                        <NavLink
                                            to={`/commission-sales/${s._id}`}
                                            className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                                        >
                                            সেলস
                                        </NavLink>
                                    </td>
                                    <td className="px-4 py-2 flex gap-1">
                                        <Button
                                            className="bg-gray-600 text-white"
                                            onClick={() => setViewItem(s)}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            className="bg-blue-600 text-white"
                                            onClick={() => setEditItem(s)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            className="bg-red-600 text-white"
                                            onClick={() => setDeleteItem(s)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {suppliers?.map((item: any, idx: number) => (
                    <div key={idx} className="bg-white shadow rounded-lg p-4 space-y-2">
                        <div className="font-medium text-lg">{item.name} - {item.phone}</div>
                        <div className="flex gap-2">
                            <NavLink
                                to={`/commission-purchase/${item._id}`}
                                className="px-2 py-1 bg-blue-600 text-white rounded text-xs flex-1 text-center"
                            >
                                সাপ্লাই
                            </NavLink>
                            <NavLink
                                to={`/commission-sales/${item._id}`}
                                className="px-2 py-1 bg-green-600 text-white rounded text-xs flex-1 text-center"
                            >
                                সেলস
                            </NavLink>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <Button className="bg-gray-600 text-white flex-1" onClick={() => setEditItem(item)}>
                                Edit
                            </Button>
                            <Button className="bg-red-600 text-white flex-1" onClick={() => setDeleteItem(item)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 mb-12 gap-3">
                <span className="text-sm text-gray-600">
                    Page {page} of {totalPages || 1}
                </span>
                <div className="flex gap-2">
                    <Button
                        className="border disabled:opacity-50"
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        Prev
                    </Button>
                    <Button
                        className="border disabled:opacity-50"
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* Modals */}
            {viewItem && <ViewModal item={viewItem} onClose={() => setViewItem(null)} />}
            {editItem && <EditModal item={editItem} onClose={() => setEditItem(null)} />}
            {deleteItem && (
                <DeleteModal
                    open={Boolean(deleteItem)}
                    item={deleteItem}
                    onClose={() => setDeleteItem(null)}
                    onConfirm={() => handleDeleteConfirm(deleteItem._id)}
                />
            )}
            {isProductModalOpen && (
                <Modal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)}>
                    <CommissionProductEntry onClose={() => setIsProductModalOpen(false)} />
                </Modal>
            )}
            {isSalesModalOpen && (
                <Modal isOpen={isSalesModalOpen} onClose={() => setIsSalesModalOpen(false)}>
                    <CommissionSalesEntry onClose={() => setIsSalesModalOpen(false)} />
                </Modal>
            )}
            {isAddSupplierModalOpen && (
                <AddSupplierModal setAddSupplierModalCont={setIsAddSupplierModalOpen} />
            )}
        </div>
    );
};

export default CommissionSupplierPage;
