/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useGetAllPurchasesQuery } from "../../redux/features/purchase/purchaseApi";
import { useDeleteSupplierMutation, useGetAllSuppliersQuery } from "../../redux/features/supplier/supplierApi";
import TableSkeleton from "../../components/table/TableSkeleton";
import ErrorBoundary from "../../components/ErrorBoundary";
import Modal from "../../components/Modal";
import DeleteModal from "../../components/modal/DeleteModal";
import { AddSupplierModal } from "../../components/modal/AddSupplierModal";
import { ViewModal } from "./modal/ViewModal";
import CommissionProductEntry from "./CommissionProductEntry";
import { commissionSalesTableHeads } from "../../utils/commissionSalesTableHead";
import { useDebounce } from "../../utils/useDebounce";
import { FiSearch } from "react-icons/fi";
import { LIMIT_OPTIONS } from "../../utils/options";

const PAGE_LIMIT = 100;

const Button = ({ children, onClick, className = "", ...props }: any) => (
    <button
        onClick={onClick}
        className={`px-3 py-2 rounded text-sm font-medium transition-colors duration-200 ${className}`}
        {...props}
    >
        {children}
    </button>
);

const CommissionPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1);
    const [sortBy] = useState("createdAt");
    const navigate = useNavigate()

    // Modal States
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false);

    const [viewItem, setViewItem] = useState<any>(null);
    // const [editItem, setEditItem] = useState<any>(null);
    const [deleteItem, setDeleteItem] = useState<any>(null);

    const [deleteSupplier] = useDeleteSupplierMutation();

    // API Calls
    const { data, isLoading, isError } = useGetAllPurchasesQuery({
        page,
        sortBy,
    });

    const { data: commissionSuppliers } = useGetAllSuppliersQuery({ type: "commission", searchTerm: useDebounce(searchTerm), limit: limit });
    const suppliers = commissionSuppliers?.data || [];
    const total = data?.meta?.total || 0;
    const totalPages = Math.ceil(total / PAGE_LIMIT);

    const handleDeleteConfirm = async (id: string) => {
        try {
            await deleteSupplier(id).unwrap();
            setDeleteItem(null);
        } catch (err) {
            setDeleteItem(null);
        }
    };



    if (isError) return <ErrorBoundary />;

    return (
        <div className="p-4 space-y-2">


            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
                <Button className="bg-blue-600 text-white" onClick={() => setIsProductModalOpen(true)}>
                    ➕ নতুন পন্য
                </Button>
                <Button className="bg-blue-600 text-white" onClick={() => setIsAddSupplierModalOpen(true)}>
                    ➕ নতুন বেপারী
                </Button>
            </div>

            <div className="grid grid-cols-4 gap-2">
                <div className="relative w-full col-span-3 ">
                    <FiSearch
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                    />
                    <input
                        type="text"
                        placeholder="নাম / মোবাইল দিয়ে খুঁজুন..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-2xl border border-slate-400 bg-white py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>
                <select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="w-full col-span-1 select rounded-xl ml-1"
                >
                    {LIMIT_OPTIONS?.map((opt: any) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
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
                            {suppliers?.map((s: any, idx: number) => (
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

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-2">
                {isLoading ? (<TableSkeleton row={1} />) : (suppliers?.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">কোনো সাপ্লাইয়ার ডেটা পাওয়া যায়নি।</p>
                    </div>
                ) : suppliers?.map((item: any, idx: number) => (
                    <div onClick={() => navigate(`/commission-purchase/${item._id}`)} key={idx} className="bg-white shadow rounded-lg p-2 space-y-1">
                        <div className="font-medium text-lg text-black">{idx + 1}) {item.name} - {item.phone}</div>
                    </div>
                )
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
            {/* {editItem && <EditModal item={editItem} onClose={() => setEditItem(null)}  />} */}
            {
                deleteItem && (
                    <DeleteModal
                        open={Boolean(deleteItem)}
                        item={deleteItem}
                        onClose={() => setDeleteItem(null)}
                        onConfirm={() => handleDeleteConfirm(deleteItem._id)}
                    />
                )
            }
            {
                isProductModalOpen && (
                    <Modal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)}>
                        <CommissionProductEntry onClose={() => setIsProductModalOpen(false)} />
                    </Modal>
                )
            }

            {
                isAddSupplierModalOpen && (
                    <AddSupplierModal type='commission' setAddSupplierModalCont={setIsAddSupplierModalOpen} />
                )
            }
        </div >
    );
};

export default CommissionPage;
