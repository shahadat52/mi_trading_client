/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import InputField from '../../components/form/InputFields';
import { useCommissionProductEntryMutation } from '../../redux/features/commissionProduct/commissionProductApi';
import SupplierSearchableSelectField from './SupplierSearchableSelectField';
import { useAppSelector } from '../../redux/hook';
import SelectField from '../../components/form/SelectField';
import { units } from '../../utils/units';

const CommissionProductEntry = ({ onClose }: { onClose: () => void }) => {
    const state = useAppSelector((state) => state.commissionProduct);
    const [loading, setLoading] = useState(false)
    const { handleSubmit, control, reset } = useForm();
    const [addProduct] = useCommissionProductEntryMutation()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        data.supplier = state.supplier
        setLoading(true);
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await addProduct(data);
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
            <h1 className="text-2xl text-center font-bold mb-4 ">নতুন পন্য যুক্ত করূন </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" grid gap-4 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1"
            >

                <SupplierSearchableSelectField />
                <InputField
                    label="পন্য নাম"
                    name="name"
                    control={control}
                    rules={{ required: "পন্য নাম নাই" }}
                />

                <SelectField
                    label="পন্যের ইউনিট"
                    name="unit"
                    control={control}
                    rules={{ required: "পন্যের ইউনিট নাই" }}
                    options={units}
                />


                <InputField
                    label="পন্যের পরিমান"
                    type='number'
                    name="quantity"
                    control={control}
                    rules={{ required: "পন্যের পরিমান নাই" }}
                />
                <InputField
                    control={control}
                    type='number'
                    name="commissionRate"
                    label="কমিশন হার"
                    rules={{ required: "কমিশন হার দেওয়া বাধ্যতামূলক" }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full mt-2"
                >
                    {loading ? (
                        <span className="loading loading-dots loading-lg"></span>
                    ) : (
                        "নতুন পন্য যুক্ত করুন"
                    )}
                </button>
            </form>
        </div>
    );
};

export default CommissionProductEntry;