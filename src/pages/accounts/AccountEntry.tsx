/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import InputField from '../../components/form/InputFields';
import SelectField from '../../components/form/SelectField';
import { banksName } from './banksName';
import { useAddAccountMutation } from '../../redux/features/account/accountApi';

const AccountEntry = ({ onClose }: { onClose: () => void }) => {
    const [loading, setLoading] = useState(false)
    const { handleSubmit, control, reset } = useForm();
    const [addAccount] = useAddAccountMutation()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await addAccount(data);
            console.log(result)
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
    return (
        <div className="m-4 ">
            <h1 className="text-2xl text-center font-bold mb-4 ">আপনার একাউন্ট যুক্ত করূন </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" grid gap-4 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1"
            >


                <SelectField
                    label="ব্যাংকের নাম"
                    name="bankName"
                    control={control}
                    options={banksName}
                    rules={{ required: "ব্যাংকের নাম নাই" }}
                />
                <InputField
                    label="ব্রাঞ্চের নাম"
                    name="branchName"
                    control={control}
                    rules={{ required: "ব্রাঞ্চের নাম নাই" }}
                />
                <InputField
                    label="একাউন্ট নাম্বার"
                    name="accountNumber"
                    control={control}
                    rules={{ required: "একাউন্ট নাম্বার নাই" }}
                />
                <InputField
                    control={control}
                    name="accountName"
                    label="একাউন্টের নাম"
                    rules={{ required: "একাউন্টের নাম দেওয়া বাধ্যতামূলক" }}
                />
                <InputField
                    control={control}
                    name="openingBalance"
                    label="ওপেনিং ব্যালেন্স"
                    rules={{ required: "তারিখ ও সময় দেওয়া বাধ্যতামূলক" }}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full mt-2"
                >
                    {loading ? (
                        <span className="loading loading-dots loading-lg"></span>
                    ) : (
                        "নতুন ব্যাংক একাউন্ট যুক্ত করুন"
                    )}
                </button>
            </form>
        </div>
    );
};

export default AccountEntry;