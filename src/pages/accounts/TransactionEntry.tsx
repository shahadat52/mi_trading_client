/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import InputField from '../../components/form/InputFields';
import SelectField from '../../components/form/SelectField';
import { useTransactionEntryMutation } from '../../redux/features/transaction/transactionApi';
import { transactionType } from '../../utils/transactionType';

const TransactionEntry = ({ account, onClose, }: { onClose: () => void, account: any }) => {
    const [loading, setLoading] = useState(false)
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            account: account?._id
        }
    });
    const [transactionEntry] = useTransactionEntryMutation()


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await transactionEntry(data);
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

    }
    return (
        <div className="m-4 ">
            <h1 className="text-2xl text-center font-bold mb-4 ">লেনদেনের তথ্য দিন  </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className=" grid gap-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                    <InputField
                        label={account?.bankName}
                        name="account"
                        control={control}
                        rules={{ required: "একাউন্ট নাই" }}
                        readOnly={true}
                    />

                    <SelectField
                        label="লেনদেনের ধরন"
                        name="type"
                        control={control}
                        options={transactionType}
                        rules={{ required: "লেনদেনের ধরন নাই" }}
                    />
                    <InputField
                        label="টাকার পরিমান"
                        name="amount"
                        type='number'
                        control={control}
                        rules={{ required: "টাকার পরিমান নাই" }}
                    />
                    <InputField
                        control={control}
                        name="ইস্যুর তারিখ"
                        type='datetime-local'
                        label="issueDate"
                        rules={{ required: "ইস্যুর তারিখ নাই" }}
                    />
                    <InputField
                        control={control}
                        label="পোস্টিং এর তারিখ"
                        type='datetime-local'
                        name="postingDate"
                        rules={{ required: "পোস্টিং এর তারিখ নাই" }}
                    />
                    <InputField
                        control={control}
                        label="মন্তব্য"
                        name="note"
                        rules={{ required: "মন্তব্য নাই" }}
                    />
                    <InputField
                        control={control}
                        label="লেনদেনের তারিখ"
                        name="date"
                        type='datetime-local'
                        rules={{ required: "লেনদেনের তারিখ নাই" }}
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
    );
};

export default TransactionEntry;