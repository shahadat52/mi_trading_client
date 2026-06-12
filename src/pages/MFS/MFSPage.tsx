import { useParams } from 'react-router';
import { useGetMfsTxnByHeadQuery, useUpdateMfsTxnMutation } from '../../redux/features/mfs/mfsApi';
import ErrorBoundary from '../../components/ErrorBoundary';
import TableSkeleton from '../../components/table/TableSkeleton';
import { customRound } from '../../utils/customRound';
import { useState } from 'react';
import Modal from '../../components/Modal';
import EditTransaction from './EditTransaction';
import { format } from 'date-fns';

const MFSPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTxn, setSelectedTxn] = useState('')
    const { id } = useParams()
    const [updateTxn] = useUpdateMfsTxnMutation()
    const { data, isLoading, isError, } = useGetMfsTxnByHeadQuery({ head: id })
    const transactions = data?.data || []

    const totalDebit: number = customRound(transactions?.filter((txn: any) => (txn.type === 'debit'))?.reduce((sum: number, txn: { amount: number }) => sum + (txn.amount || 0), 0))
    const totalCredit: number = customRound(transactions?.filter((txn: any) => (txn.type === 'credit'))?.reduce((sum: number, txn: { amount: number }) => sum + (txn.amount || 0), 0))



    const handleSelectedTxn = (id: string) => {
        setSelectedTxn(id)
        setIsOpen(true)
    }
    return (
        <div>
            <h1 className='text-center text-2xl font-bold uppercase'>{id} Transaction Page</h1>
            <div className='m-2'>
                <h2 className='text-lg'>Total Credit: {totalCredit}</h2>
                <h2 className='text-lg'>Total Debit: {totalDebit}</h2> <hr />
                <h2 className='text-lg ml-4'>Balance: {transactions[0]?.runningBalance}</h2>
            </div>
            <div>
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
                                        <th className="px-4 py-2 text-right">Balance</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {transactions?.map((tx: any) => {

                                        return (
                                            <tr
                                                onClick={() => handleSelectedTxn(tx)}
                                                key={tx._id}
                                                className="border-t hover:bg-gray-50 transition"
                                            >
                                                <td className="px-4 py-2">
                                                    {format((tx.createdAt), "dd/MM/yy")} <br />
                                                    {format((tx.createdAt), "hh:mm")}
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
                                                <td className="px-4 py-2 text-right">
                                                    {tx?.runningBalance}
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
                        <div className="grid  grid-cols-5 justify-between">
                            <span className="col-span-2 text-red-600 font-medium">
                                মোট
                            </span>
                            <div className='col-span-2 flex justify-between'>
                                <span className="font-semibold text-red-600"> দিলামঃ ৳ {totalDebit}</span>
                                <span className="font-semibold text-green-600"> পেলামঃ ৳ {totalCredit}</span>
                            </div>
                            <div className='col-span-1 flex justify-between'>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <EditTransaction onClose={() => setIsOpen(false)} selectedTxn={selectedTxn} updateMutation={updateTxn} />
                </Modal>
            </div>

        </div>
    );
};

export default MFSPage;