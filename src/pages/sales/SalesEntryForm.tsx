/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { useSalesEntryMutation } from "../../redux/features/sales/salesApi";
import type { TSales, TSaleItem, TSalesProducts } from "../../interfaces/sales";
import { MdCancel } from "react-icons/md";
import ProductSearchSelect from "./ProductSearchSelect";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { useAppSelector } from "../../redux/hook";
import CustomerSearchableSelectFields from "./CustomerSearchableSelectFields";
import { resetForm } from "../../redux/features/sales/salesSlice";
import InputField from "../../components/form/InputFields";
import SelectField from "../../components/form/SelectField";
import { transactionType } from "../../utils/transactionType";
import { banksName } from "../accounts/banksName";

const EMPTY_ITEM: TSaleItem = {
    product: "",
    quantity: "",
    salePrice: "",
    totalPrice: "",
    purchasePrice: "",
    profit: "",
};

const SalesEntryForm = () => {
    const [createSale] = useSalesEntryMutation();
    const [isLoading, setLoading] = useState(false);
    const customer = useAppSelector((state: any) => state.cart.customer);
    console.log(customer)

    const { register, control, reset, handleSubmit, watch, setValue } = useForm<TSales>({
        defaultValues: {
            customer: customer,
            broker: "",
            items: [EMPTY_ITEM],
            labour: '',
            customerCommission: '',
            discount: 0,
            vat: 0,
            date: new Date(),
            subtotal: 0,
            grandTotal: 0,
            grandProfit: 0,
            paidAmount: '',
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
    const labour = watch("labour");
    const customerCommission = watch("customerCommission")
    const paymentMethod = watch("paymentMethod")

    // ================================
    // CALCULATIONS
    // ================================
    useEffect(() => {
        const totalProductValue = items.reduce((sum, v) => sum + (v.totalPrice || 0), 0)
        const subTotalLabour = totalProductValue + Number(labour) + Number(customerCommission)
        const totalProfit = items.reduce((sum, v) => sum + (v.profit || 0), 0);
        const vatAmount = subTotalLabour * (vat / 100);
        const grandTotal = subTotalLabour - discount + vatAmount;
        const due = grandTotal - Number(paidAmount);

        setValue("subtotal", subTotalLabour);
        setValue("grandProfit", totalProfit);
        setValue("grandTotal", grandTotal);
        setValue("dueAmount", due);
        setValue("customerCommission", customerCommission)
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
    const onSubmit: SubmitHandler<any> = async (data) => {
        data.customer = customer._id;
        setLoading(true);
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        data.paidAmount = Number(data.paidAmount);
        data.labour = Number(data.labour);
        data.customerCommission = Number(data.customerCommission)
        try {
            console.log({ data })

            const result = await createSale(data)
            console.log(result)
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                resetForm();
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
            <h1 className="text-2xl font-semibold mb-6">সেলস এন্ট্রি দিন</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* CUSTOMER INFO */}


                {/* INVOICE / PAYMENT */}
                <section>
                    <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 gap-4">
                        <section>
                            <CustomerSearchableSelectFields />
                        </section>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                ব্রোকার
                            </label>

                            <input {...register("broker")} placeholder="Broker (Optional)" className="input" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                পেমেন্ট মেথড
                            </label>
                            <select {...register("paymentMethod", { required: true })} className="input">
                                <option value="cash">Cash</option>
                                <option value="bank">Bank</option>
                                <option value="bkash">bKash</option>
                                <option value="nagad">Nagad</option>
                                <option value="rocket">Rocket</option>
                                <option value="card">Card</option>
                            </select>
                        </div>



                        <div>
                            <label htmlFor="">তারিখ</label>
                            <input {...register("date", { required: true })} type="datetime-local" className="input" />
                        </div>
                        <div>
                            <label htmlFor="">লেবার</label>
                            <input {...register("labour", { required: true })} type="number" className="input" />
                        </div>
                        <div>
                            <label htmlFor="">কাস্টমার কমিশন</label>
                            <input {...register("customerCommission", { required: true })} type="number" className="input" />
                        </div>
                    </div>
                </section>

                {/* SALES ITEMS */}
                <section className="border p-4 rounded-xl bg-gray-50 text-black">
                    {fields?.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 items-center mb-3">

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
                                <label>পরিমান</label>
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
                            <div className="flex items-center text-sm font-semibold mt-1">
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
                <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2  p-1 rounded-xl">
                    <div>
                        <label htmlFor="">জমা</label>
                        <input {...register("paidAmount", { required: true })} type="number" placeholder="Paid Amount" className="input" />
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

                {
                    paymentMethod === 'bank' &&
                    <div className="border border-red-700 rounded-2xl p-2 grid gap-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                        <SelectField
                            label="ব্যাংকের নাম"
                            name="bankName"
                            control={control}
                            options={banksName}
                            rules={{ required: "ব্যাংকের নাম নাই" }}
                        />
                        <SelectField
                            label="লেনদেনের ধরন"
                            name="type"
                            control={control}
                            options={transactionType}
                            rules={{ required: "লেনদেনের ধরন নাই" }}
                        />
                        <InputField
                            label="টাকার পরিমান"
                            name="amount"
                            type='number'
                            control={control}
                            rules={{ required: "টাকার পরিমান নাই" }}
                        />
                        <InputField
                            control={control}
                            name="ইস্যুর তারিখ"
                            type='datetime-local'
                            label="issueDate"
                            rules={{ required: "ইস্যুর তারিখ নাই" }}
                        />
                        <InputField
                            control={control}
                            label="পোস্টিং এর তারিখ"
                            type='datetime-local'
                            name="postingDate"
                            rules={{ required: "পোস্টিং এর তারিখ নাই" }}
                        />
                        <InputField
                            control={control}
                            label="মন্তব্য"
                            name="txnnote"
                        />
                    </div>

                }

                <InputField
                    control={control}
                    label="মন্তব্য"
                    name="description"
                />

                <div className="flex justify-center">
                    <button className="w-1/2 p-2  bg-blue-600 text-white mb-16  rounded-lg text-lg hover:bg-green-700">
                        {
                            isLoading ? <Loading></Loading> : "বিক্রি করুন"
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SalesEntryForm;