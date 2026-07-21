/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import TextAreaField from '../../components/form/TextAreaField';
import { useSendTxnSmsMutation } from '../../redux/features/customer/customerApi';
import { customRound } from '../../utils/customRound';

const MessageBox = ({ onClose, txn, phone, receiver }: { onClose: () => void, txn: any, phone: string, receiver: string }) => {
    const [loading, setLoading] = useState(false)
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            message: ''
        }
    });

    const [sendTxnSms] = useSendTxnSmsMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await sendTxnSms({ message: data.message, phone });
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


    useEffect(() => {
        if (txn) {
            reset({
                message: receiver === 'customer' ? `প্রিয় গ্রাহক,
আপনি ${txn?.amount} ${txn?.type === "credit" ? "টাকা জমা দিয়েছেন" : "টাকার পণ্য নিয়েছেন"}। বর্তমানে ${Math.abs(txn?.balance)} টাকা বকেয়া আছে।
ধন্যবাদ।
M.I Trading` :
                    `প্রিয় সাপ্লাইয়ার,
${txn?.amount} টাকা ${txn?.type === "credit" ? "মূল্যের পণ্য গ্রহণ করা হয়েছে" : "পরিশোধ করা হয়েছে"}। বর্তমান ${Math.abs(customRound(txn?.balance))} টাকা পাওনা।
ধন্যবাদ।
M.I Trading`
            });
        }
    }, [txn, reset]);

    return (
        <div className="m-4 ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" grid gap-4 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1"
            >
                <TextAreaField
                    name="message"
                    label=""
                    placeholder='মেসেজ লিখুন'
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
                            "মেসেজ পাঠান"
                        )}
                    </button>
                </div>
            </form>


        </div>
    );
};

export default MessageBox;