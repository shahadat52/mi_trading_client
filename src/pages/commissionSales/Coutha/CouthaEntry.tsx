/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import InputField from "../../../components/form/InputFields";
import { useCreateCouthaMutation } from "../../../redux/features/coutha/couthaApi";
import CalculatorField from "../../cart/CalculatorField";
import { setLabour, setTransportRent } from "../../../redux/features/coutha/couthaSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";

const CouthaEntry = ({ onClose, supplier, selectedItem: lot }: { onClose: () => void, supplier: any, selectedItem: any }) => {
    const coutha = useAppSelector((state) => state.coutha);
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const { handleSubmit, control, reset } = useForm();
    const [createCoutha] = useCreateCouthaMutation()
    const couthaFields = [
        { label: "হাওলাত/নগদ", name: "haolat", type: "number" },
        { label: "আড়ত", name: "arot", type: "number" },
        { label: "ব্রোকারি", name: "brokary", type: "number" },
        { label: "তহরী", name: "tohori", type: "number" },
        { label: "গদি", name: "godi", type: "number" },
    ]
    const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
        setLoading(true);
        data.supplier = supplier;
        data.lot = lot
        data.couthaOf = lot._id
        data.kuli = coutha.kuli
        data.transport_rent = coutha.transport_rent
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await createCoutha(data);
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
                    <div>
                        <label>কুলি</label>
                        <CalculatorField
                            initialValue={coutha.kuli}
                            onUpdate={(val) =>
                                dispatch(setLabour(Number(val)))
                            }
                        />
                    </div>

                    <div>
                        <label>পরিবহন ভাড়া</label>
                        <CalculatorField
                            initialValue={coutha.transport_rent}
                            onUpdate={(val) =>
                                dispatch(setTransportRent(Number(val)))
                            }
                        />
                    </div>
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
                        name="importDate"
                        label="তারিখ"
                        control={control}
                        type="datetime-local"
                    />
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