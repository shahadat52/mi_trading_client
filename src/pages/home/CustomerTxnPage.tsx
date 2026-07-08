/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import TableSkeleton from '../../components/table/TableSkeleton';
import ErrorBoundary from '../../components/ErrorBoundary';
import { useForm, type FieldValues } from 'react-hook-form';
import SelectField from '../../components/form/SelectField';
import { customerTxnType } from '../../utils/transactionType';
import { toast } from 'react-toastify';
import { useCustomerTxnEntryMutation, useGetAllTxnByCustomerQuery, useGetCustomerByIdQuery, useSendDueSmsMutation, useSendTxnSmsMutation } from '../../redux/features/customer/customerApi';
import InputField from '../../components/form/InputFields';
import Modal from '../../components/Modal';
import EditCustomerTxn from './EditCustomerTxn';
import { paymentMethods } from '../../utils/paymentMethods';
import Profile from '../../components/profile/Profile';
import { customRound } from '../../utils/customRound';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaWhatsappSquare } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai';
import { sendSingleTxnWhatsAppMsg, sendWhatsAppMsg } from '../../utils/sendSMS';
import { banksName } from '../accounts/banksName';

const CustomerTxnPage = () => {
    const { id } = useParams();
    const [makeTxn, setMakeTxn] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTxn, setSelectedTxn] = useState(null)
    const [loading, setLoading] = useState(false)
    const [sendTxnSms] = useSendTxnSmsMutation();
    const [sendDueSms] = useSendDueSmsMutation();
    const { control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            paymentMethod: 'cash'
        }
    })
    const { data, isLoading, isError } = useGetAllTxnByCustomerQuery({ id });
    const { data: customer } = useGetCustomerByIdQuery(id);
    const [customerTxnEntry] = useCustomerTxnEntryMutation()
    const navigate = useNavigate();
    const paymentMethod = watch('paymentMethod');
    // const user = useAppSelector((state) => state?.auth?.auth?.user)

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Processing...");
        const transactionTime = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Dhaka' });
        data.date = transactionTime
        data.party = id
        data.partyModel = 'Customer'


        try {
            setLoading(true);

            const result = await customerTxnEntry(data);
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

    const handleSelectedTxn = (id: any) => {
        setSelectedTxn(id)
        setIsOpen(true)
    }

    const handleOpenMemo = (no: string) => {
        if (no.includes("MI(S)")) {
            navigate(`/invoice/${no}`)
        } else {
            return
        }
    };



    const transactions = data?.data
    const totalDebit = customRound(transactions?.filter((txn: any) => (txn.type === 'debit'))?.reduce((sum: number, txn: { amount: number }) => sum + (txn.amount || 0), 0))
    const totalCredit = customRound(transactions?.filter((txn: any) => (txn.type === 'credit'))?.reduce((sum: number, txn: { amount: number }) => sum + (txn.amount || 0), 0))
    const dueAmount = totalDebit - totalCredit || 0

    const customerData = customer?.data

    const handleSendTxnSMS = async (amount: number, balance: number, type: string) => {
        const isConfirm = confirm("SMS পাঠাতে চাচ্ছেন?")
        if (!isConfirm) {
            return
        }

        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await sendTxnSms({ phone: customerData?.phone, amount, balance, type });
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });

            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });
                setLoading(false);

            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });


        } finally {
        }

    }


    const handleSendDueSMS = async (due: number) => {
        const isConfirm = confirm("SMS পাঠাতে চাচ্ছেন?")
        if (!isConfirm) {
            return
        }

        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await sendDueSms({ phone: customerData?.phone, due });
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });

            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });
                setLoading(false);

            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });


        } finally {
        }

    }
    return (
        <div className=''>
            <div className='flex justify-around items-center'>
                <Profile person={customerData} />
                <div className="dropdown dropdown-left">
                    <div tabIndex={0} role="button" className="text-2xl cursor-pointer mr-4">
                        <BsThreeDotsVertical />
                    </div>

                    <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box w-44 p-2 shadow">
                        <li
                            onClick={() => sendWhatsAppMsg(customerData?.phone, dueAmount)}
                            className="bg-white text-white rounded m-1"
                        >
                            <p className='text-green-800 text-4xl'>
                                <FaWhatsappSquare /> <span className='text-lg'> Whatsapp</span>
                            </p>
                        </li>

                        <li
                            onClick={() => handleSendDueSMS(dueAmount)}
                            className="bg-white text-black rounded m-1"
                        >
                            <p className='text-gray-800 text-4xl'>
                                <AiFillMessage /><span className='text-lg'> Message</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex  items-center gap-4">
                <button
                    onClick={() => setMakeTxn(!makeTxn)} className='p-1 m-1 text-white bg-blue-600 rounded-xl'>Make Txn
                </button>
                <p>Due: {`${dueAmount} টাকা ${dueAmount < 0 ? 'দিব' : 'পাবো'} `}</p>
            </div>


            {/*Transaction entry section */}
            {
                makeTxn && <div className="sticky flex flex-col lg:flex-row gap-2 mb-2 p-1 ">
                    <form onSubmit={handleSubmit(onSubmit)} className="">

                        <div className='flex items-center gap-1'>
                            <SelectField
                                name="type"
                                label="no"
                                placeholder='লেনদেনের ধরণ'
                                options={customerTxnType}
                                control={control}
                                rules={{ required: "লেনদেনের ধরন নাই" }}
                            />

                            <div className='mt-[6px]'>
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

                        {
                            paymentMethod === 'bank' && (
                                <div className='mt-3'>
                                    <SelectField
                                        label="ব্যাংকের নাম"
                                        name="bankName"
                                        control={control}
                                        options={banksName}
                                        rules={{ required: "ব্যাংকের নাম নাই" }}
                                    />
                                </div>
                            )
                        }



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
            <div className="relative  bg-white rounded-xl shadow overflow-hidden mb-16">
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
                    <div className="overflow-x-auto h-[680px] ">
                        <table className="w-full text-xs">
                            <thead className="sticky top-0 bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Description</th>
                                    <th className="px-4 py-2 text-right">Debit</th>
                                    <th className="px-4 py-2 text-right">Credit</th>
                                    <th className="px-4 py-2 text-right">Balance</th>
                                    <th className="px-4 py-2 text-right"></th>
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
                                                {new Date(tx.date).toLocaleDateString()} <br />
                                                {new Date(tx.date).toLocaleTimeString()}
                                            </td>

                                            <td
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpenMemo(tx.description);
                                                }}
                                                className="px-4 py-2">
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

                                            <td className="px-2 py-2">
                                                <div className="flex items-center justify-center gap-1">
                                                    {/* WhatsApp Button */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            sendSingleTxnWhatsAppMsg(
                                                                customerData?.phone,
                                                                tx.type,
                                                                tx.amount,
                                                                tx?.balance
                                                            );
                                                        }}
                                                        className="group flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-700 transition-all duration-200 hover:bg-green-600 hover:text-white"
                                                        title="WhatsApp"
                                                    >
                                                        <FaWhatsappSquare className="text-lg" />
                                                    </button>

                                                    {/* SMS Button */}
                                                    <button
                                                        onClick={async (e) => {
                                                            e.stopPropagation();
                                                            handleSendTxnSMS(tx.amount, tx.balance, tx.type)
                                                        }}
                                                        className="group flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 transition-all duration-200 hover:bg-blue-600 hover:text-white"
                                                        title="SMS"
                                                    >
                                                        <AiFillMessage className="text-base" />
                                                    </button>
                                                </div>
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
                <EditCustomerTxn onClose={() => setIsOpen(false)} txn={selectedTxn} transactions={transactions} />
            </Modal>

        </div >
    );
};

export default CustomerTxnPage;