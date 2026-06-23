/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import TableSkeleton from "../../components/table/TableSkeleton";
import {
    useDeleteProductMutation,
    useGetProductsStockQuery,
} from "../../redux/features/product/productApi";
import { EditModal } from "../commissionSales/modal/EditModal";
import StockTableBody from "./StockTableBody";
import { stockTableHeads } from "./stockTableHeads";

const StockPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [editItem, setEditItem] = useState(null);

    const [deleteProduct] = useDeleteProductMutation();

    const { data, isLoading, isError } = useGetProductsStockQuery({
        searchTerm,
    });

    const products = data?.data;

    const totalStock =
        data?.data?.reduce(
            (acc: number, val: any) => acc + (val?.totalAmount || 0),
            0
        ) || 0;

    if (isLoading) {
        return <TableSkeleton row={10} />;
    }

    if (isError) {
        return <ErrorBoundary />;
    }

    return (
        <div className="w-full px-2 sm:px-4">
            {/* Search */}
            <div className="my-3">
                <input
                    type="text"
                    placeholder="নাম বা SKU দিয়ে সার্চ করুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
            </div>

            {/* Stock Summary */}
            <div className="mb-4 rounded-lg bg-white p-3 shadow-sm border">
                <h1 className="text-base sm:text-lg md:text-xl font-semibold">
                    Total Stock Value: {totalStock.toLocaleString()}
                </h1>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white mb-18">
                <table className="w-full min-w-[500px] lg:text-lg md:text-lg sm:text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            {stockTableHeads?.map((head: string) => (
                                <th
                                    key={head}
                                    className="text-center border py-2 px-1  font-semibold"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {products?.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={stockTableHeads.length}
                                    className="py-6 text-center text-red-500 font-medium"
                                >
                                    Sorry, there is no Products
                                </td>
                            </tr>
                        ) : (
                            products?.map((product: any, idx: number) => (
                                <StockTableBody
                                    key={product._id}
                                    product={product}
                                    idx={idx}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {editItem && (
                <EditModal
                    item={editItem}
                    onClose={() => setEditItem(null)}
                    editFunction={deleteProduct}
                />
            )}
        </div>
    );
};

export default StockPage;