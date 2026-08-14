import { useEffect } from "react";
import { useParams } from "react-router";
import { useAddSalesHistoryMutation } from "../../../redux/features/coutha/couthaApi";
import {
    addFinalSale,
    removeFinalSale,
    setSalesHistory,
    updateFinalSale,
} from "../../../redux/features/coutha/couthaSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { customRound } from "../../../utils/customRound";
import { toast } from "react-toastify";

const BepariCouthaLeftSide = ({ coutha, salesHistoryController }: any) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const finalSales = useAppSelector((state) => state.coutha.finalSales);

    // শুধু id বদলালে (নতুন পেইজ লোড হলে) coutha.sales থেকে state সেট হবে
    useEffect(() => {
        dispatch(setSalesHistory(coutha.sales || []));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [salesHistoryController]);

    const handleChange = (
        index: number,
        field: "bosta" | "quantity" | "price",
        value: number
    ) => {
        dispatch(updateFinalSale({ index, field, value }));
    };

    const [addSalesHistory] = useAddSalesHistoryMutation();

    const saveSalesHistory = async (id: any) => {


        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await addSalesHistory({ data: finalSales, id });
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });

            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });

            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });
        } finally {
            // reset()
        }
    };

    const totalBosta = finalSales?.reduce((total: number, item: any) => total + Number(item.bosta || 0), 0);
    const totalQuantity = finalSales?.reduce((total: number, item: any) => total + Number(item.quantity || 0), 0);
    const salesHistory = finalSales?.reduce((acc, item) => acc + Number(item.quantity) * Number(item.price), 0) ?? 0;

    return (
        <div>
            <div className="print:hidden">
                {finalSales?.map((sale, index) => (
                    <div key={index} className="flex gap-1 hover:bg-gray-50">
                        <div>
                            <input
                                type="number"
                                className="input input-xs input-bordered w-10"
                                value={sale.bosta}
                                onChange={(e) =>
                                    handleChange(index, "bosta", Number(e.target.value))
                                }
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                className="input input-xs input-bordered w-12"
                                value={sale.quantity}
                                onChange={(e) =>
                                    handleChange(index, "quantity", Number(e.target.value))
                                }
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                className="input input-xs input-bordered w-10"
                                value={sale.price}
                                onChange={(e) =>
                                    handleChange(index, "price", Number(e.target.value))
                                }
                            />
                        </div>
                        <div className="text-right">{customRound(sale?.total)?.toString()}</div>
                        <div className="text-center">
                            <button
                                type="button"
                                className="text-red-500 font-bold ml-2"
                                onClick={() => dispatch(removeFinalSale(index))}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}

                <div className="grid grid-cols-3 gap-1">
                    <button
                        type="button"
                        className="col-span-2 btn btn-xs btn-primary w-full mt-1"
                        onClick={() => dispatch(addFinalSale())}
                    >
                        + Add Row
                    </button>
                    <button
                        type="button"
                        className="btn btn-xs btn-primary w-full mt-1"
                        onClick={() => saveSalesHistory(id)}
                    >
                        + Save
                    </button>
                </div>
            </div>

            <table className="w-full text-[12px] text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200 text-black">
                        <th className="py-1">পরিমাণ</th>
                        <th className="py-1 text-right">দর</th>
                        <th className="py-1 text-right">মোট</th>
                        <th className="py-1 print:hidden"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[12px]">
                    {finalSales?.map((sale: any, idx: number) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            <td className="py-[2px]">
                                {sale?.bosta} | {sale?.quantity} kg
                            </td>
                            <td className="py-[2px] text-right">{sale?.price}</td>
                            <td className="py-[2px] text-right font-bold">
                                {customRound(sale?.total)?.toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-auto border-t pt-2 border-gray-300  flex justify-between  text-sm">
                <span className="text-sm " > মোট: {totalBosta} | {totalQuantity} কেজি </span>
                <span className="font-bold border-b border-dashed">{salesHistory?.toLocaleString()} ৳</span>
            </div>
        </div>
    );
};

export default BepariCouthaLeftSide;