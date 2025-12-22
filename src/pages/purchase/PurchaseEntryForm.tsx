/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import type { TPurchase } from "../../interfaces/products";
import { useState } from "react";
import SelectField from "../../components/form/SelectField";
import InputField from "../../components/form/InputFields";
import { usePurchaseEntryMutation } from "../../redux/features/purchase/purchaseApi";
import { toast } from "react-toastify";
import { useGetAllProductNamesQuery } from "../../redux/features/product/productApi";
import { purchaseTypes } from "../../utils/purchaseTypes";
import { useGetAllSuppliersNameQuery } from "../../redux/features/supplier/supplierApi";
import TextAreaField from "../../components/form/TextAreaField";


// 

// 

const PurchaseEntryForm = () => {
    const { control, handleSubmit, reset } = useForm<TPurchase>({
        defaultValues: {
            supplier: "",
            product: "",
            lot: "",
            purchasePrice: 0,
            purchaseDate: new Date(),
            commissionPerUnit: 0,
            stockQty: 0

        },
    });

    const [loading, setLoading] = useState(false);

    const { data } = useGetAllProductNamesQuery(undefined)
    const { data: supplierData } = useGetAllSuppliersNameQuery(undefined)

    const [addPurchase] = usePurchaseEntryMutation();
    const productNames = data?.data

    const names = productNames?.map((item: any) => ({ label: item?.name, value: item?._id }))
    const supplierNames = supplierData?.data;

    const suppliers = supplierNames?.map((item: any) => ({ label: item?.name, value: item?._id }))

    const onSubmit: SubmitHandler<TPurchase> = async (data) => {
        const toastId = toast.loading("Processing...", { autoClose: 2000 });

        try {
            setLoading(true);

            const result = await addPurchase(data);
            console.log(result)
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                reset();

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
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-2xl shadow"
        >

            <SelectField
                name="supplier"
                label="Supplier"
                control={control}
                options={suppliers}
                rules={{ required: "Unit is required" }}
            />

            <SelectField
                name="product"
                label="Product"
                control={control}
                options={names}
                rules={{ required: "Unit is required" }}
            />
            <SelectField
                name="purchaseType"
                label="Purchase Type"
                control={control}
                options={purchaseTypes}
                rules={{ required: "Unit is required" }}
            />

            <InputField
                name="purchaseDate"
                label="Purchase Date"
                control={control}
                type="date"
            />
            <InputField name="lot" label="Lot Number" control={control} rules={{ required: "Required" }} />
            <InputField name="purchasePrice" label="Purchase Price" control={control} type="number" rules={{ required: "Required" }} />
            <InputField name="commissionPerUnit" label="কমিশনের হার (%) " control={control} rules={{ required: "Required" }} type="number" />
            <InputField name="quantity" label="Purchase Quantity" control={control} type="number" />

            <TextAreaField
                name='note'
                label="Note"
                control={control}
                placeholder="Keep note..."
            />

            <button
                type="submit"
                disabled={loading}
                className="btn btn-primary col-span-1 md:col-span-2"
            >
                {loading ? <div className="flex justify-center items-center ">
                    <span className="loading loading-dots loading-lg"></span>
                </div> : "Add Product"}
            </button>
        </form>
    );
};

export default PurchaseEntryForm;
