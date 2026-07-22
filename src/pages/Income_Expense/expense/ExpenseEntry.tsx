/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import SelectField from "../../../components/form/SelectField";
import InputField from "../../../components/form/InputFields";
import { useGetAllSectorsQuery, useTxnEntryMutation } from "../../../redux/features/inExTxn/inExTxnApi";
import { paymentMethods } from "../../../utils/paymentMethods";
import { banksName } from "../../accounts/banksName";
import { bankingSource } from "../../../utils/transactionType";
import ImagePicker from "../../../components/ImagePicker";
import { compressImage } from "../../../utils/compressImage";

const ExpenseEntry = ({ onClose }: { onClose: () => void }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false)
    const { handleSubmit, control, reset, watch } = useForm();

    const { data: sectorData } = useGetAllSectorsQuery({ head: 'expense' });
    const expenseSources = sectorData?.data || [];

    const handleComprssImage = async (file: any) => {
        if (!file) return;
        const compressedFile = await compressImage(file);
        setImageFile(compressedFile);
    }

    const [addExpense] = useTxnEntryMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        data.head = 'expense'
        data.type = 'debit'
        setLoading(true);
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, String(value));
            });

            if (imageFile) {
                formData.append("image", imageFile);
            }

            const result = await addExpense(formData);
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


    const paymentMethod = watch('paymentMethod');
    return (
        <div className="m-4 ">
            <h1 className="text-2xl text-center font-bold mb-4 ">আপনার ব্যয় যোগ করূন </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" grid gap-4 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1"
            >


                <SelectField
                    label="ব্যয়ের উৎস"
                    name="category"
                    control={control}
                    options={expenseSources}
                    rules={{ required: "ব্যয়ের উৎস নাই" }}
                />
                <InputField
                    label="পরিমাণ(টাকা) "
                    name="amount"
                    control={control}
                    rules={{ required: "পরিমাণ নাই" }}
                />
                <InputField
                    label="বিবরণ"
                    name="note"
                    control={control}
                    rules={{ required: "বিবরণ নাই" }}
                />

                <SelectField
                    name="paymentMethod"
                    label=""
                    placeholder="পেমেন্ট মেথড"
                    control={control}
                    options={paymentMethods}
                    rules={{ required: "পেমেন্ট মেথড নাই" }}
                />
                {
                    paymentMethod === 'bank' && (
                        <div className='mt-3'>
                            <SelectField
                                label="ব্যাংকের নাম"
                                name="bankName"
                                control={control}
                                options={banksName}
                                rules={{ required: "ব্যাংকের নাম নাই" }}
                            />

                            <SelectField
                                name="source"
                                label="no"
                                placeholder='সোর্স'
                                options={bankingSource}
                                control={control}
                                rules={{ required: "সোর্স" }}
                            />
                        </div>
                    )
                }

                <div>
                    <ImagePicker
                        onFileSelect={(file) => {
                            handleComprssImage(file);
                        }}
                    />

                    {imageFile && (
                        <p className="text-xs text-green-600 mt-1">
                            {imageFile.name}
                        </p>
                    )}

                    {imageFile && (
                        <img
                            src={URL.createObjectURL(imageFile)}
                            alt="preview"
                            className="w-10 h-15 object-cover rounded mt-2"
                        />
                    )}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full mt-2"
                >
                    {loading ? (
                        <span className="loading loading-dots loading-lg"></span>
                    ) : (
                        "ব্যয় এন্টি করুন"
                    )}
                </button>
            </form>
        </div>
    );
};

export default ExpenseEntry;