import { format } from 'date-fns';
import ErrorBoundary from '../../components/ErrorBoundary';
import TableSkeleton from '../../components/table/TableSkeleton';
import { useGetAllBankTxnsQuery } from '../../redux/features/bankTransaction/bankTransactionApi';

const BankTxnActivity = ({ startDate: dateFrom, endDate: dateTo }: any) => {
    const { data, isLoading, isError } = useGetAllBankTxnsQuery({ dateFrom, dateTo })
    const transactions = data?.data || [];
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
                        No transactions found for Bank.
                    </div>
                )}

                {/* Data Table */}
                {!isLoading && !isError && transactions?.length > 0 && (
                    <div className="overflow-x-auto h-[680px] ">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="px-4 py-2 text-left">Bank</th>
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Description</th>
                                    <th className="px-4 py-2 text-right">Debit</th>
                                    <th className="px-4 py-2 text-right">Credit</th>
                                    <th className="px-4 py-2 text-right"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions?.map((tx: any) => {

                                    return (
                                        <tr

                                            key={tx?._id}
                                            className="border-t hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-2">

                                                {tx?.bankName}
                                            </td>
                                            <td className="px-4 py-2">
                                                {format(new Date(tx?.createdAt), 'dd/MM/yyyy')} <br />
                                                {format(new Date(tx?.createdAt), 'hh:mm a')}
                                            </td>

                                            <td

                                                className="px-4 py-2">
                                                <p className="font-medium">
                                                    {tx?.note || tx?.referenceType}
                                                </p>
                                                <span className="text-xs text-gray-400">
                                                    {tx?.referenceType}
                                                </span>
                                            </td>

                                            <td className="px-4 py-2 text-right text-red-600">
                                                {tx?.type === 'debit' ? `৳ ${tx?.amount}` : "-"}
                                            </td>

                                            <td className="px-4 py-2 text-right text-green-600">
                                                {tx?.type === 'credit' ? `৳ ${tx?.amount}` : "-"}
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


export default BankTxnActivity;