/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSpecificBrokerTxnQuery, useUpdateBrokerTxnMutation } from '../../redux/features/broker/brokerApi';
import TableSkeleton from '../../components/table/TableSkeleton';
import ErrorBoundary from '../../components/ErrorBoundary';
import Modal from '../../components/Modal';
import { useState } from 'react';
import EditTxnForm from './EditTxnForm';
import { customRound } from '../../utils/customRound';
import { format } from 'date-fns';

const BrokerTxnTable = ({ id }: any) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTxn, setSelectedTxn] = useState('')
    const [updateTxn] = useUpdateBrokerTxnMutation()
    const { data, isLoading, isError } = useGetSpecificBrokerTxnQuery({ id });
    const transactions = data?.data?.transactions || [];

    const totalDebit: number = customRound(transactions?.filter((txn: any) => (txn.type === 'debit'))?.reduce((sum: number, txn: { amount: number }) => sum + (txn.amount || 0), 0))
    const totalCredit: number = customRound(transactions?.filter((txn: any) => (txn.type === 'credit'))?.reduce((sum: number, txn: { amount: number }) => sum + (txn.amount || 0), 0))

    const handleSelectedTxn = (id: string) => {
        setSelectedTxn(id)
        setIsOpen(true)
    }

    return (
        <div>

            <div className='m-2'>
                <h2 className='text-lg'>Total Credit: {totalCredit}</h2>
                <h2 className='text-lg'>Total Debit: {totalDebit}</h2> <hr />
                <h2 className='text-lg ml-4'>Balance: {totalCredit - totalDebit}</h2>
            </div>
            {/* Table Section */}
            <div className="relative  bg-white rounded-xl shadow overflow-hidden mb-40">
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
                    <div className="overflow-x-auto h-[520px] ">
                        <table className="w-full text-xs">
                            <thead className="sticky top-0 bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Description</th>
                                    <th className="px-4 py-2 text-right">Debit</th>
                                    <th className="px-4 py-2 text-right">Credit</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions?.map((tx: any) => {

                                    return (
                                        <tr
                                            onClick={() => handleSelectedTxn(tx._id)}
                                            key={tx._id}
                                            className="border-t hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-2">
                                                {format(new Date(tx?.createdAt), "dd/MM/yyyy")}  <br />
                                                {format(new Date(tx?.createdAt), "hh:mm a")}
                                            </td>

                                            <td className="px-4 py-2">
                                                <p className="font-medium">
                                                    {tx.description || tx.referenceType}
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


                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* ================= Fixed Total ================= */}
            <div className="fixed bottom-[60px] left-0 w-full  px-3">
                <div className="mx-auto  bg-[#e5efd5]   py-4 text-sm px-2">
                    <div className="grid  grid-cols-3 justify-between">
                        <span className="col-span-2 text-red-600 font-medium">
                            মোট
                        </span>
                        <div className='col-span-1 flex justify-between'>
                            <span className="font-semibold text-red-600">  ৳ {totalDebit}</span>
                            <span className="font-semibold text-green-600"> ৳ {totalCredit}</span>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <EditTxnForm onClose={() => setIsOpen(false)} id={selectedTxn} updateMutation={updateTxn} />
            </Modal>
        </div>
    );
};

export default BrokerTxnTable;