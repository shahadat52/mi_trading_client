/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import InputField from "../../components/form/InputFields";
import { useState } from "react";
import SelectField from "../../components/form/SelectField";
import { incomeSources } from "./incomeSources";
import { useAddIncomeMutation } from "../../redux/features/income/incomeApi";
import { toast } from "react-toastify";

const IncomeEntry = ({ onClose }: { onClose: () => void }) => {
    const [loading, setLoading] = useState(false)
    const { handleSubmit, control, reset } = useForm();

    const [addIncome] = useAddIncomeMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await addIncome(data);
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                reset();
                setLoading(false);
                onClose()

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
        <div className="lg:max-w-[50%] mx-auto ">
            <h1 className="text-2xl text-center font-bold mb-4 ">আপনার আয় যোগ করূন </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" grid gap-4 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1"
            >


                <SelectField
                    label="আয়ের উৎস"
                    name="incomeFrom"
                    control={control}
                    options={incomeSources}
                    rules={{ required: "আয়ের উৎস নাই" }}
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
                    label="তারিখ"
                    type="date"
                    rules={{ required: "তারিখ নাই" }}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full mt-2"
                >
                    {loading ? (
                        <span className="loading loading-dots loading-lg"></span>
                    ) : (
                        "আয় যোগ করুন"
                    )}
                </button>
            </form>
        </div>
    );
};

export default IncomeEntry;