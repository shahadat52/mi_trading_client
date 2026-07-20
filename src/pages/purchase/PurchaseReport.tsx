import { useParams } from "react-router";
import { useGetProductWiseSalesReportsQuery, useGetRegualarPurchaseByIdQuery } from "../../redux/features/purchase/purchaseApi";
import SummaryCard from "./SummaryCard";
import CardSkeleton from "../../components/CardSkeleton";
import { useGetCouthaByProductIdQuery } from "../../redux/features/coutha/couthaApi";

const PurchaseReport = () => {
    const { id } = useParams();
    const { data: purchaseData } = useGetRegualarPurchaseByIdQuery(id, {
        skip: !id,
    });
    const { data: bepariCoutha } = useGetCouthaByProductIdQuery(id)
    const { data, isLoading, error } = useGetProductWiseSalesReportsQuery(id);
    const reports = data?.data;
    const bepariCouthaData = bepariCoutha?.data;
    const productName = data?.data?.product
    const products = data?.data?.items?.length;
    const summeryCart = [
        { head: "মোট বিক্রয়", value: reports?.totalAmount },
        { head: "মোট পণ্য", value: reports?.totalQuantity, unit: reports?.unit },
        { head: "মোট বস্তা", value: reports?.totalBosta },
    ]

    if (isLoading) {
        return <CardSkeleton />
    }


    const purchase = purchaseData?.data;
    const isCommission = reports?.items?.some((item: any) => item.commission >= 0);
    const commission = reports?.items?.reduce((sum: number, item: any) =>
        sum + item.commission, 0
    );
    const cost = Number(purchase?.labour) + purchase?.commission + (purchase?.purchaseQty * purchase?.purchasePrice)
    return (
        <div className="w-full mb-16 mx-auto rounded-2xl mt-4 bg-white  shadow-md border border-gray-200 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6 border-b pb-4">
                <div>
                    <h2 className="uppercase text-xl md:text-2xl font-bold text-gray-800">
                        Sales Reports
                    </h2>
                    {productName && (
                        <p className="text-sm text-gray-500 mt-1">
                            Product: <span className="font-medium text-gray-700">{productName}</span>
                        </p>
                    )}
                </div>

                <div className="text-sm text-gray-500">
                    Total Records:{" "}
                    <span className="font-semibold text-gray-700">{reports?.items?.length || 0}</span>
                </div>
            </div>

            {/* Empty State */}
            {error || products <= 0 ? (
                <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-700">No Sales Data Found</h3>
                    <p className="text-sm text-gray-500 mt-2">
                        এই পন্য এখনো বিক্রি হয়নি।
                    </p>
                </div>
            ) : (
                <>
                    {/* Table */}
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wide">
                                <tr>
                                    <th className="px-2 py-3 border-b">SL</th>
                                    <th className="px-2 py-3 border-b">Qty</th>
                                    <th className="px-2 py-3 border-b">Bosta</th>
                                    <th className="px-2 py-3 border-b">Price</th>
                                    <th className="px-2 py-3 border-b">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {reports?.items?.map((item: any, index: number) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 transition-colors duration-150"
                                    >
                                        <td className="px-2 py-3 font-medium text-gray-700">{index + 1}</td>
                                        <td className="px-2 py-3 text-gray-700">{item.quantity}</td>
                                        <td className="px-2 py-3 text-gray-700">{item.bosta}</td>
                                        <td className="px-2 py-3 text-gray-700">৳ {item.salePrice.toLocaleString()}</td>
                                        <td className="px-2 py-3 font-semibold text-green-700">
                                            ৳ {item.totalAmount.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

                        {
                            summeryCart?.map((item: any, idx: number) => (<SummaryCard key={idx} head={item.head} value={item.value} unit={item?.unit} />))
                        }
                        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-2 py-5 shadow-sm">
                            <p className="text-sm text-blue-600 font-medium">প্রফিট</p>
                            <h3 className="text-sm font-semibold text-blue-800 mt-2">

                                {
                                    isCommission ? (commission + bepariCouthaData?.arot || 0) :
                                        <p>{(Number(reports?.totalAmount) || 0)} - {(Number(cost) || 0)} = {((Number(reports?.totalAmount) || 0) - (Number(cost) || 0))}</p>
                                }
                            </h3>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PurchaseReport;