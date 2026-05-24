/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from '../../components/form/InputFields';
import { useForm, type FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAddCustomerMutation } from '../../redux/features/customer/customerApi';
import { useState } from 'react';
import SelectField from '../../components/form/SelectField';
import { CATEGORY_OPTIONS } from '../../utils/options';

const AddCustomer = ({ onClose }: { onClose: () => void }) => {
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, reset } = useForm();
    const [AddCustomer] = useAddCustomerMutation()

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Processing...");
        data.date = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }))

        try {
            setLoading(true);

            const result = await AddCustomer(data);
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });

                reset();
                onClose();
            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.message}`, type: "error", isLoading: false, autoClose: 2000 });
            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='h-auto'>
            <form onSubmit={handleSubmit(onSubmit)} className="">

                <InputField
                    name="name"
                    label="কাস্টমারের নাম *"
                    control={control}
                    rules={{ required: "কাস্টমারের নাম নাই" }}
                />

                <InputField
                    name="phone"
                    label="মোবাইল নাম্বার *"
                    control={control}
                    rules={{ required: "মোবাইল নাম্বার নাই" }}
                />
                <SelectField
                    name="category"
                    label="ক্যাটেগরি *"
                    control={control}
                    rules={{ required: "ক্যাটেগরি নাই" }}
                    options={CATEGORY_OPTIONS}
                />
                <InputField
                    name="address"
                    label="ঠিকানা"
                    control={control}
                />




                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full p-2 mb-4"
                >
                    {loading ? (
                        <span className="loading loading-dots loading-lg"></span>
                    ) : (
                        "কাস্টমার যোগ করুন"
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddCustomer;