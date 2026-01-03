/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAllPurchasesQuery, useDeletePurchaseMutation } from "../../redux/features/purchase/purchaseApi";
import { ViewModal } from "../commissionSales/modal/ViewModal";
import { EditModal } from "../commissionSales/modal/EditModal";
import DeleteModal from "../../components/modal/DeleteModal";
import TableSkeleton from "../../components/table/TableSkeleton";
import ErrorBoundary from "../../components/ErrorBoundary";
import { purchaseTableHeads } from "../../utils/purchaseTableHead";
import { toast } from "react-toastify";


const PAGE_LIMIT = 5;

const PurchaseOverviewTable = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [search, setSearch] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('createdAt');
    const [order, setOrder] = useState('asc');
    const [dateFrom, setDateFrom] = useState<string>('');
    const [dateTo, setDateTo] = useState<string>('');
    const [category, setCategory] = useState<string>('All')


    // Modal States
    const [viewItem, setViewItem] = useState<any>(null);
    const [editItem, setEditItem] = useState<any>(null);
    const [deleteItem, setDeleteItem] = useState<any>(null);

    const [deletePurchase] = useDeletePurchaseMutation();

    const { data, isLoading, isError, error } = useGetAllPurchasesQuery({
        page, limit, search, order, sortBy, dateFrom, dateTo,
        category: category === "All" ? "" : category,

    });

    const purchases = data?.data || [];
    const total = data?.meta?.total || 0;
    const totalPages = Math.ceil(total / PAGE_LIMIT);


    const handleDeleteConfirm = async (id: string) => {
        const toastId = toast.loading("Processing...", { autoClose: 2000 });

        try {
            const result = await deletePurchase(id)
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                setDeleteItem(null);

            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });

            }
            setDeleteItem(null);
        } catch (err) {
            console.error(err);
        }
    };


    const onSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
    };

    const clearFilters = () => {
        setSearch('');
        setDateFrom('');
        setDateTo('');
        setPage(1);
        setCategory('All')
    };

    if (isError) {
        return <ErrorBoundary />
    }


    return (
        <div className="p-4 space-y-4">
            {/* Filters */}
            {/* Filters and search */}
            <form onSubmit={onSearchSubmit} className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex gap-2 flex-wrap items-center">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search customer, invoice or phone..."
                        className="border rounded px-3 py-2 text-sm w-64"
                    />

                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded px-3 py-2 text-sm">
                        <option key='default' value="">Select Category</option>
                        <option key='মরিচ' value="মরিচ">মরিচ</option>
                        <option key='হলুদ' value="হলুদ">হলুদ</option>
                        <option key='sorisha' value="sorisha">সরিষা</option>
                    </select>

                    <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border rounded px-3 py-2 text-sm" />
                    <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border rounded px-3 py-2 text-sm" />


                    <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded text-sm">Search</button>
                    <button type="button" onClick={clearFilters} className="px-3 py-2 border rounded text-sm">Clear</button>
                </div>

                <div className="flex gap-2 items-center">
                    <label className="text-sm">Sort:</label>
                    <button
                        type="button"
                        onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                        className="px-3 py-2 border rounded text-sm"
                    >
                        {order === 'asc' ? 'Ascending' : 'Descending'}
                    </button>

                    <label className="text-sm">Sort:</label>
                    <select value={sortBy} onChange={(e) => { setSortBy(e.target.value) }} className="border rounded px-3 py-2 text-sm">
                        <option value='createdAt'>Date</option>
                        <option value='grandTotal'>Grand Total</option>
                        <option value='customer'>Customer</option>
                    </select>
                    <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }} className="border rounded px-3 py-2 text-sm">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </form>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-sm">

                {isLoading ? (
                    <TableSkeleton row={10} />
                ) : isError ? (
                    <div className="p-4 text-red-600">{(error as any)?.data?.message || 'Error loading sales'}</div>
                ) : purchases?.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No sales found.</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {
                                    purchaseTableHeads.map((item: { name: string }, index: number) => <th key={index} className="px-4 py-2 text-left text-sm font-medium text-gray-700">{item.name}</th>)
                                }
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {
                                isLoading ? <TableSkeleton row={10} /> :
                                    purchases?.map((purchase: any) => (
                                        <tr key={purchase._id}>
                                            <td className="px-4 py-2 text-sm">{purchase.product?.name}</td>
                                            <td className="px-4 py-2 text-sm">{purchase.supplier?.name}</td>
                                            <td className="px-4 py-2 text-sm">{purchase.purchaseType}</td>
                                            <td className="px-4 py-2 text-sm">{purchase.lot}</td>
                                            <td className="px-4 py-2 text-sm">{purchase.product.unit}</td>
                                            <td className="px-4 py-2 text-sm">{purchase.purchasePrice}</td>
                                            <td className="px-4 py-2 text-sm">{purchase.product.salesPrice}</td>
                                            <td className={`px-4 py-2 text-sm ${purchase.stockQty <= 5 ? "text-red-500 font-semibold" : ""}`}>
                                                {purchase.stockQty}
                                            </td>
                                            <td className="px-4 py-2 text-sm">
                                                <span className={`px-2 py-1 text-xs rounded ${purchase.isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                                    {purchase.isPaid ? "Paid" : "Unpaid"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-sm flex gap-1">
                                                <button onClick={() => setViewItem(purchase)} className="px-2 py-1 bg-gray-600 text-white rounded text-xs">View</button>
                                                <button onClick={() => setEditItem(purchase)} className="px-2 py-1 bg-blue-600 text-white rounded text-xs">Edit</button>
                                                <button onClick={() => setDeleteItem(purchase)} className="px-2 py-1 bg-red-600 text-white rounded text-xs">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>
                )}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {purchases.map((purchase: any) => (
                    <div key={purchase._id} className="bg-white shadow rounded-lg p-4 space-y-2">
                        <div className="flex justify-between"><span className="font-semibold">Product:</span><span>{purchase.product?.name}</span></div>
                        <div className="flex justify-between"><span className="font-semibold">Category:</span><span>{purchase.purchaseType}</span></div>
                        <div className="flex justify-between"><span className="font-semibold">Lot:</span><span>{purchase.lot}</span></div>
                        <div className="flex justify-between"><span className="font-semibold">Unit:</span><span>{purchase.product.unit}</span></div>
                        <div className="flex justify-between"><span className="font-semibold">Purchase Price:</span><span>{purchase.product.purchasePrice}</span></div>
                        <div className="flex justify-between"><span className="font-semibold">Sales Price:</span><span>{purchase.product.salesPrice}</span></div>
                        <div className="flex justify-between"><span className="font-semibold">PurchaseQty:</span><span className={purchase.stockQty <= 5 ? "text-red-500 font-semibold" : ""}>{purchase.stockQty}</span></div>
                        <div className="flex justify-between"><span className="font-semibold">Status:</span>
                            <span className={`px-2 py-1 text-xs rounded ${purchase.isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                {purchase.isPaid ? "Paid" : "Unpaid"}
                            </span>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <button onClick={() => setViewItem(purchase)} className="px-2 py-1 bg-gray-600 text-white rounded text-xs flex-1">View</button>
                            <button onClick={() => setEditItem(purchase)} className="px-2 py-1 bg-blue-600 text-white rounded text-xs flex-1">Edit</button>
                            <button onClick={() => setDeleteItem(purchase)} className="px-2 py-1 bg-red-600 text-white rounded text-xs flex-1">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
                <span className="text-sm text-gray-600">Page {page} of {totalPages || 1}</span>
                <div className="flex gap-2">
                    <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-2 border rounded disabled:opacity-50 text-sm">Prev</button>
                    <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-2 border rounded disabled:opacity-50 text-sm">Next</button>
                </div>
            </div>

            {/* Modals */}
            {viewItem && <ViewModal item={viewItem} onClose={() => setViewItem(null)} />}
            {editItem && <EditModal item={editItem} onClose={() => setEditItem(null)} />}
            {deleteItem && <DeleteModal
                open={Boolean(deleteItem)}
                item={deleteItem}
                onClose={() => setDeleteItem(null)}
                onConfirm={() => handleDeleteConfirm(deleteItem._id)}
            />}
        </div>
    );

};

export default PurchaseOverviewTable;