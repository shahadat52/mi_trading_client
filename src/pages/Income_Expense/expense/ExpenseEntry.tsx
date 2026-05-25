/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import SelectField from "../../../components/form/SelectField";
import InputField from "../../../components/form/InputFields";
import { useGetAllSectorsQuery, useTxnEntryMutation } from "../../../redux/features/inExTxn/inExTxnApi";
import { paymentMethods } from "../../../utils/paymentMethods";
import { banksName } from "../../accounts/banksName";

const ExpenseEntry = ({ onClose }: { onClose: () => void }) => {
    const [loading, setLoading] = useState(false)
    const { handleSubmit, control, reset, watch } = useForm();
    const paymentMethod = watch('paymentMethod')

    const { data: sectorData } = useGetAllSectorsQuery({ head: 'expense' });
    const expenseSources = sectorData?.data || [];

    const [addExpense] = useTxnEntryMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        data.head = 'expense'
        data.type = 'debit'
        setLoading(true);
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await addExpense(data);
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
            <h1 className="text-2xl text-center font-bold mb-4 ">আপনার ব্যয় যোগ করূন </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" grid gap-4 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1"
            >


                <SelectField
                    label="ব্যয়ের উৎস"
                    name="category"
                    control={control}
                    options={expenseSources}
                    rules={{ required: "ব্যয়ের উৎস নাই" }}
                />
                <InputField
                    label="পরিমাণ(টাকা) "
                    name="amount"
                    control={control}
                    rules={{ required: "পরিমাণ নাই" }}
                />
                <InputField
                    label="বিবরণ"
                    name="note"
                    control={control}
                    rules={{ required: "বিবরণ নাই" }}
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
                    paymentMethod === 'bank' &&
                    <div className=" grid gap-4 rounded-lg grid-cols-1 p-3 border border-black m-3">
                        <SelectField
                            label=""
                            name="bankName"
                            placeholder="ব্যাংকের নাম"
                            control={control}
                            options={banksName}
                            rules={{ required: "ব্যাংকের নাম নাই" }}
                        />

                        <InputField
                            control={control}
                            name="issueDate"
                            type='datetime-local'
                            label="ইস্যুর তারিখ"
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
                        />
                    </div>
                }
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full mt-2"
                >
                    {loading ? (
                        <span className="loading loading-dots loading-lg"></span>
                    ) : (
                        "ব্যয় এন্টি করুন"
                    )}
                </button>
            </form>
        </div>
    );
};

export default ExpenseEntry;