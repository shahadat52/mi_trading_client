/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { useSalesEntryMutation } from "../../redux/features/sales/salesApi";
import type { TSales, TSaleItem, TSalesProducts } from "../../interfaces/sales";
import { MdCancel } from "react-icons/md";
import ProductSearchSelect from "./ProductSearchSelect";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const EMPTY_ITEM: TSaleItem = {
    product: "",
    quantity: 0,
    salePrice: 0,
    totalPrice: 0,
    purchasePrice: 0,
    profit: 0,
};

const SalesEntryForm = () => {
    const [createSale] = useSalesEntryMutation();
    const [isLoading, setLoading] = useState(false);

    const { register, control, reset, handleSubmit, watch, setValue } = useForm<TSales>({
        defaultValues: {
            customer: { name: "", phone: "", address: "" },
            broker: "",
            items: [EMPTY_ITEM],
            discount: 0,
            vat: 0,
            subtotal: 0,
            grandTotal: 0,
            grandProfit: 0,
            paidAmount: 0,
            dueAmount: 0,
            paymentMethod: "cash",
            salesType: "regular",
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "items" });

    const items = watch("items");
    const discount = watch("discount");
    const vat = watch("vat");
    const paidAmount = watch("paidAmount");

    // ================================
    // CALCULATIONS
    // ================================
    useEffect(() => {
        const subtotal = items.reduce((sum, v) => sum + (v.totalPrice || 0), 0);
        const totalProfit = items.reduce((sum, v) => sum + (v.profit || 0), 0);

        const vatAmount = subtotal * (vat / 100);
        const grandTotal = subtotal - discount + vatAmount;
        const due = grandTotal - paidAmount;

        setValue("subtotal", subtotal);
        setValue("grandProfit", totalProfit);
        setValue("grandTotal", grandTotal);
        setValue("dueAmount", due);
    }, [items, discount, vat, paidAmount, setValue]);

    // ================================
    // ITEM UPDATE HANDLER
    // ================================
    const updateItem = (index: number, updated: Partial<TSaleItem>) => {
        const item = { ...items[index], ...updated };

        item.totalPrice = Number(item.salePrice || 0) * Number(item.quantity || 0);
        item.profit = item.totalPrice - Number(item.purchasePrice || 0) * Number(item.quantity || 0);

        setValue(`items.${index}`, item);
    };

    // ================================
    // SUBMIT HANDLER
    // ================================
    const onSubmit: SubmitHandler<TSales> = async (data) => {
        setLoading(true);
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        data.paidAmount = Number(data.paidAmount);
        try {
            const result = await createSale(data)
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                reset();
                setLoading(false);

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
    };

    // ================================
    // UI START
    // ================================
    return (
        <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            <h1 className="text-2xl font-semibold mb-6">Sales Entry Form</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* CUSTOMER INFO */}
                <section>
                    <h2 className="text-lg font-semibold mb-2">Customer Info</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <input {...register("customer.name")} placeholder="Customer Name" className="input" />
                        <input {...register("customer.phone")} placeholder="Phone" className="input" />
                        <input {...register("customer.address")} placeholder="Address" className="input" />
                    </div>
                </section>

                {/* INVOICE / PAYMENT */}
                <section>
                    <div className="grid grid-cols-3 gap-4">
                        <input {...register("broker")} placeholder="Broker (Optional)" className="input" />

                        <select {...register("paymentMethod")} className="input">
                            <option value="cash">Cash</option>
                            <option value="bkash">bKash</option>
                            <option value="nagad">Nagad</option>
                            <option value="rocket">Rocket</option>
                            <option value="card">Card</option>
                            <option value="bank">Bank</option>
                        </select>
                    </div>
                </section>

                {/* SALES ITEMS */}
                <section className="border p-4 rounded-xl bg-gray-50 text-black">
                    {fields?.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-4 gap-3 items-center mb-3">

                            {/* PRODUCT */}
                            <div>
                                <label>পন্য</label>
                                <ProductSearchSelect
                                    value={items[index]?.product}
                                    onChange={(id: string, product?: TSalesProducts) => {
                                        updateItem(index, {
                                            product: id,
                                            purchasePrice: product?.purchasePrice || 0,
                                            salePrice: product?.salesPrice || 0,
                                        });
                                    }}
                                />
                            </div>

                            {/* QUANTITY */}
                            <div>
                                <label>সংখ্যা</label>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder="Qty"
                                    value={items[index]?.quantity ?? ""}
                                    onChange={(e) =>
                                        updateItem(index, { quantity: Number(e.target.value) })
                                    }
                                />
                            </div>

                            <div className="hidden">
                                <label>Purchase Price</label>
                                <input
                                    type="number"
                                    className="input placeholder:text-gray-400"
                                    placeholder="Sale Price"
                                    value={items[index]?.purchasePrice ?? ""}
                                    onChange={(e) =>
                                        updateItem(index, { purchasePrice: Number(e.target.value) })
                                    }
                                />
                            </div>

                            {/* SALE PRICE */}
                            <div>
                                <label>দাম</label>
                                <input
                                    type="number"
                                    className="input placeholder:text-gray-400"
                                    placeholder="Sale Price"
                                    value={items[index]?.salePrice ?? ""}
                                    onChange={(e) =>
                                        updateItem(index, { salePrice: Number(e.target.value) })
                                    }
                                />
                            </div>

                            {/* TOTAL & REMOVE */}
                            <div className="flex items-center text-sm font-semibold mt-5">
                                {items[index]?.totalPrice || 0} Tk
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="px-3 py-1 ml-2 text-red-600 text-2xl font-bold rounded"
                                >
                                    <MdCancel />
                                </button>
                            </div>

                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => append(EMPTY_ITEM)}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        + Add Item
                    </button>
                </section>

                {/* SUMMARY */}
                <section className="grid grid-cols-4 gap-4 bg-gray-100 p-4 rounded-xl">
                    <div>
                        <label htmlFor="">জমা</label>
                        <input {...register("paidAmount")} type="number" placeholder="Paid Amount" className="input" />
                    </div>
                    <div>
                        <label htmlFor="">ছাড়</label>
                        <input {...register("discount")} type="number" placeholder="Discount" className="input" />
                    </div>
                    <div>
                        <label htmlFor="">ভ্যাট</label>
                        <input {...register("vat")} type="number" placeholder="VAT %" className="input" />
                    </div>


                    <div className=" text-right text-sm">
                        <p>মোট: <b>{watch("subtotal")}</b></p>
                        <p>সর্বমোট: <b>{watch("grandTotal")}</b></p>
                        <p>বাকি: <b>{watch("dueAmount")}</b></p>
                    </div>
                </section>

                <button className="w-full bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700">
                    {
                        isLoading ? <Loading></Loading> : "Submit Sales Entry"
                    }
                </button>
            </form>
        </div>
    );
};

export default SalesEntryForm;