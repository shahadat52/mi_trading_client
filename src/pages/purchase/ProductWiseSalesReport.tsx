
type TSaleItem = {
    quantity: number;
    bosta: number;
    salePrice: number;
    totalAmount: number;
};

type TProductWiseSalesReport = {
    items: TSaleItem[];
    totalQuantity: number;
    totalBosta: number;
    totalAmount: number;
};

type Props = {
    report: TProductWiseSalesReport;
    productName?: string;
};

const ProductWiseSalesReport = ({ report, productName }: Props) => {
    const hasData = report?.items?.length > 0;

    return (
        <div className="w-full bg-white rounded-2xl shadow-md border border-gray-200 p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6 border-b pb-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                        Product Wise Sales Report
                    </h2>
                    {productName && (
                        <p className="text-sm text-gray-500 mt-1">
                            Product: <span className="font-medium text-gray-700">{productName}</span>
                        </p>
                    )}
                </div>

                <div className="text-sm text-gray-500">
                    Total Records:{" "}
                    <span className="font-semibold text-gray-700">{report?.items?.length || 0}</span>
                </div>
            </div>

            {/* Empty State */}
            {!hasData ? (
                <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-700">No Sales Data Found</h3>
                    <p className="text-sm text-gray-500 mt-2">
                        এই product-এর জন্য এখনো কোনো sales report পাওয়া যায়নি।
                    </p>
                </div>
            ) : (
                <>
                    {/* Table */}
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wide">
                                <tr>
                                    <th className="px-4 py-3 border-b">SL</th>
                                    <th className="px-4 py-3 border-b">Quantity</th>
                                    <th className="px-4 py-3 border-b">Bosta</th>
                                    <th className="px-4 py-3 border-b">Sale Price</th>
                                    <th className="px-4 py-3 border-b">Total Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {report?.items?.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 transition-colors duration-150"
                                    >
                                        <td className="px-4 py-3 font-medium text-gray-700">{index + 1}</td>
                                        <td className="px-4 py-3 text-gray-700">{item.quantity}</td>
                                        <td className="px-4 py-3 text-gray-700">{item.bosta}</td>
                                        <td className="px-4 py-3 text-gray-700">৳ {item.salePrice.toLocaleString()}</td>
                                        <td className="px-4 py-3 font-semibold text-green-700">
                                            ৳ {item.totalAmount.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
                            <p className="text-sm text-blue-600 font-medium">Total Quantity</p>
                            <h3 className="text-2xl font-bold text-blue-800 mt-2">
                                {report.totalQuantity}
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 shadow-sm">
                            <p className="text-sm text-amber-600 font-medium">Total Bosta</p>
                            <h3 className="text-2xl font-bold text-amber-800 mt-2">
                                {report.totalBosta}
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-green-100 bg-green-50 p-5 shadow-sm">
                            <p className="text-sm text-green-600 font-medium">Total Amount</p>
                            <h3 className="text-2xl font-bold text-green-800 mt-2">
                                ৳ {report.totalAmount.toLocaleString()}
                            </h3>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductWiseSalesReport;