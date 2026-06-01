import { useGetFieldWiseDataQuery } from "../../../redux/features/coutha/couthaApi";
import { useGetAllTxnQuery } from "../../../redux/features/inExTxn/inExTxnApi";


const GodiPage = ({ action, startDate, endDate }: any) => {
    const { data: items } = useGetFieldWiseDataQuery({ field: action, startDate, toDate: endDate });
    const fieldWiseData = items?.data;
    const { data } = useGetAllTxnQuery({ category: 'godi', startDate, endDate })
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
                                    {fieldWiseData
                                        ?.reduce(
                                            (sum: number, item: any) =>
                                                sum + Number(item.godi || 0),
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
                            {fieldWiseData?.map((data: any) => (
                                <tr key={data._id}>
                                    <td>{data.invoice}</td>
                                    <td className="text-right">
                                        {Number(data.godi).toLocaleString()}
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
                            <tr className="text-xs">
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

export default GodiPage;