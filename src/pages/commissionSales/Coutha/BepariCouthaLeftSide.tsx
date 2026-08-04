import {
    addFinalSale,
    removeFinalSale,
    updateFinalSale,
} from "../../../redux/features/coutha/couthaSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";

const BepariCouthaLeftSide = () => {
    const dispatch = useAppDispatch();

    const finalSales = useAppSelector(
        (state) => state.coutha.finalSales
    );

    const handleChange = (
        index: number,
        field: "bosta" | "quantity" | "price",
        value: number
    ) => {
        dispatch(
            updateFinalSale({
                index,
                field,
                value,
            })
        );
    };

    return (
        <div>
            <div className="print:hidden">
                {finalSales.map((sale, index) => (
                    <div key={index} className="flex  gap-1 hover:bg-gray-50">
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

                        <div className="text-right">
                            {sale?.total?.toString()}
                        </div>

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

                <div>
                    <button
                        type="button"
                        className="btn btn-xs btn-primary w-full mt-1"
                        onClick={() => dispatch(addFinalSale())}
                    >
                        + Add Row
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

                            <td className="py-[2px] text-right">
                                {sale?.price}
                            </td>

                            <td className="py-[2px] text-right font-bold">
                                {(sale?.total).toLocaleString()}
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default BepariCouthaLeftSide;