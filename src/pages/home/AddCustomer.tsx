/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from '../../components/form/InputFields';
import { useForm, type FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAddCustomerMutation } from '../../redux/features/customer/customerApi';
import { useState } from 'react';

const AddCustomer = ({ onClose }: { onClose: () => void }) => {
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, reset } = useForm();
    const [AddCustomer] = useAddCustomerMutation()
    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Processing...");

        try {
            setLoading(true);

            const result = await AddCustomer(data);
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });

                reset();
                onClose();
            } else {
                toast.update(toastId, { render: `${(result as any)?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });
            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='p-4'>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

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

                <InputField
                    name="address"
                    label="ঠিকানা"
                    control={control}
                />



                <InputField
                    label="পূর্বের পাওনা"
                    name="previousDue"
                    type="number"
                    control={control}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full mt-2"
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