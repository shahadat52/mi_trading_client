/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/form/InputFields";
import TextAreaField from "../../../components/form/TextAreaField";
import SelectField from "../../../components/form/SelectField";
import { purchaseTypes } from "../../../utils/purchaseTypes";
import { DateTime } from "../../../utils/formatDateTime";
import { useUpdatePurchaseMutation } from "../../../redux/features/purchase/purchaseApi";
import { toast } from "react-toastify";

interface EditModalProps {
    item: any;
    onClose: () => void;
}

export const EditModal = ({ item, onClose }: EditModalProps) => {


    const formattedItem = useMemo(() => {
        if (!item) return null;

        return {
            ...item,
            purchaseDate: DateTime(item?.purchaseDate),
        };
    }, [item]);

    const {
        control,
        handleSubmit,
        reset,
        watch,
        register
    } = useForm({
        defaultValues: formattedItem || {},
    });

    const [updatePurchase] = useUpdatePurchaseMutation()

    // ✅ Reset with formattedItem (not original item)
    useEffect(() => {
        if (formattedItem) {
            reset(formattedItem);
        }
    }, [formattedItem, reset]);

    const purchaseType = watch("purchaseType");

    const handleUpdate = async (data: any) => {
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await updatePurchase(data)
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                onClose();

            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });

            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });
        } finally {
            // reset()
        }

    };

    if (!formattedItem) return null;

    return (
        <form
            onSubmit={handleSubmit(handleUpdate)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3"
        >
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-5 md:p-6 max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg md:text-xl font-semibold">Edit Purchase</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Form Body */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <InputField
                        name="supplier.name"
                        label="Supplier Name"
                        control={control}
                        readOnly
                    />

                    <InputField
                        name="product.name"
                        label="Product Name"
                        control={control}
                        readOnly
                    />

                    <InputField
                        name="invoice"
                        label="Invoice Number"
                        control={control}
                        readOnly
                    />

                    <InputField
                        name="lot"
                        label="Lot Number"
                        control={control}
                    />

                    <InputField
                        name="purchaseDate"
                        label="Purchase Date"
                        type="date"
                        control={control}
                    />

                    <InputField
                        name="stockQty"
                        label="Quantity"
                        type="number"
                        control={control}
                    />

                    <InputField
                        name="purchasePrice"
                        label="Purchase Price"
                        type="number"
                        control={control}
                    />

                    {/* Purchase Type */}
                    <div className="flex flex-col gap-1 w-full">
                        <SelectField
                            control={control}
                            name="purchaseType"
                            options={purchaseTypes}
                            label="Purchase Type"
                        />
                    </div>

                    {/* Commission Per Unit */}
                    {purchaseType === "commission" && (
                        <InputField
                            name="commissionPerUnit"
                            label="Commission Per Unit"
                            type="number"
                            control={control}
                        />
                    )}

                    {/* Due Amount */}
                    {purchaseType === "due" && (
                        <InputField
                            name="dueAmount"
                            label="Due Amount"
                            type="number"
                            control={control}
                        />
                    )}

                    {/* Total Commission */}
                    {purchaseType === "commission" && (
                        <InputField
                            name="totalCommission"
                            label="Total Commission"
                            type="number"
                            control={control}
                        />
                    )}

                    {/* Note */}
                    <TextAreaField
                        control={control}
                        name="note"
                        label="Note"
                        placeholder="Optional note"
                    />

                    {/* Paid Checkbox */}
                    <div className="md:col-span-2 flex items-center gap-3 mt-2">
                        <label className="font-medium text-sm">Paid:</label>
                        <input
                            type="checkbox"
                            {...register("isPaid")}
                            className="checkbox checkbox-primary"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary btn-sm"
                    >
                        Update
                    </button>
                </div>
            </div>
        </form>
    );
};
