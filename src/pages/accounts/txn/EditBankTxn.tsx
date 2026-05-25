/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDeleteBankTxnMutation, useUpdateBankTxnMutation } from '../../../redux/features/bankTransaction/bankTransactionApi';
import SelectField from '../../../components/form/SelectField';
import InputField from '../../../components/form/InputFields';
import { bankTxnType } from '../../../utils/transactionType';

const EditBankTxn = ({ onClose, txn, transactions }: { onClose: () => void, txn: any, transactions: any }) => {

    console.log(transactions)
    const [loading, setLoading] = useState(false)
    const { handleSubmit, control, reset } = useForm();
    const [updateTxn] = useUpdateBankTxnMutation()
    const [deleteTxn] = useDeleteBankTxnMutation()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await updateTxn({ data, id: txn._id });
            console.log({ data, result })
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                reset();
                setLoading(false);
                onClose();

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

    };

    const handleDelete = async () => {
        console.log(transactions)
        const isConfirm = confirm("আপনি কি নিশ্চিত! ডিলিট করেই দেবেন?")
        if (!isConfirm || transactions?.transactions?.length < 2) {
            return
        }
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await deleteTxn(txn._id);
            console.log(result)
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });

            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });
                setLoading(false);

            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });


        } finally {
            onClose();
        }

    };

    return (
        <div className="m-4 ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" grid gap-4 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1"
            >

                <div className='flex items-center gap-2'>
                    <SelectField
                        name="type"
                        label="no"
                        placeholder={txn?.type}
                        options={bankTxnType}
                        control={control}

                    />

                    <div className='mt-[14px]'>
                        <InputField
                            name="amount"
                            label=""
                            placeholder={txn?.amount}
                            type='number'
                            control={control}

                        />
                    </div>


                </div>
                <InputField
                    name="note"
                    label=""
                    placeholder={txn?.note}
                    type='text'
                    control={control}
                />

                <div className='flex justify-between items-center gap-3'>

                    <button onClick={handleDelete} type='button' className="btn btn-info  mt-2">ডিলিট করুন </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary  mt-2"
                    >
                        {loading ? (
                            <span className="loading loading-dots loading-lg"></span>
                        ) : (
                            "আপডেট করুন"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBankTxn;