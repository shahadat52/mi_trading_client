import { useState } from "react";
import { useGetKuliDataQuery } from "../../../redux/features/coutha/couthaApi";
import { useGetAllTxnQuery } from "../../../redux/features/inExTxn/inExTxnApi";
import { LIMIT_OPTIONS } from "../../../utils/options";

const LabourPage = ({ startDate, endDate }: any) => {
    const [limit, setLimit] = useState(10000)



    const { data: items } = useGetKuliDataQuery({
        startDate,
        toDate: endDate,
    });

    const fieldWiseData = items?.data;

    const sales =
        fieldWiseData?.sales?.reduce(
            (sum: number, item: any) =>
                sum + Number(item?.labour || 0),
            0
        ) ?? 0;

    const bepariSales =
        fieldWiseData?.couthas?.reduce(
            (sum: number, item: any) =>
                sum + Number(item?.kuli || 0),
            0
        ) ?? 0;

    const others =
        fieldWiseData?.others?.reduce(
            (sum: number, item: any) =>
                sum + Number(item?.amount || 0),
            0
        ) ?? 0;

    // কুলি খরচ
    const { data } = useGetAllTxnQuery({
        head: "expense",
        category: "kuli",
        startDate,
        endDate,
    });

    const transactions = data?.data?.data ?? [];

    const totalTxn = transactions?.reduce(
        (sum: number, txn: any) =>
            sum + Number(txn?.amount ?? txn?.amout ?? 0),
        0
    );
    // টেলা গাড়ি ভাড়া
    const { data: thelagari } = useGetAllTxnQuery({
        head: "income",
        category: "টেলা গাড়ি ভাড়া",
        limit,
        startDate,
        endDate,
    });

    const thelaTxn = thelagari?.data?.data ?? [];

    const totalThela = thelaTxn.reduce(
        (sum: number, txn: any) =>
            sum + Number(txn?.amount ?? txn?.amout ?? 0),
        0
    );

    // ভ্যান গাড়ি ভাড়া
    const { data: vangari } = useGetAllTxnQuery({
        head: "income",
        category: "ভ্যান গাড়ি ভাড়া",
        limit,
        startDate,
        endDate,
    });

    const vanTxn = vangari?.data?.data ?? [];

    const totalVan = vanTxn.reduce(
        (sum: number, txn: any) =>
            sum + Number(txn?.amount ?? txn?.amout ?? 0),
        0
    );

    // লেবার ঘর ভাড়া
    const { data: houseRent } = useGetAllTxnQuery({
        head: "income",
        category: "লেবার ঘর ভাড়া",
        limit,
        startDate,
        endDate,
    });

    const houseRentData = houseRent?.data?.data ?? [];

    const totalHouseRent = houseRentData.reduce(
        (sum: number, txn: any) =>
            sum + Number(txn?.amount ?? txn?.amout ?? 0),
        0
    );


    return (
        <div>
            <select
                id="limit"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="select select-bordered select-sm w-24 my-2"
            >
                {LIMIT_OPTIONS.map(({ value, label }: any) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>

            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 text-xs mb-15">
                {/* সকল পাওনা */}
                <div>
                    <h3 className="font-semibold mb-2">সকল পাওনা</h3>

                    <div className="overflow-x-auto">
                        <table className="table table-xs table-zebra w-full border border-gray-300">
                            <thead>
                                <tr className="font-bold">
                                    <td>মোট</td>
                                    <td className="text-right">
                                        {Number(sales) + Number(bepariSales) + Number(others)}
                                    </td>
                                </tr>
                            </thead>

                            <thead className="bg-gray-200">
                                <tr className="text-xs">
                                    <th>নাম</th>
                                    <th>ইনভয়েস</th>
                                    <th className="text-right">পরিমান</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td colSpan={3} className="font-bold text-center text-[14px] bg-red-600 text-white">
                                        অন্যান্য
                                    </td>
                                </tr>
                                {fieldWiseData?.others?.map((data: any, idx: number) => (
                                    <tr key={data?._id}>
                                        <td>{(idx + 1)}) {data?.note}</td>
                                        <td></td>
                                        <td className="text-right">
                                            {Number(data?.amount).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={3} className="font-bold text-center text-[14px] bg-red-600 text-white">
                                        সেলস
                                    </td>
                                </tr>
                                {fieldWiseData?.sales?.map((data: any, idx: number) => (
                                    <tr key={data?._id}>
                                        <td>{(idx + 1)}) {data?.customer?.name}</td>
                                        <td> {data?.invoice}</td>
                                        <td className="text-right">
                                            {Number(data?.labour).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={3} className="font-bold text-center text-[14px] bg-red-600 text-white">
                                        বেপারী
                                    </td>
                                </tr>
                                {fieldWiseData?.couthas?.map((data: any, idx: number) => (
                                    <tr key={data?._id}>
                                        <td>{(idx + 1)}) {data?.supplier?.name}</td>
                                        <td> {data?.invoice}</td>
                                        <td className="text-right">
                                            {Number(data?.kuli).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* সকল পরিশোধ */}
                <div>
                    <h3 className="font-semibold mb-2">সকল পরিশোধ</h3>

                    <div className="overflow-x-auto">
                        <table className="table table-xs table-zebra w-full border border-gray-300">
                            <thead>
                                <tr className="">
                                    <td>মোট</td>
                                    <td className="text-right">
                                        {Number(totalTxn) + Number(totalHouseRent) + Number(totalVan) + Number(totalThela)}
                                    </td>
                                </tr>
                            </thead>

                            <thead className="bg-gray-200">
                                <tr>
                                    <th>ইনভয়েস</th>
                                    <th className="text-right">পরিমান</th>
                                </tr>
                            </thead>

                            <tbody>
                                {houseRentData?.map((data: any) => (
                                    <tr key={data._id}>
                                        <td>{data.category}</td>
                                        <td className="text-right">
                                            {Number(data.amount).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                {transactions?.map((data: any) => (
                                    <tr key={data._id}>
                                        <td>{data.note}</td>
                                        <td className="text-right">
                                            {Number(data.amount).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}

                                {thelaTxn?.map((data: any) => (
                                    <tr key={data._id}>
                                        <td>{data.category}</td>
                                        <td className="text-right">
                                            {Number(data.amount).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                {vanTxn?.map((data: any) => (
                                    <tr key={data._id}>
                                        <td>{data.category}</td>
                                        <td className="text-right">
                                            {Number(data.amount).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}


                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LabourPage;