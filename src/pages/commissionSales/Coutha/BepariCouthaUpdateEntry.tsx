/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateBepariCouthaMutation } from "../../../redux/features/coutha/couthaApi";
import { useGetCommissionSalesSupplierLotWiseQuery } from "../../../redux/features/commissionSales/commissionSalesApi";
import CalculatorField from "../../cart/CalculatorField";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { setArot, setBrokery, setLabour, setTransportRent } from "../../../redux/features/coutha/couthaSlice";

const BepariCouthaUpdateEntry = ({ onClose, item }: { onClose: () => void, item: any }) => {
    const dispatch = useAppDispatch()
    const coutha = useAppSelector((state) => state.coutha);

    const { brokary, kuli, transport_rent, tohori, haolat, godi, arot, } = item;
    const subTotal = brokary + kuli + transport_rent + tohori + haolat + godi + arot
    const [loading, setLoading] = useState(false)

    const { data } = useGetCommissionSalesSupplierLotWiseQuery({ couthaOf: item.couthaOf })
    const sales = data?.data;
    const totalSales = sales?.reduce((sum: number, item: any) => sum + (item?.product?.quantity * item.product.salePrice), 0);


    const [updateBepariCoutha] = useUpdateBepariCouthaMutation()
    const onSubmit = async (data: FieldValues) => {
        data.subTotal = subTotal
        data.joma = totalSales - subTotal
        data.grandTotal = totalSales
        data.arot = coutha.arot,
            data.brokary = coutha.brokary,
            data.kuli = coutha.kuli

        const payload = {
            data,
            id: item._id,
        };
        setLoading(true)
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await updateBepariCoutha(payload);
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

    const { register, handleSubmit, reset } = useForm()
    useEffect(() => {
        if (item) reset(item);
    }, [item, reset]);



    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}

            >
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label>চৌথা নং</label>
                        <input {...register("invoice")} readOnly className="input" />
                    </div>
                    <div>
                        <label>আড়ত</label>
                        <CalculatorField
                            initialValue={arot}
                            onUpdate={(val) =>
                                dispatch(setArot(Number(val)))
                            }
                        />
                    </div>
                    <div>
                        <label>ব্রোকারি</label>
                        <CalculatorField
                            initialValue={brokary}
                            onUpdate={(val) =>
                                dispatch(setBrokery(Number(val)))
                            }
                        />
                    </div>


                    <div>
                        <label>আমদানি</label>
                        <input {...register("import")} className="input" />
                    </div>
                    <div>
                        <label>গদি</label>
                        <input {...register("godi")} type="number" className="input" />
                    </div>
                    <div>
                        <label>যদি বাদ যায়</label>
                        <input {...register("description")} className="input" placeholder="যেমনঃ ২ বস্তা নষ্ট" />
                    </div>
                    <div>
                        <label>কুলি</label>
                        <CalculatorField
                            initialValue={kuli}
                            onUpdate={(val) =>
                                dispatch(setLabour(Number(val)))
                            }
                        />
                    </div>
                    <div>
                        <label>হাওলাত</label>
                        <input {...register("haolat")} type="number" className="input" />
                    </div>
                    <div>
                        <label>তহরি</label>
                        <input {...register("tohori")} className="input" />
                    </div>
                    <div>
                        <label>লট</label>
                        <input {...register("lot")} readOnly className="input" />
                    </div>

                    <div>
                        <label>মোট পন্য বিক্রি</label>
                        <input defaultValue={totalSales} {...register("joma")} readOnly className="input" />
                    </div>

                    <div>
                        <label>পরিবহন ভাড়া</label>
                        <CalculatorField
                            initialValue={transport_rent}
                            onUpdate={(val) =>
                                dispatch(setTransportRent(Number(val)))
                            }
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full mt-2"
                >
                    {loading ? (
                        <span className="loading loading-dots loading-lg"></span>
                    ) : (
                        "তথ্য আপডেট করুন"
                    )}
                </button>
            </form>
        </div>
    );
};

export default BepariCouthaUpdateEntry;