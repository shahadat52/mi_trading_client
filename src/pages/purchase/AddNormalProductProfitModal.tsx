/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAddProfitMutation } from '../../redux/features/purchase/purchaseApi';
import InputField from '../../components/form/InputFields';

const AddNormalProductProfit = ({ onClose, product, profit }: { onClose: () => void, product: any, profit: number }) => {

    const [loading, setLoading] = useState(false)
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            profit
        }
    });

    const [addNormalProductProfit] = useAddProfitMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const isConfirm = confirm("সকল পন্য বিক্রি শেষ?")

        if (!isConfirm) {
            return
        }
        data.isSettelment = true
        setLoading(true);
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result: any = await addNormalProductProfit({ id: product._id, data });
            if (result?.data?.success) {
                toast.update(toastId, {
                    render: result.data.message,
                    type: "success",
                    isLoading: false,
                    autoClose: 1500,
                    closeOnClick: true
                });
                reset();
                onClose();
            } else {
                const errorMsg = result?.error?.data?.message || result?.data?.message || "Failed to process";
                toast.update(toastId, {
                    render: errorMsg,
                    type: "error",
                    isLoading: false,
                    autoClose: 2000
                });
            }
        } catch (err: any) {
            const errorMessage = err?.data?.message || err?.message || "Something went wrong!";
            toast.update(toastId, {
                render: errorMessage,
                type: "error",
                isLoading: false,
                autoClose: 2000
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (product) {
            reset({
                profit
            });
        }
    }, [product, reset]);

    return (
        <div className="m-4 ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" grid gap-4 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1"
            >
                <div className="rounded-xl border bg-white p-4 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800 border-b pb-2">
                        {product?.product}
                    </h2>

                    <div className="mt-3 grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-slate-50 p-3 text-center">
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                                Bags
                            </p>
                            <p className="text-xl font-bold text-slate-800">
                                {product?.purchaseBosta}
                            </p>
                        </div>

                        <div className="rounded-lg bg-slate-50 p-3 text-center">
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                                Weight
                            </p>
                            <p className="text-xl font-bold text-slate-800">
                                {product?.purchaseQty} <span className="text-sm">Kg</span>
                            </p>
                        </div>
                    </div>
                </div>

                <InputField
                    name="profit"
                    label=""
                    placeholder='লাভ বা লস এর পরিমান লিখুন'
                    control={control}
                />

                <div className='flex justify-between items-center gap-3'>


                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary  mt-2"
                    >
                        {loading ? (
                            <span className="loading loading-dots loading-lg"></span>
                        ) : (
                            "ADD PROFIT"
                        )}
                    </button>
                </div>
            </form>


        </div>
    );
};


export default AddNormalProductProfit;