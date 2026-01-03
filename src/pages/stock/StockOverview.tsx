/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorBoundary from "../../components/ErrorBoundary";
import TableSkeleton from "../../components/table/TableSkeleton";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import StockTableBody from "./StockTableBody";
import { stockTableHeads } from "./stockTableHeads";

const StockOverview = () => {
    const { data, isLoading, isError } = useGetAllProductsQuery(undefined);
    const products = data?.data;
    const totalStock = data?.data?.map((product: any) => (product.stockQty * product.purchasePrice)).reduce((acc: number, val: number) => acc + val, 0);

    if (isLoading) {
        return <TableSkeleton row={10} />
    }

    if (isError) {
        return <ErrorBoundary />
    }
    return (
        <div>
            <div className=" overflow-x-auto">
                <h1 className="p-2 text-xl font-semibold">Total Stock Value: {totalStock}</h1>
                <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            {stockTableHeads?.map((head: string) => (
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
                        {
                            products?.length == 0 && <span className="text-red-500 font-bold" >Sorry, there is no Products</span>
                        }
                        {products?.map((product: any, idx: number) => (
                            <StockTableBody key={product._id} product={product} idx={idx} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockOverview;