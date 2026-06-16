import { useGetFieldWiseDataQuery } from "../../../redux/features/coutha/couthaApi";


const BepariCommissionPage = ({ action, startDate, endDate }: any) => {
    const { data: items } = useGetFieldWiseDataQuery({ field: action === 'commission' ? 'arot' : action, startDate, toDate: endDate });
    const fieldWiseData = items?.data
    const sales = fieldWiseData?.sales?.reduce((sum: number, item: any) => sum + Number(item.arot || 0), 0)
    const couthas = fieldWiseData?.couthas?.reduce((sum: number, item: any) => sum + Number(item.arot || 0), 0)


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
                                    {sales}
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
                            <tr>
                                <td colSpan={2} className="font-bold bg-gray-100">
                                    সেলস
                                </td>
                            </tr>
                            {fieldWiseData?.sales?.map((data: any, idx: number) => (
                                <tr key={data?._id}>
                                    <td>{(idx + 1)}) {data?.invoice}</td>
                                    <td className="text-right">
                                        {Number(data?.arot).toLocaleString()}
                                    </td>
                                </tr>
                            ))}


                        </tbody>


                    </table>
                </div>
            </div>

            {/* সকল পরিশোধ */}
            <div>
                <h3 className="font-semibold mb-2"> বেপারী কমিশন</h3>

                <div className="overflow-x-auto">
                    <table className="table table-xs table-zebra w-full border border-gray-300">


                        <thead>
                            <tr className="">
                                <td>মোট</td>
                                <td className="text-right">
                                    {couthas}
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
                                    বেপারী
                                </td>
                            </tr>
                            {fieldWiseData?.couthas?.map((data: any, idx: number) => (
                                <tr key={data?._id}>
                                    <td>{(idx + 1)}) {data?.invoice}</td>
                                    <td className="text-right">
                                        {Number(data?.arot).toLocaleString()}
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

export default BepariCommissionPage;