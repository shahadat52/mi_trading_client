/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/form/InputFields";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import "../../styles/modalAnimations.css"; // 🔥 animation CSS
import { useCreateBrokerMutation } from "../../redux/features/broker/brokerApi";

export const AddBrokerModal = ({ setAddBrokerController }: any) => {
    const [loading, setLoading] = useState(false);
    const [closing, setClosing] = useState(false); // 🔥 control closing animation

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "",
            phone: ""
        }
    });

    const [addBroker] = useCreateBrokerMutation();

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setAddBrokerController(false);
        }, 250); // ⏳ same as animation duration
    };

    const onSubmit = async (data: any) => {
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            setLoading(true);

            const result = await addBroker(data);
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                reset();
                handleClose(); // 🔥 animated close
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
        <div
            className={`fixed inset-0 bg-black/50 flex justify-center items-center z-50 
            ${closing ? "animate-fadeOut" : "animate-fadeIn"}`}
        >
            <div
                className={`bg-white p-6 rounded-lg shadow-lg w-96 
                ${closing ? "animate-scaleOut" : "animate-scaleIn"}`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Add Broker</h2>

                    <button
                        className="rounded text-2xl"
                        onClick={handleClose}
                    >
                        <MdCancel />
                    </button>
                </div>

                <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-3 overflow-y-auto max-h-96   ">

                        <InputField
                            name="name"
                            label="ব্রোকারের নাম"
                            control={control}
                            rules={{ required: "ব্রোকারের নাম নাই" }}
                        />



                        <InputField
                            name="phone"
                            label="মোবাইল নাম্বার"
                            control={control}
                            rules={{ required: "মোবাইল নাম্বার নাই" }}
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full mt-3"
                    >
                        {loading ? (
                            <span className="loading loading-dots loading-lg"></span>
                        ) : (
                            "Add Broker"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
