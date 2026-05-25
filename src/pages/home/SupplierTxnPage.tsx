/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import SelectField from "../../components/form/SelectField";
import { customerTxnType } from "../../utils/transactionType";
import InputField from "../../components/form/InputFields";
import FileUploadField from "../../components/form/FileUploadField";
import TableSkeleton from "../../components/table/TableSkeleton";
import ErrorBoundary from "../../components/ErrorBoundary";
import Modal from "../../components/Modal";
import { useGetSpecificSupplierTxnQuery, useSupplierTxnEntryMutation } from "../../redux/features/supplierTxn/supplierTxnApi";
import EditSupplierTxn from "./EditSupplierTxn";
import { paymentMethods } from "../../utils/paymentMethods";
import Profile from "../../components/profile/Profile";
import { customRound } from "../../utils/customRound";

const SupplierTxnPage = () => {

    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false)
    const [makeTxn, setMakeTxn] = useState(false)
    const [selectedTxn, setSelectedTxn] = useState('')
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            paymentMethod: 'cash'
        }
    })
    const [supplierTxnEntry] = useSupplierTxnEntryMutation()
    // const navigate = useNavigate();
    // const user = useAppSelector((state) => state?.auth?.auth?.user)
    const { data, isLoading, isError, } = useGetSpecificSupplierTxnQuery({ id });

    const onSubmit = async (data: FieldValues) => {


        const toastId = toast.loading("Processing...");
        const transactionTime = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Dhaka' });
        data.date = transactionTime
        data.party = id
        data.partyModel = 'Supplier'
        try {
            setLoading(true);

            const result = await supplierTxnEntry(data);
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });

                reset();

            } else {
                toast.update(toastId, { render: `${(result as any)?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });
            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };


    const handleSelectedTxn = (id: string) => {
        setSelectedTxn(id)
        setIsOpen(true)

    }
    const transactions = data?.data
    const totalDebit = transactions?.filter((txn: any) => (txn.type === 'debit'))?.reduce((sum: number, txn: { amount: number }) => sum + (txn.amount || 0), 0)
    const totalCredit = transactions?.filter((txn: any) => (txn.type === 'credit'))?.reduce((sum: number, txn: { amount: number }) => sum + (txn.amount || 0), 0)
    const supplierData = transactions ? transactions[0]?.supplier[0] : {}
    const due = customRound(totalCredit - totalDebit || 0)
    return (
        <div className="mx-auto">
            <div>
                <Profile person={supplierData} />
            </div>
            <div className="flex  items-center gap-4">
                <button
                    onClick={() => setMakeTxn(!makeTxn)} className='p-1 m-1 text-white bg-blue-600 rounded-xl'>Make Txn
                </button>
                <p>Due: {`${due} টাকা ${due < 0 ? 'পাবো' : 'দিব'} `}</p>
            </div>

            {/*Transaction entry section */}
            {
                makeTxn && <div className="flex flex-col lg:flex-row gap-2 mb-2 p-1 ">
                    <form onSubmit={handleSubmit(onSubmit)} className="">

                        <div className='flex items-center gap-2'>
                            <SelectField
                                name="type"
                                label="no"
                                placeholder='লেনদেনের ধরণ'
                                options={customerTxnType}
                                control={control}
                                rules={{ required: "লেনদেনের ধরন নাই" }}
                            />

                            <div className='mt-[14px]'>
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
                            name="description"
                            label=""
                            placeholder='বিবরণ'
                            type='text'
                            control={control}
                        />

                        <SelectField
                            name="paymentMethod"
                            label=""
                            placeholder="পেমেন্ট মেথড"
                            control={control}
                            options={paymentMethods}
                            rules={{ required: "পেমেন্ট মেথড নাই" }}
                        />



                        {/* image and delete */}
                        <div className='flex justify-between mx-4 items-center'>
                            <FileUploadField control={control} name='img' label='ছবি' />
                        </div>
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
                                            onClick={() => handleSelectedTxn(tx._id)}
                                            key={tx._id}
                                            className="border-t hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-2">
                                                {new Date(tx.date).toLocaleDateString()} <br />
                                                {new Date(tx.date).toLocaleTimeString()}
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

                                            <td className="px-4 py-2 text-right ">
                                                {customRound(tx?.balance)}
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
                <EditSupplierTxn onClose={() => setIsOpen(false)} id={selectedTxn} transactions={transactions} />
            </Modal>
        </div>
    );
};

export default SupplierTxnPage;