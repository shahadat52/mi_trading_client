import { useParams } from 'react-router';
import { useGetMfsTxnByHeadQuery, useMfsTxnEntryMutation, useUpdateMfsTxnMutation } from '../../redux/features/mfs/mfsApi';
import ErrorBoundary from '../../components/ErrorBoundary';
import TableSkeleton from '../../components/table/TableSkeleton';
import { customRound } from '../../utils/customRound';
import { useState } from 'react';
import Modal from '../../components/Modal';
import EditTransaction from './EditTransaction';
import { format } from 'date-fns';
import { useForm, type FieldValues } from 'react-hook-form';
import SelectField from '../../components/form/SelectField';
import InputField from '../../components/form/InputFields';
import { toast } from 'react-toastify';
import { bankingSource, mfsTxnType } from '../../utils/transactionType';

const MFSPage = () => {
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [makeTxn, setMakeTxn] = useState(false)
    const [selectedTxn, setSelectedTxn] = useState('')
    const { id } = useParams();
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            source: 'others'
        }
    })
    const [updateTxn] = useUpdateMfsTxnMutation();
    const [mfsTxnEntry] = useMfsTxnEntryMutation()
    const { data, isLoading, isError, } = useGetMfsTxnByHeadQuery({ head: id })
    const transactions = data?.data || []

    const totalDebit: number = customRound(transactions?.filter((txn: any) => (txn.type === 'debit'))?.reduce((sum: number, txn: { amount: number }) => sum + (txn.amount || 0), 0))
    const totalCredit: number = customRound(transactions?.filter((txn: any) => (txn.type === 'credit'))?.reduce((sum: number, txn: { amount: number }) => sum + (txn.amount || 0), 0))



    const handleSelectedTxn = (id: string) => {
        setSelectedTxn(id)
        setIsOpen(true)
    }

    const onSubmit = async (data: FieldValues) => {
        setLoading(true)
        const toastId = toast.loading("Processing...");
        data.head = id
        try {

            const result = await mfsTxnEntry(data);
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                setLoading(false)
                reset();

            } else {
                toast.update(toastId, { render: `${(result as any)?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });
                setLoading(false)
            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });
        } finally {
            setLoading(false)
        }
    };

    return (
        <div>
            <h1 className='text-center text-2xl font-bold uppercase'>{id} Transaction Page</h1>
            <button
                onClick={() => setMakeTxn(!makeTxn)} className='p-1 m-1 text-white bg-blue-600 rounded-xl'>Make Txn
            </button>
            <div>
                {
                    makeTxn && <div className="sticky flex flex-col lg:flex-row gap-2 mb-2 p-1 ">
                        <form onSubmit={handleSubmit(onSubmit)} className="">

                            <div className='flex items-center gap-1'>
                                <SelectField
                                    name="type"
                                    label="no"
                                    placeholder='লেনদেনের ধরণ'
                                    options={mfsTxnType}
                                    control={control}
                                    rules={{ required: "লেনদেনের ধরন নাই" }}
                                />

                                <div className='mt-4'>
                                    <InputField

                                        name="amount"
                                        label=""
                                        placeholder='কত টাকা *'
                                        type='number'
                                        control={control}
                                        rules={{ required: "টাকার পরিমান নাই" }}
                                    />
                                </div>


                            </div>
                            <InputField
                                name="note"
                                label=""
                                placeholder='বিবরণ'
                                type='text'
                                control={control}
                            />

                            <SelectField
                                name="source"
                                label="no"
                                placeholder='সোর্স'
                                options={bankingSource}
                                control={control}
                                rules={{ required: "সোর্স" }}
                            />



                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary w-full mt-2"
                            >
                                {loading ? (
                                    <span className="loading loading-dots loading-lg"></span>
                                ) : (
                                    "লেনদেন করুন"
                                )}
                            </button>
                        </form>
                    </div>
                }

            </div>

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
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <EditTransaction selectedTxn={selectedTxn} onClose={() => setIsOpen(false)} updateMutation={updateTxn} />
                </Modal>
            </div>

        </div>
    );
};

export default MFSPage;