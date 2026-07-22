/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import InputField from '../../components/form/InputFields';
import { useAddProfitCommissionProductMutation } from '../../redux/features/commissionProduct/commissionProductApi';

const AddCommissionProductProfit = ({ onClose, product, profit }: { onClose: () => void, product: any, profit: number }) => {
    const [loading, setLoading] = useState(false)
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            profit
        }
    });

    const [addCommissionProdProfit] = useAddProfitCommissionProductMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // টাইপো ঠিক করা ভালো (isSettelment -> isSettlement যদি বানান ভুল থাকে)
        data.isSettelment = true;
        setLoading(true);
        const toastId = toast.loading("Processing...", { autoClose: 2000 });

        try {
            const result: any = await addCommissionProdProfit({ id: product.couthaOf, data });

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
        <div className="m-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" grid gap-4 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1"
            >
                <div className="rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4">
                        <h2 className="text-xl font-bold text-white">
                            Supplier Information
                        </h2>
                    </div>

                    {/* Body */}
                    <div className="p-5 space-y-5">

                        {/* Supplier */}
                        <div className="flex items-start justify-between  pb-4">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Supplier
                                </p>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {product?.supplier?.name || "N/A"}
                                </h3>
                            </div>


                        </div>

                        {/* Import */}
                        <div>
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                                Import Information
                            </p>

                            <div className="mt-2 rounded-lg border bg-gray-50 p-3">
                                <p className="text-gray-700 leading-relaxed">
                                    {product?.import || "No import information available"}
                                </p>
                            </div>
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

export default AddCommissionProductProfit;