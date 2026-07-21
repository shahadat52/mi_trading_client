import ErrorBoundary from '../../components/ErrorBoundary';
import TableSkeleton from '../../components/table/TableSkeleton';
import { useGetProductWiseSalesQuery } from '../../redux/features/cart/cartApi';

const SalesActivity = ({ startDate: dateFrom, endDate: dateTo }: any) => {
    const { data, isLoading, isError } = useGetProductWiseSalesQuery({ dateFrom, dateTo })
    const sales = data?.data || []

    isLoading && <p>
        <p>
            <TableSkeleton row={8} />
        </p>
    </p>

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
                    <div className="grid grid-cols-5 gap-2">
                        {
                            sales?.map((sale: any, idx: number) =>
                                <div
                                    key={idx}
                                    className={`min-h-[150px] border my-2 p-2 rounded-lg text-sm ${sale.salesHistory[0].commission >= 0 ? "bg-green-400" : "bg-white"
                                        }`}
                                >
                                    <div>
                                        <p>
                                            {idx + 1}) {sale?.productName} (
                                            {sale.salesHistory[0].commission >= 0 ? "কমিশন" : "নরমাল"})
                                        </p>

                                        <div className="text-xs">
                                            {sale.salesHistory.map((item: any, idx: number) => (
                                                <div key={idx}>
                                                    <p className="ml-1">
                                                        {item?.invoice} ({item.quantity}kg X {item.salePrice})
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>)
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesActivity;