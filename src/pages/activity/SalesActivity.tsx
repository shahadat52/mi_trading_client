import { useRef } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';
import TableSkeleton from '../../components/table/TableSkeleton';
import { useGetProductWiseSalesQuery } from '../../redux/features/cart/cartApi';
import { useReactToPrint } from 'react-to-print';

const SalesActivity = ({ startDate: dateFrom, endDate: dateTo }: any) => {
    const { data, isLoading, isError } = useGetProductWiseSalesQuery({ dateFrom, dateTo })
    const sales = data?.data || []
    const totalBag = sales?.reduce(
        (total: any, obj: any) =>
            total + obj.salesHistory?.reduce((sum: any, item: any) => sum + Number(item.bosta || 0), 0),
        0
    );

    isLoading && <p>
        <p>
            <TableSkeleton row={8} />
        </p>
    </p>

    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Customer-Transaction-Report",
    });

    return (

        <div>
            {isLoading && <TableSkeleton row={8} />}

            {/* Error State */}
            {isError && !isLoading && (
                <ErrorBoundary message="Failed to load transactions. Please try again." />
            )}

            {/* Empty State */}
            {!isLoading && !isError && sales?.length === 0 && (
                <div className="py-10 text-center text-gray-500 text-sm">
                    No Sales found
                </div>
            )}

            {/* Data Table */}
            {!isLoading && !isError && sales?.length > 0 && (


                <div className='overflow-x-auto h-[680px] mb-16'>
                    <div className='flex justify-end'>
                        <button
                            onClick={handlePrint}
                            className="my-1 min-w-40 mb-[-23px] px-2 py-1 rounded bg-blue-600 text-white no-print"
                        >
                            Print Report
                        </button>
                    </div>
                    <div
                        ref={printRef}>
                        <div className='text-center'>
                            <h1 className='font-bold text-xl' >Sales Reports</h1>
                            <p >From {dateFrom} to {dateTo}</p>
                            <p className='text-xl font-bold' >মোট {totalBag} টালি</p>
                        </div>
                        <div
                            className="grid grid-cols-4 gap-2">

                            {
                                sales?.map((sale: any, idx: number) =>
                                    <div
                                        key={idx}
                                        className={`min-h-[150px] border my-2 p-2 rounded-lg text-sm ${sale.salesHistory[0].commission >= 0 ? "bg-green-400" : "bg-white"
                                            }`}
                                    >
                                        <div>
                                            <p className='font-bold text-red-600 text-center'>
                                                {
                                                    sale?.salesHistory?.reduce((sum: any, item: any) => sum + Number(item.bosta || 0), 0)
                                                }: টালি
                                            </p>
                                            <p>

                                                {idx + 1}) {sale?._id}
                                            </p>

                                            <div className="text-[11px]">

                                                {sale.salesHistory.map((item: any, idx: number) => (
                                                    <div key={idx}>
                                                        <p className="ml-1">
                                                            {idx + 1}) No-{item?.invoice.split('-')[1]} ({item.bosta}|{item.quantity}kg X {item.salePrice}/-)
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>)
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesActivity;