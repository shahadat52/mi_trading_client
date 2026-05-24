/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type FieldValues } from "react-hook-form";
import { useCommissionSalesUpdateMutation } from "../../../redux/features/commissionSales/commissionSalesApi";

const PriceUpdateEntry = ({ item, onClose }: any) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({ defaultValues: { bosta: item?.bosta || "", price: item?.price || "", quantity: item?.quantity || "", }, });
    const [updatePriceQty] = useCommissionSalesUpdateMutation()

    const onSubmit = async (data: FieldValues) => {
        const payload = {
            id: item,
            salePrice: Number(data.price),
            quantity: Number(data.quantity),
            bosta: Number(data.bosta),
        };


        try {

            const result: any = await updatePriceQty(payload);
            if (result?.data?.success) {
                alert(`${result?.data?.message}`)
                onClose?.();
            }
        } catch (error) {
        }
    };

    return (
        <form onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 space-y-4"
        >
            <h2 className="text-lg font-semibold text-gray-800">
                Update Entry
            </h2>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Bag
                </label>
                <input
                    type="number"
                    step="any"
                    placeholder="Bag"
                    {...register("bosta", {
                        required: "bag is required",
                        min: {
                            value: 1,
                            message: "Bag must be greater than 0",
                        },
                    })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.price && (
                    <p className="text-sm text-red-500 mt-1">
                        {(errors?.bosta?.message as string)}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Quantity
                </label>
                <input
                    type="number"
                    placeholder="Enter quantity"
                    {...register("quantity", {
                        required: "Quantity is required",
                        min: {
                            value: 1,
                            message: "Quantity must be greater than 0",
                        },
                    })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.quantity && (
                    <p className="text-sm text-red-500 mt-1">
                        {(errors.quantity.message as string)}
                    </p>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Price
                </label>
                <input
                    type="number"
                    step="any"
                    placeholder="Enter price"
                    {...register("price", {
                        required: "Price is required",
                        min: {
                            value: 1,
                            message: "Price must be greater than 0",
                        },
                    })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.price && (
                    <p className="text-sm text-red-500 mt-1">
                        {(errors.price.message as string)}
                    </p>
                )}
            </div>



            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Updating..." : "Update"}
                </button>
            </div>
        </form>
    );
};

export default PriceUpdateEntry;