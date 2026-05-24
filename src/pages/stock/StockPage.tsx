/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import TableSkeleton from "../../components/table/TableSkeleton";
import { useDeleteProductMutation, useGetProductsStockQuery } from "../../redux/features/product/productApi";
import { EditModal } from "../commissionSales/modal/EditModal";
import StockTableBody from "./StockTableBody";
import { stockTableHeads } from "./stockTableHeads";

const StockPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [editItem, setEditItem] = useState(null)
    const [deleteProduct] = useDeleteProductMutation()
    const { data, isLoading, isError } = useGetProductsStockQuery({ searchTerm });
    const products = data?.data;
    const totalStock = data?.data?.reduce((acc: number, val: any) => acc + val?.totalAmount, 0);

    if (isLoading) {
        return <TableSkeleton row={10} />
    }

    if (isError) {
        return <ErrorBoundary />
    }
    return (
        <div>
            <div className="m-2">
                <input
                    type="text"
                    placeholder="নাম বা SKU দিয়ে সার্চ করুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
            </div>
            <div className="">
                <h1 className="p-2 text-xl font-semibold">Total Stock Value: {totalStock}</h1>
                <table className="max-w-screen mx-auto rounded  border-gray-300 text-sm mb-24">
                    <thead className="bg-gray-100 rounded">
                        <tr className="rounded">
                            {stockTableHeads?.map((head: string) => (
                                <th
                                    key={head}
                                    className="px-1 py-1 border whitespace-nowrap text-left"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            products?.length == 0 && <span className="text-red-500 font-medium" >Sorry, there is no Products</span>
                        }
                        {products?.map((product: any, idx: number) => (
                            <StockTableBody key={product._id} product={product} idx={idx} />
                        ))}
                    </tbody>
                </table>
            </div>

            {editItem && <EditModal item={editItem} onClose={() => setEditItem(null)} editFunction={deleteProduct} />}
        </div>
    );
};

export default StockPage;