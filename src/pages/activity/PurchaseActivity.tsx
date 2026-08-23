import { format } from "date-fns";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import ErrorBoundary from "../../components/ErrorBoundary";
import TableSkeleton from "../../components/table/TableSkeleton";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PurchaseActivity = ({ startDate, endDate }: any) => {
    const { data, isLoading, isError } = useGetAllProductsQuery({ startDate, endDate })
    const transactions = data?.data || []
    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Customer-Transaction-Report",
    });
    return (
        <div>
            <div className=" bg-white rounded-xl shadow overflow-hidden mb-16">
                {/* Loading State */}
                {isLoading && <TableSkeleton row={8} />}

                {/* Error State */}
                {isError && !isLoading && (
                    <ErrorBoundary message="Failed to load transactions. Please try again." />
                )}

                {/* Empty State */}
                {!isLoading && !isError && transactions?.length === 0 && (
                    <div className="py-10 text-center text-gray-500 text-sm">
                        No Purchases found.
                    </div>
                )}

                {/* Data Table */}
                {!isLoading && !isError && transactions?.length > 0 && (
                    <div ref={printRef} className="overflow-x-auto ">
                        <div className='flex justify-end mb-1'>
                            <button
                                onClick={handlePrint}
                                className="my-1 min-w-40 mb-[-23px] px-2 py-1 rounded bg-blue-600 text-white no-print"
                            >
                                Print Report
                            </button>
                        </div>
                        <div className='text-center'>
                            <h1 className='font-bold text-xl' >Purchase Reports</h1>
                            <p >From {format(startDate, 'dd-MM-yyyy')} To {format(endDate, 'dd-MM-yyyy')}</p>
                        </div>
                        <table className="w-full text-xs">
                            <thead className="sticky top-0 bg-gray-800 text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left">Product</th>
                                    <th className="px-4 py-2 text-left">Invoice</th>
                                    <th className="px-4 py-2 text-left">Lot</th>
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Description</th>
                                    <th className="px-4 py-2 text-right">Quantity</th>
                                    <th className="px-4 py-2 text-right">Price</th>
                                    <th className="px-4 py-2 text-right">Others</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions?.map((tx: any, idx: number) => {

                                    return (
                                        <tr

                                            key={tx?._id}
                                            className="border-t hover:bg-gray-50 transition"
                                        >
                                            <td className="px-2 border-[1px] py-1">
                                                {idx + 1})   {tx?.product}
                                            </td>
                                            <td className="px-2 border-[1px] py-1">
                                                {tx?.invoice}
                                            </td>
                                            <td className="px-2 border-[1px] py-1">
                                                {tx?.lot}
                                            </td>
                                            <td className="px-2 border-[1px] py-1">
                                                {format(new Date(tx?.createdAt), 'dd/MM/yyyy')} <br />
                                                {format(new Date(tx?.createdAt), 'hh:mm a')}
                                            </td>

                                            <td

                                                className="px-2 border-[1px] py-1">
                                                <p className="font-medium">
                                                    {tx?.note || tx?.referenceType}
                                                </p>
                                                <span className="text-xs ">
                                                    {tx?.referenceType}
                                                </span>
                                            </td>

                                            <td className="px-2 border-[1px] py-1 text-center ">
                                                {tx?.purchaseBosta} | {tx?.purchaseQty}
                                            </td>

                                            <td className="px-2 border-[1px] py-1 text-center ">
                                                {tx?.purchasePrice}
                                            </td>
                                            <td className="px-2 border-[1px] py-1 text-center ">
                                                {tx?.labour + tx?.commission + tx?.others}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PurchaseActivity;