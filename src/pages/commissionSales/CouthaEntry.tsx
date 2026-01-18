/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useCreateSettlementMutation } from "../../redux/features/settlement/settlementApi";
import InputField from "../../components/form/InputFields";

const CouthaEntry = ({ onClose, supplier, lot }: { onClose: () => void, supplier: any, lot: any }) => {
    console.log(lot)
    const [loading, setLoading] = useState(false)
    const { handleSubmit, control, reset } = useForm();
    const [createCoutha] = useCreateSettlementMutation()
    const couthaFields = [
        { label: "ট্রাক ভাড়া", name: "truck_rent", type: "number" },
        { label: "পরিবহন ভাড়া", name: "transport_rent", type: "number" },
        { label: "কুলি", name: "kuli", type: "number" },
        { label: "হাওলাত", name: "haolat", type: "number" },
        { label: "আড়ত", name: "arot", type: "number" },
        { label: "ব্রোকারি", name: "brokary", type: "number" },
        { label: "তহরী", name: "tohori", type: "number" },
        { label: "গদি", name: "godi", type: "number" },
    ]
    const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
        setLoading(true);
        data.supplier = supplier;
        data.lot = lot
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await createCoutha(data);
            console.log(result)
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                reset();
                setLoading(false);
                onClose();

            } else {
                toast.update(toastId, { render: `${(result as any)?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });
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
        <div className="m-4">
            <h1 className="text-2xl text-center font-bold mb-4 ">বেপারীর চৌথা করুন </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}

            >

                <div className=" grid gap-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-2">

                    {
                        couthaFields?.map((entry) => (
                            <InputField
                                type={entry.type}
                                key={entry.name}
                                control={control}
                                name={entry.name}
                                label={entry.label}
                                rules={{ required: `${entry.label} নাই` }}
                            />
                        ))
                    }
                    <InputField
                        control={control}
                        label="বাদ"
                        name="description"
                        placeholder="যেমনঃ ৫ বস্তা নষ্ট "
                    />

                    <InputField
                        control={control}
                        label="আমদানী"
                        name="import"
                        placeholder="যেমনঃ মরিচ ৫০০ কেজি"
                        rules={{ required: `আমদানী  উল্লেখ নাই` }} />


                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full mt-2"
                >
                    {loading ? (
                        <span className="loading loading-dots loading-lg"></span>
                    ) : (
                        "সম্পন্ন করুন"
                    )}
                </button>
            </form>
        </div>
    );
};

export default CouthaEntry;