/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useGetAllTransactionQuery } from '../../redux/features/transaction/transactionApi';
import { useParams } from 'react-router';
import TableSkeleton from '../../components/table/TableSkeleton';
import ErrorBoundary from '../../components/ErrorBoundary';

const CustomerTxnPage = () => {
    const { id } = useParams();

    const [search, setSearch] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const {
        data,
        isLoading,
        isError,
    } = useGetAllTransactionQuery({
        search,
        dateFrom,
        dateTo,
        id,
    });
    const transactions = data?.data
    console.log(transactions)
    return (
        <div>
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by destination, via, description..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded px-3 py-2 w-full text-sm"
                />

                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                    <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className="border rounded px-3 py-2 w-full text-sm"
                    />
                    <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        className="border rounded px-3 py-2 w-full text-sm"
                    />
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                {/* Loading State */}
                {isLoading && <TableSkeleton row={8} />}

                {/* Error State */}
                {isError && !isLoading && (
                    <ErrorBoundary message="Failed to load transactions. Please try again." />
                )}

                {/* Empty State */}
                {!isLoading && !isError && transactions?.length === 0 && (
                    <div className="py-10 text-center text-gray-500 text-sm">
                        No transactions found for the account.
                    </div>
                )}

                {/* Data Table */}
                {!isLoading && !isError && transactions?.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Description</th>
                                    <th className="px-4 py-2 text-right">Debit</th>
                                    <th className="px-4 py-2 text-right">Credit</th>
                                    <th className="px-4 py-2 text-right">Balance</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions?.map((tx: any) => {

                                    return (
                                        <tr
                                            key={tx._id}
                                            className="border-t hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-2">
                                                {new Date(tx.date).toLocaleDateString()} <br />
                                                {new Date(tx.date).toLocaleTimeString()}
                                            </td>

                                            <td className="px-4 py-2">
                                                <p className="font-medium">
                                                    {tx.note || tx.referenceType}
                                                </p>
                                                <span className="text-xs text-gray-400">
                                                    {tx.referenceType}
                                                </span>
                                            </td>

                                            <td className="px-4 py-2 text-right text-red-600">
                                                {tx.type === 'debit' ? `৳ ${tx.amount}` : "-"}
                                            </td>

                                            <td className="px-4 py-2 text-right text-green-600">
                                                {tx.type === 'credit' ? `৳ ${tx.amount}` : "-"}
                                            </td>

                                            <td className="px-4 py-2 text-right font-semibold">
                                                ৳ {tx.runningBalance}
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

export default CustomerTxnPage;