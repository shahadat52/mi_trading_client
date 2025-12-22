/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { useDeliveryEntryAndUpdateMutation } from "../../redux/features/delivery/deliveryApi";

type SalesDeliveryModalProps = {
    item: any;
    deliveryModalClose: () => void;
};

export const SalesDeliveryModal = ({ item, deliveryModalClose }: SalesDeliveryModalProps) => {
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: item,
    });

    const [deliveryEntryAndUpdate] = useDeliveryEntryAndUpdateMutation();

    const onSubmit = async (data: any) => {
        data.sales = item._id;
        const toastId = toast.loading("Processing...", { autoClose: 2000 });

        try {
            setLoading(true);

            const result = await deliveryEntryAndUpdate(data);
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                reset();
                deliveryModalClose();

            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });

            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });

        } finally {

            setLoading(false);
        }
    };

    if (!item) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">ডেলিভারির তথ্য দাও</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-sm">

                    <input
                        className="border w-full px-2 py-1 rounded"
                        {...register("destination")}
                        placeholder="কোথায় যাবে"
                    />
                    <input
                        type="date"
                        className="border w-full px-2 py-1 rounded"
                        {...register("deliveryTime")}
                        placeholder="Category"
                    />
                    <input
                        className="border w-full px-2 py-1 rounded"
                        {...register("via")}
                        placeholder="যে মাধ্যমে ডেলিভারি হবে"
                    />

                    <input
                        className="border w-full px-2 py-1 rounded"
                        {...register("description")}
                        placeholder="বিবরণী"
                    />

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded"
                            onClick={() => {
                                reset(item); // reset form to initial values
                                deliveryModalClose();
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            {
                                loading ? <Loading></Loading> : 'Submit'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};