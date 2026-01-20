/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import InputField from '../../components/form/InputFields';
import SelectField from '../../components/form/SelectField';
import { customerTxnType } from '../../utils/transactionType';
import { useUpdateSupplierTxnDataMutation } from '../../redux/features/supplierTxn/supplierTxnApi';

const EditSupplierTxn = ({ onClose, id }: { onClose: () => void, id: string }) => {
    const [loading, setLoading] = useState(false)
    const { handleSubmit, control, reset } = useForm();
    const [updateTxn] = useUpdateSupplierTxnDataMutation()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await updateTxn({ data, id });
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
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" grid gap-4 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1"
            >

                <div className='flex items-center gap-2'>
                    <SelectField
                        name="type"
                        label="no"
                        placeholder='লেনদেনের ধরণ'
                        options={customerTxnType}
                        control={control}

                    />

                    <div className='mt-[14px]'>
                        <InputField

                            name="amount"
                            label=""
                            placeholder='কত টাকা *'
                            type='number'
                            control={control}

                        />
                    </div>


                </div>
                <InputField
                    name="description"
                    label=""
                    placeholder='বিবরণ'
                    type='text'
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
                        "আপডেট করুন"
                    )}
                </button>
            </form>
        </div>
    );
};

export default EditSupplierTxn;