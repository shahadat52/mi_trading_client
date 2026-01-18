/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../form/InputFields";
import { MdCancel } from "react-icons/md";
import SelectField from "../form/SelectField";
import { toast } from "react-toastify";
import { useAddProductMutation } from "../../redux/features/product/productApi";
import { units } from "../../utils/units";

import "../../styles/modalAnimations.css"; // 🔥 animation CSS

export const AddProductModal = ({ setAddProductModalCont }: any) => {
    const [loading, setLoading] = useState(false);
    const [closing, setClosing] = useState(false); // 🔥 control closing animation

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "",
            sku: "",
            category: "",
            purchasePrice: "",
            salesPrice: "",
            unit: "",
            stockQty: ""
        }
    });

    const [addProduct] = useAddProductMutation();

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setAddProductModalCont(false);
        }, 250); // ⏳ same as animation duration
    };

    const onSubmit = async (data: any) => {
        const toastId = toast.loading("Processing...", { autoClose: 2000 });

        try {
            setLoading(true);

            const result = await addProduct(data);
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
                    <h2 className="text-lg font-semibold">Add Product</h2>

                    <button
                        className="rounded text-2xl"
                        onClick={handleClose}
                    >
                        <MdCancel />
                    </button>
                </div>

                <form className="mb-40" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-3 overflow-y-auto max-h-96   ">

                        <InputField
                            name="name"
                            label="Product Name"
                            control={control}
                            rules={{ required: "Name is required" }}
                        />

                        <InputField
                            name="sku"
                            label="SKU"
                            control={control}
                            rules={{ required: "SKU is required" }}
                        />

                        <InputField
                            name="category"
                            label="Category"
                            control={control}
                            rules={{ required: "Category is required" }}
                        />

                        <InputField
                            name="purchasePrice"
                            label="Purchase Price"
                            type="number"
                            control={control}
                            rules={{ required: "Purchase Price is required" }}
                        />

                        <InputField
                            name="salesPrice"
                            label="Sales Price"
                            type="number"
                            control={control}
                            rules={{ required: "Sales Price is required" }}
                        />

                        <SelectField
                            name="unit"
                            label="Unit"
                            control={control}
                            options={units}
                            rules={{ required: "Unit is required" }}
                        />

                        <InputField
                            name="stockQty"
                            label="Stock Quantity"
                            type="number"
                            control={control}
                            rules={{ required: "Stock Quantity is required" }}
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
                            "Add Product"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
