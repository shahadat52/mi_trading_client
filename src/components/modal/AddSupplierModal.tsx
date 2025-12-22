/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../form/InputFields";
import { MdCancel } from "react-icons/md";
import { useAddSupplierMutation } from "../../redux/features/supplier/supplierApi";
import { toast } from "react-toastify";
import '../../styles/modalAnimations.css'

export const AddSupplierModal = ({ setAddSupplierModalCont }: any) => {
    const [loading, setLoading] = useState(false);
    const [closing, setClosing] = useState(false); // 🔥 closing animation state

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "",
            phone: "",
            address: "",
            totalPaidCommission: 0,
            commissionPayable: 0
        }
    });

    const [addSupplier] = useAddSupplierMutation();

    const handleClose = () => {
        setClosing(true);                // 1️⃣ Start closing animation
        setTimeout(() => {
            setAddSupplierModalCont(false);  // 2️⃣ After animation hide modal
        }, 250);                          // ⏳ same as animation duration
    };

    const onSubmit = async (data: any) => {
        const toastId = toast.loading("Processing...");

        try {
            setLoading(true);

            const result = await addSupplier(data);

            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });

                reset();
                handleClose();
            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });
            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 flex justify-center items-center z-50
                ${closing ? "animate-fadeOut" : "animate-fadeIn"}`}
            >

                {/* Modal Box */}
                <div
                    className={`bg-white p-6 rounded-lg shadow-lg w-96
                    ${closing ? "animate-scaleOut" : "animate-scaleIn"}`}
                >

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Add Supplier</h2>

                        <button
                            className="rounded text-2xl"
                            onClick={handleClose}
                        >
                            <MdCancel />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

                        <InputField
                            name="name"
                            label="Supplier Name *"
                            control={control}
                            rules={{ required: "Name is required" }}
                        />

                        <InputField
                            name="phone"
                            label="Phone Number *"
                            control={control}
                            rules={{ required: "Phone is required" }}
                        />

                        <InputField
                            name="address"
                            label="Address"
                            control={control}
                            rules={{ required: "Address is required" }}
                        />



                        <InputField
                            name="commissionPayable"
                            label="Commission Payable "
                            type="number"
                            control={control}
                            rules={{ required: "This field is required" }}
                        />

                        <InputField
                            name="totalPaidCommission"
                            label="Total Paid Commission"
                            type="number"
                            control={control}
                            rules={{ required: "This field is required" }}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full mt-2"
                        >
                            {loading ? (
                                <span className="loading loading-dots loading-lg"></span>
                            ) : (
                                "Add Supplier"
                            )}
                        </button>
                    </form>

                </div>
            </div>
        </>
    );
};
