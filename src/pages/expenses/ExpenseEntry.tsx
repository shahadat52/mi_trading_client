/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import SelectField from "../../components/form/SelectField";
import InputField from "../../components/form/InputFields";
import { expenseSources } from "./expensesSources";
import { useAddExpenseMutation } from "../../redux/features/expense/expenseApi";

const ExpenseEntry = ({ onClose }: { onClose: () => void }) => {
    const [loading, setLoading] = useState(false)
    const { handleSubmit, control, reset } = useForm();

    const [addExpense] = useAddExpenseMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await addExpense(data);
            console.log(result)
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
                    name="expenseCategory"
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
                    name="description"
                    control={control}
                    rules={{ required: "বিবরণ নাই" }}
                />
                <InputField
                    control={control}
                    name="date"
                    label="তারিখ ও সময়"
                    type="datetime-local"
                    rules={{ required: "তারিখ ও সময় দেওয়া বাধ্যতামূলক" }}
                />
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