import { useGetFieldWiseDataQuery } from "../../../redux/features/coutha/couthaApi";
import { useGetAllTxnQuery } from "../../../redux/features/inExTxn/inExTxnApi";

const LabourPage = ({ action, startDate, endDate }: any) => {
    const { data: items } = useGetFieldWiseDataQuery({ field: action, startDate, toDate: endDate });
    const fieldWiseData = items?.data;
    const sales = fieldWiseData?.sales?.reduce((sum: number, item: any) => sum + Number(item.labour || 0), 0)
    const bepariSales = fieldWiseData?.couthas?.reduce((sum: number, item: any) => sum + Number(item.kuli || 0), 0)
    const purchases = fieldWiseData?.purchases?.reduce((sum: number, item: any) => sum + Number(item.labour || 0), 0)
    const { data } = useGetAllTxnQuery({ category: 'kuli', startDate, endDate })
    const transactions = data?.data?.data
    return (
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
                                    {sales + purchases + bepariSales}
                                </td>
                            </tr>
                        </thead>

                        <thead className="bg-gray-200">
                            <tr className="text-xs">
                                <th>ইনভয়েস</th>
                                <th className="text-right">পরিমান</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td colSpan={2} className="font-bold bg-gray-100">
                                    সেলস
                                </td>
                            </tr>
                            {fieldWiseData?.sales?.map((data: any, idx: number) => (
                                <tr key={data?._id}>
                                    <td>{(idx + 1)}) {data?.invoice}</td>
                                    <td className="text-right">
                                        {Number(data?.labour).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={2} className="font-bold bg-gray-100">
                                    সেলস
                                </td>
                            </tr>
                            {fieldWiseData?.couthas?.map((data: any, idx: number) => (
                                <tr key={data?._id}>
                                    <td>{(idx + 1)}) {data?.invoice}</td>
                                    <td className="text-right">
                                        {Number(data?.kuli).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={2} className="font-bold bg-gray-100">
                                    সেলস
                                </td>
                            </tr>
                            {fieldWiseData?.purchases?.map((data: any, idx: number) => (
                                <tr key={data?._id}>
                                    <td>{(idx + 1)}) {data?.invoice}</td>
                                    <td className="text-right">
                                        {Number(data?.labour).toLocaleString()}
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
                                    {transactions
                                        ?.reduce(
                                            (sum: number, item: any) =>
                                                sum + Number(item.amount || 0),
                                            0
                                        )
                                        .toLocaleString()}
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
                            {transactions?.map((data: any) => (
                                <tr key={data._id}>
                                    <td>{data.note}</td>
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
    );
};

export default LabourPage;