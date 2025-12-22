/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router";
import * as XLSX from "xlsx";
import { useGetCommissionPurchaseByIdQuery } from "../../redux/features/purchase/purchaseApi";
import TableSkeleton from "../../components/table/TableSkeleton";
import ErrorBoundary from "../../components/ErrorBoundary";
import ButtonPdf from "../../components/buttons/ButtonPdf";
import ButtonExcel from "../../components/buttons/ButtonExcel";

const CommissionSupplierPage = () => {
    const { id } = useParams();

    const tableHeads = ["Product", "Quantity", "Price", "Total", "Date", "Action"];

    const { data, isLoading, isError } = useGetCommissionPurchaseByIdQuery(id);
    const commissionPurchases = data?.data;

    // ----------- Export Excel -----------
    const handleExportExcel = () => {
        if (!commissionPurchases) return;

        const rows = commissionPurchases.map((item: any) => ({
            Product: item.product.name,
            Quantity: item.stockQty,
            Price: item.product.purchasePrice,
            Total: item.stockQty * item.product.purchasePrice,
            Date: new Date(item.purchaseDate).toLocaleDateString("en-GB"),
        }));

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Purchases");

        XLSX.writeFile(workbook, `commission_purchases_${Date.now()}.xlsx`);
    };

    // ----------- Export PDF (Best UX) -----------
    const handleExportPDF = () => {
        const printArea = document.getElementById("printArea");
        if (!printArea) return;

        const win = window.open("", "_blank");
        win!.document.write(`
            <html>
            <head>
                <title>Commission Purchase Report</title>
                <style>
                    body {
                        font-family: 'Segoe UI', sans-serif;
                        padding: 20px;
                    }
                    h2 {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid #333;
                        padding: 6px;
                        font-size: 14px;
                        text-align: left;
                    }
                    th {
                        background: #f0f0f0;
                    }
                </style>
            </head>
            <body>
                ${printArea.innerHTML}
            </body>
            </html>
        `);

        win!.document.close();
        win!.focus();
        win!.print();
        win!.close();
    };

    // ---- Loading ----
    if (isLoading) {
        return (
            <div className="p-5 bg-white shadow rounded-xl border">
                <h2 className="text-lg font-semibold mb-4">Loading...</h2>
                <TableSkeleton row={6} />
            </div>
        );
    }

    // ---- Error ----
    if (isError) {
        return (
            <div className="p-5 bg-white shadow rounded-xl border text-center">
                <ErrorBoundary message="ডেটা লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।" />
            </div>
        );
    }

    // ---- Empty ----
    if (!commissionPurchases || commissionPurchases.length === 0) {
        return (
            <div className="p-5 bg-white shadow rounded-xl border text-center py-16">
                <p className="text-gray-500 text-lg">কোনো পারচেজ ডেটা পাওয়া যায়নি।</p>
            </div>
        );
    }

    return (
        <div className="p-5 bg-white shadow rounded-xl border">
            <h2 className="text-lg font-semibold mb-4">
                {commissionPurchases?.[0]?.supplier?.name} এর সাপ্লাইঃ
            </h2>

            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            {tableHeads.map((head, i) => (
                                <th key={i} className="px-4 py-3 text-left font-medium">
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {commissionPurchases.map((item: any) => (
                            <tr key={item._id} className="border-t hover:bg-gray-50 transition">
                                <td className="px-4 py-2">{item?.product.name}</td>
                                <td className="px-4 py-2">{item?.stockQty}</td>
                                <td className="px-4 py-2">{item?.product.purchasePrice}</td>
                                <td className="px-4 py-2">
                                    {item?.stockQty * item?.product.purchasePrice}
                                </td>
                                <td className="px-4 py-2">
                                    {new Date(item?.purchaseDate).toLocaleDateString("en-GB")}
                                </td>
                                <td className="px-4 py-2 flex gap-2">
                                    <ButtonPdf handleExportPDF={handleExportPDF} />
                                    <ButtonExcel handleExportExcel={handleExportExcel} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden space-y-4">
                {commissionPurchases.map((item: any) => (
                    <div key={item._id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Product</span>
                            <span className="font-medium">{item.product.name}</span>
                        </div>

                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Quantity</span>
                            <span>{item.stockQty}</span>
                        </div>

                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Price</span>
                            <span>{item.product.purchasePrice}</span>
                        </div>

                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Total</span>
                            <span className="font-semibold">
                                {item.stockQty * item.product.purchasePrice}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Date</span>
                            <span>
                                {new Date(item.purchaseDate).toLocaleDateString("en-GB")}
                            </span>
                        </div>

                        <div className="flex justify-between mt-3">
                            <ButtonPdf handleExportPDF={handleExportPDF} />
                            <ButtonExcel handleExportExcel={handleExportExcel} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Hidden Printable Area */}
            <div id="printArea" className="hidden">
                <h2 className="text-xl font-bold mb-4">
                    {commissionPurchases?.[0]?.supplier?.name} এর কমিশন ক্রয় রিপোর্ট
                </h2>

                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-2 py-1">প্রোডাক্ট</th>
                            <th className="border px-2 py-1">পরিমাণ</th>
                            <th className="border px-2 py-1">মূল্য</th>
                            <th className="border px-2 py-1">মোট</th>
                            <th className="border px-2 py-1">তারিখ</th>
                        </tr>
                    </thead>

                    <tbody>
                        {commissionPurchases?.map((item: any) => (
                            <tr key={item._id}>
                                <td className="border px-2 py-1">{item.product.name}</td>
                                <td className="border px-2 py-1">{item.stockQty}</td>
                                <td className="border px-2 py-1">{item.product.purchasePrice}</td>
                                <td className="border px-2 py-1">
                                    {item.stockQty * item.product.purchasePrice}
                                </td>
                                <td className="border px-2 py-1">
                                    {new Date(item.purchaseDate).toLocaleDateString("en-GB")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default CommissionSupplierPage;
