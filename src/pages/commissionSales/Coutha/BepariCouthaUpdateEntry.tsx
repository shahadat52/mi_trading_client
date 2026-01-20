/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateBepariCouthaMutation } from "../../../redux/features/settlement/settlementApi";
import { useGetCommissionSalesSupplierLotWiseQuery } from "../../../redux/features/commissionSales/commissionSalesApi";

const BepariCouthaUpdateEntry = ({ onClose, item }: { onClose: () => void, item: any }) => {
    const { brokary, kuli, truck_rent, transport_rent, tohori, haolat, godi, arot, } = item;

    const subTotal = brokary + kuli + truck_rent + transport_rent + tohori + haolat + godi + arot
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, reset } = useForm()
    useEffect(() => {
        if (item) reset(item);
    }, [item, reset]);

    const { data } = useGetCommissionSalesSupplierLotWiseQuery({ supplier: item?.supplier?._id, lot: item?.lot })
    const sales = data?.data || []
    const totalSales = sales?.map((sale: any) => (sale.items.total)).reduce((sum: number, item: number) => sum + item, 0);

    const [updateBepariCoutha] = useUpdateBepariCouthaMutation()
    const onSubmit = async (data: FieldValues) => {
        data.subTotal = subTotal
        data.joma = totalSales - subTotal
        data.grandTotal = totalSales
        const payload = {
            data,
            id: item._id
        }
        setLoading(true)
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await updateBepariCoutha(payload)
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
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}

            >
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label>নং</label>
                        <input {...register("invoice")} readOnly className="input" />
                    </div>
                    <div>
                        <label>আড়ত</label>
                        <input {...register("arot")} type="number" className="input" />
                    </div>
                    <div>
                        <label>বোকারি</label>
                        <input {...register("brokary")} type="number" className="input" />
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
                        <input {...register("description")} className="input" />
                    </div>
                    <div>
                        <label>কুলি</label>
                        <input {...register("kuli")} type="number" className="input" />
                    </div>
                    <div>
                        <label>হাওলাত</label>
                        <input {...register("haolat")} type="number" className="input" />
                    </div>
                    <div>
                        <label>তোহরি</label>
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
                        <label>ট্রান্সপোর্ট ভাঁড়া</label>
                        <input {...register("transport_rent")} type="number" className="input" />
                    </div>
                    <div>
                        <label>ট্রাক ভাঁড়া</label>
                        <input {...register("truck_rent")} type="number" className="input" />
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