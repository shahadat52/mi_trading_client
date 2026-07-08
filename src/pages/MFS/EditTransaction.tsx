/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "react-toastify";
import InputField from "../../components/form/InputFields";
import SelectField from "../../components/form/SelectField";
import { customerTxnType } from "../../utils/transactionType";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useDeleteMfsTxnMutation } from "../../redux/features/mfs/mfsApi";

type Props = {
    selectedTxn: any;
    onClose: () => void;
    updateMutation: any;
};

const EditTransaction = ({ selectedTxn, onClose, updateMutation }: Props) => {
    const [deleteMfsTxn] = useDeleteMfsTxnMutation()
    const [loading, setLoading] = useState(false);
    const id = selectedTxn._id

    const { handleSubmit, control, reset } = useForm();
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await updateMutation({ data, id });
            if (result?.data?.success) {

                toast.update(toastId, {
                    render: result.data.message,
                    type: "success",
                    isLoading: false,
                    autoClose: 1500,
                    closeOnClick: true,
                });
                reset();
                onClose();
            } else {
                toast.update(toastId, {
                    render: `${(result as any)?.error?.data?.message}`,
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                });
            }
        } catch (err: any) {
            toast.update(toastId, {
                render: err?.error?.data?.message || "Something went wrong!",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const isConfirm = confirm("আপনি নিশ্চিত ডিলিট করেই দিবেন?")
        if (!isConfirm) {
            return
        }
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await deleteMfsTxn(id);
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                onClose()
            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });
                setLoading(false);
            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });

        } finally {
            /* empty */
        }

    };

    return (
        <div className="m-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 lg:grid-cols-1"
            >
                <div className="flex items-center gap-2">
                    <SelectField
                        name="type"
                        label="no"
                        placeholder={selectedTxn.type}
                        options={customerTxnType}
                        control={control}
                        rules={{ required: "লেনদেনের ধরন নাই" }}
                    />

                    <div className="mt-[14px]">
                        <InputField
                            name="amount"
                            label=""
                            placeholder={selectedTxn.amount}
                            type="number"
                            control={control}
                        />
                    </div>
                </div>

                <InputField
                    name="note"
                    label=""
                    placeholder={selectedTxn.note}
                    type="text"
                    control={control}
                />

                <div className="flex justify-between items-center">
                    <button onClick={() => handleDelete(id)} type='button' className="btn btn-info  mt-2">ডিলিট করুন </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary mt-2"
                    >
                        {loading ? (
                            <span className="loading loading-dots loading-lg"></span>
                        ) : (
                            "UPDATE"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTransaction;