import { useState } from "react";
import { endOfDay, format, startOfDay } from "date-fns";
import { useGetTotalProfitCommissionProductQuery } from "../../../redux/features/commissionProduct/commissionProductApi";
import { useGetTotalProfitNormalProductQuery } from "../../../redux/features/purchase/purchaseApi";
import { LIMIT_OPTIONS } from "../../../utils/options";

const ProfitLossPage = () => {
    const [limit, setLimit] = useState(10);

    const [startDate, setStartDate] = useState(
        format(startOfDay(new Date()), "yyyy-MM-dd")
    );

    const [endDate, setEndDate] = useState(
        format(endOfDay(new Date()), "yyyy-MM-dd")
    );

    const {
        data: normal,
        isLoading: normalLoading,
        isError: normalError,
    } = useGetTotalProfitNormalProductQuery({
        startDate,
        endDate,
        limit,
    });

    const {
        data: commission,
        isLoading: commissionLoading,
        isError: commissionError,
    } = useGetTotalProfitCommissionProductQuery({
        startDate,
        endDate,
        limit,
    });

    const normalProfit = normal?.data;
    const commissionProfit = commission?.data;

    if (normalLoading || commissionLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (normalError || commissionError) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="alert alert-error max-w-lg">
                    <span>Something went wrong while loading profit report.</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 m-2 ">

            {/* Filters */}

            <div className="bg-white rounded-xl shadow border p-5">
                <div className="grid md:grid-cols-3 gap-4">

                    <div>
                        <label className="font-medium mb-1 block">Start Date</label>
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="font-medium mb-1 block">End Date</label>
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="font-medium mb-1 block">Limit</label>
                        <select
                            className="select select-bordered w-full"
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                        >
                            {LIMIT_OPTIONS.map((opt: any) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
            </div>

            {/* Profit Cards */}

            <div className="grid lg:grid-cols-2 gap-6 mb-18">

                {/* Normal */}

                <div className="bg-white rounded-xl shadow border">

                    <div className="border-b px-5 py-4 flex justify-between items-center">
                        <h2 className="text-xl font-bold">
                            Normal Product Profit
                        </h2>

                        <div className="text-green-600 font-bold text-lg">
                            ৳ {normalProfit?.totalProfit || 0}
                        </div>
                    </div>

                    <div className="overflow-x-auto">

                        <table className="table table-zebra">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Bag</th>
                                    <th>Quantity</th>
                                    <th className="text-right">Profit</th>
                                </tr>
                            </thead>

                            <tbody>

                                {normalProfit?.products?.length ? (
                                    normalProfit.products.map((item: any, index: number) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.product}</td>
                                            <td>{item.purchaseBosta}</td>
                                            <td>{item.purchaseQty}</td>
                                            <td className="text-right font-semibold text-green-600">
                                                ৳ {item.profit}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="text-center py-8 text-gray-500"
                                        >
                                            No Profit Data Found
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>
                </div>

                {/* Commission */}

                <div className="bg-white rounded-xl shadow border">

                    <div className="border-b px-5 py-4 flex justify-between items-center">
                        <h2 className="text-xl font-bold">
                            Commission Product Profit
                        </h2>

                        <div className="text-blue-600 font-bold text-lg">
                            ৳ {commissionProfit?.totalProfit || 0}
                        </div>
                    </div>

                    <div className="overflow-x-auto">

                        <table className="table table-zebra">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Bag</th>
                                    <th>Quantity</th>
                                    <th className="text-right">Profit</th>
                                </tr>
                            </thead>

                            <tbody>

                                {commissionProfit?.products?.length ? (
                                    commissionProfit.products.map((item: any, index: number) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.supplyBosta}</td>
                                            <td>{item.supplyQty}</td>
                                            <td className="text-right font-semibold text-blue-600">
                                                ৳ {item.profit}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="text-center py-8 text-gray-500"
                                        >
                                            No Profit Data Found
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfitLossPage;