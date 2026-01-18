/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type FieldValues } from "react-hook-form";
import InputField from "../../components/form/InputFields";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUpdateSupplierDataMutation } from "../../redux/features/supplier/supplierApi";

const SupplierDataUpdateEntry = ({ onClose, id }: { onClose: () => void, id: string }) => {
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, reset } = useForm();
    const [updateSupplierData] = useUpdateSupplierDataMutation()

    const handleUpdate = async (data: FieldValues) => {
        const payload = {
            data,
            id
        }
        setLoading(true)
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await updateSupplierData(payload);
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
        <div className="m-4">
            <form
                onSubmit={handleSubmit(handleUpdate)}

            >
                <InputField
                    control={control}
                    label="নাম"
                    name="name"
                    placeholder="নতুন নাম লিখুন.." />

                <InputField
                    control={control}
                    label="ফোন"
                    name="phone"
                    placeholder="নতুন নাম্বার লিখুন.." />

                <InputField
                    control={control}
                    label="ঠিকানা"
                    name="address"
                    placeholder="ঠিকানা লিখুন.." />

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full mt-2"
                >
                    {loading ? (
                        <span className="loading loading-dots loading-lg"></span>
                    ) : (
                        "তথ্য আপডেট করুন"
                    )}
                </button>

            </form>

        </div>
    );
};

export default SupplierDataUpdateEntry;