import { useState } from "react";
import { useBankTxnEntryMutation, useGetBankWiseTxnQuery } from "../../../redux/features/bankTransaction/bankTransactionApi";
import { useParams } from "react-router";
import { LIMIT_OPTIONS } from "../../../utils/options";
import TableSkeleton from "../../../components/table/TableSkeleton";
import ErrorBoundary from "../../../components/ErrorBoundary";
import { format } from "date-fns";
import SelectField from "../../../components/form/SelectField";
import { bankTxnType } from "../../../utils/transactionType";
import InputField from "../../../components/form/InputFields";
import { useForm, type FieldValues } from "react-hook-form";
import "@daypicker/react/style.css";
import Modal from "../../../components/Modal";
import EditBankTxn from "./EditBankTxn";
import { toast } from "react-toastify";


const BankTxnSummary = () => {
    const [makeTxn, setMakeTxn] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTxn, setSelectedTxn] = useState(null)
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(20)
    const [bankTxnEntry] = useBankTxnEntryMutation();

    const { id } = useParams();
    const { control, handleSubmit, reset } = useForm()
    const { data, isLoading, isError } = useGetBankWiseTxnQuery({ bankName: id, limit })
    const transactions = data?.data || [];

    const handleSelectedTxn = (id: any) => {
        setSelectedTxn(id)
        setIsOpen(true)
    }
    const onSubmit = async (data: FieldValues) => {
        const txnData = {
            ...data,
            bankName: id,

        }
        console.log(txnData)

        setLoading(true);
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await bankTxnEntry(txnData);

            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                reset();
                setLoading(false);

            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });
                setLoading(false);
            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });
            setLoading(false);
        } finally {
            // reset()
            setLoading(false);
        }

    }

    return (
        <div>
            {/* Filters */}
            <div className=" mb-2">
                <h1 className="m-2 text-lg font-bold">{id} Bank    (Balance: {transactions[0]?.totalAmount})</h1>

                <div className="">
                    <div className="flex  items-center gap-4">
                        <button
                            onClick={() => setMakeTxn(!makeTxn)} className='p-1 m-1 text-white bg-blue-600 rounded-xl'>Make Txn
                        </button>
                    </div>


                    {/*Transaction entry section */}
                    {
                        makeTxn && <div className="sticky flex flex-col lg:flex-row gap-2 mb-2 p-1 ">
                            <form onSubmit={handleSubmit(onSubmit)} className="">

                                <div className='flex items-center gap-3'>
                                    <SelectField
                                        name="type"
                                        label="no"
                                        placeholder='লেনদেনের ধরণ'
                                        options={bankTxnType}
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
                                    name="note"
                                    label=""
                                    placeholder='নোট'
                                    type='text'
                                    control={control}
                                />
                                <div className=" ">


                                    <InputField
                                        control={control}
                                        label="পোস্টিং এর তারিখ"
                                        type='datetime-local'
                                        name="postingDate"
                                        rules={{ required: "পোস্টিং এর তারিখ নাই" }}
                                    />
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
                </div>
                <div className="flex flex-col">
                    <label > Limit</label>
                    <select
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className=" sm:w-full lg:w-1/3 select my-2"
                    >
                        {
                            LIMIT_OPTIONS?.map((opt: any) => (
                                <option key={opt.value} value={opt.value} className="border m-1 text-xs">
                                    {opt.label}
                                </option>
                            ))
                        }
                    </select>
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
                    <div className="overflow-x-auto overflow-auto mb-20">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="px-[6px] py-2 text-left">Date</th>
                                    <th className="px-[6px] py-2 text-left">Description</th>
                                    <th className="px-[6px] py-2 text-right">Status</th>
                                    <th className="px-[6px] py-2 text-right">Debit</th>
                                    <th className="px-[6px] py-2 text-right">Credit</th>
                                    <th className="px-[6px] py-2 text-right">Balance</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions[0]?.transactions?.map((tx: any) => {

                                    return (
                                        <tr
                                            onClick={() => handleSelectedTxn(tx)}
                                            key={tx._id}
                                            className="text-[8px] border-t hover:bg-gray-50 transition"
                                        >
                                            <td className=" px-1 py-2">
                                                {`I:${format(new Date(tx.issueDate), "dd/MM/yy")}`} <br />
                                                {`P:${format(new Date(tx.postingDate), "dd/MM/yy")}`}
                                            </td>

                                            <td className="px-1 py-2">
                                                <p className="font-medium">
                                                    {tx.note || tx.referenceType}({tx?.party?.name})
                                                </p>
                                                <span className="text-xs text-gray-400">
                                                    {tx.referenceType}
                                                </span>
                                            </td>

                                            <td className="px-1 py-2 text-right ">
                                                {tx.status}
                                            </td>

                                            <td className="px-1 py-2 text-right text-red-600">
                                                {tx.type === 'debit' ? `৳ ${tx.amount}` : "-"}
                                            </td>

                                            <td className="px-1 py-2 text-right text-green-600">
                                                {tx.type === 'credit' ? `৳ ${tx.amount}` : "-"}
                                            </td>

                                            <td className="px-1 py-2 text-right font-semibold">
                                                ৳ {tx.balance}
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
                <EditBankTxn onClose={() => setIsOpen(false)} txn={selectedTxn} transactions={transactions} />
            </Modal>
        </div>
    );
};

export default BankTxnSummary;