/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { useParams } from "react-router";
import * as XLSX from "xlsx";

import TableSkeleton from "../../components/table/TableSkeleton";
import ErrorBoundary from "../../components/ErrorBoundary";
import ButtonPdf from "../../components/buttons/ButtonPdf";
import ButtonExcel from "../../components/buttons/ButtonExcel";
import { useGetCommissionSalesQuery } from "../../redux/features/commissionSales/commissionSalesApi";

/* ===================== Types ===================== */
interface SaleItem {
    product: { name: string } | string;
    quantity: number;
    salesPrice: number;
    total: number;
    commissionRatePercent: number;
}

interface Sale {
    _id: string;
    date: string;
    supplier: { name: string };
    items: SaleItem[];
}

/* ===================== Component ===================== */
const SupplierWiseSalesPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useGetCommissionSalesQuery(id);

    const sales: Sale[] = data?.data ?? [];

    /* ===================== Calculations ===================== */
    const { totalAmount, totalCommission } = useMemo(() => {
        return sales.reduce(
            (acc, sale) => {
                sale.items.forEach((item) => {
                    acc.totalAmount += item.total;
                    acc.totalCommission +=
                        (item.total * item.commissionRatePercent) / 100;
                });
                return acc;
            },
            { totalAmount: 0, totalCommission: 0 }
        );
    }, [sales]);

    /* ===================== Excel Export ===================== */
    const handleExportExcel = () => {
        if (!sales.length) return;

        const rows = sales.flatMap((sale) =>
            sale.items.map((item) => ({
                Supplier: sale.supplier.name,
                Product:
                    typeof item.product === "string"
                        ? item.product
                        : item.product.name,
                Quantity: item.quantity,
                SalesPrice: item.salesPrice,
                CommissionRate: `${item.commissionRatePercent}%`,
                Commission:
                    (item.total * item.commissionRatePercent) / 100,
                Date: new Date(sale.date).toLocaleDateString("en-GB"),
            }))
        );

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Commission Sales");

        XLSX.writeFile(workbook, `commission_sales_${Date.now()}.xlsx`);
    };

    /* ===================== PDF Export ===================== */
    const handleExportPDF = () => {
        const printArea = document.getElementById("printArea");
        if (!printArea) return;

        const win = window.open("", "_blank");
        if (!win) return;

        win.document.write(`
            <html>
                <head>
                    <title>Commission Sales Report</title>
                    <style>
                        body { font-family: Arial; padding: 20px; }
                        h2 { text-align: center; margin-bottom: 16px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                        th, td { border: 1px solid #333; padding: 6px; font-size: 13px; text-align: left; }
                        th { background: #f0f0f0; }
                    </style>
                </head>
                <body>${printArea.innerHTML}</body>
            </html>
        `);

        win.document.close();
        win.print();
        win.close();
    };

    /* ===================== States ===================== */
    if (isLoading) {
        return (
            <div className="p-5 bg-white rounded-xl shadow border">
                <TableSkeleton row={6} />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-5 bg-white rounded-xl shadow border">
                <ErrorBoundary message="ডেটা লোড করতে সমস্যা হয়েছে।" />
            </div>
        );
    }

    if (!sales.length) {
        return (
            <div className="p-10 text-center text-gray-500 bg-white rounded-xl shadow border">
                কোনো কমিশন সেলস ডেটা পাওয়া যায়নি।
            </div>
        );
    }

    /* ===================== UI ===================== */
    return (
        <div className="p-4 sm:p-5 bg-white shadow rounded-xl border">
            {/* Header + Summary */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    {sales[0].supplier.name} — Commission Sales Report
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <SummaryCard label="Total Sales" value={totalAmount} accent="blue" />
                    <SummaryCard
                        label="Total Commission"
                        value={totalCommission}
                        accent="green"
                    />
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                <span className="text-sm text-gray-600">
                    Showing {sales.length} sales records
                </span>
                <div className="flex gap-2">
                    <ButtonPdf handleExportPDF={handleExportPDF} />
                    <ButtonExcel handleExportExcel={handleExportExcel} />
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                        <tr>
                            {["Product", "Quantity", "Sales Price", "Commission %", "Date"].map((head) => (
                                <th key={head} className="px-4 py-3 text-left">
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {sales?.map((sale) =>
                            sale?.items?.map((item, idx) => (
                                <tr
                                    key={`${sale._id}-${idx}`}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3 font-medium text-gray-800">
                                        {typeof item.product === "string"
                                            ? item.product
                                            : item.product.name}
                                    </td>
                                    <td className="px-4 py-3 ">{item.quantity}</td>
                                    <td className="px-4 py-3 ">{item.salesPrice}</td>
                                    <td className="px-4 py-3 ">{item.commissionRatePercent}%</td>
                                    <td className="px-4 py-3  text-gray-600">
                                        {new Date(sale.date).toLocaleDateString("en-GB")}
                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-4">
                {sales.map((sale) =>
                    sale.items.map((item, idx) => (
                        <div
                            key={`${sale._id}-${idx}`}
                            className="rounded-xl border bg-white p-4 shadow-sm"
                        >
                            <div className="flex justify-between mb-2">
                                <h4 className="font-semibold text-gray-800">
                                    {typeof item.product === "string"
                                        ? item.product
                                        : item.product.name}
                                </h4>
                                <span className="text-xs text-gray-500">
                                    {new Date(sale.date).toLocaleDateString("en-GB")}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 gap-y-2 text-sm">
                                <Info label="Quantity" value={item.quantity} />
                                <Info label="Price" value={item.salesPrice} />
                                <Info label="Commission %" value={`${item.commissionRatePercent}%`} />
                                <Info label="Commission" value={(item.total * item.commissionRatePercent) / 100} />
                            </div>


                        </div>
                    ))
                )}
            </div>

            {/* Print Area */}
            <div id="printArea" className="hidden">
                <h2>{sales[0].supplier.name} এর কমিশন সেলস রিপোর্ট</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Commission</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) =>
                            sale.items.map((item, idx) => (
                                <tr key={`${sale._id}-${idx}`}>
                                    <td>{typeof item.product === "string" ? item.product : item.product.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.salesPrice}</td>
                                    <td>{(item.total * item.commissionRatePercent) / 100}</td>
                                    <td>{new Date(sale.date).toLocaleDateString("en-GB")}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

/* ===================== Small Components ===================== */
const SummaryCard = ({
    label,
    value,
    accent,
}: {
    label: string;
    value: number;
    accent: "blue" | "green";
}) => (
    <div className={`rounded-xl border p-4 bg-${accent}-50 border-${accent}-200`}>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
    </div>
);

const Info = ({ label, value }: { label: string; value: any }) => (
    <div className="flex justify-between gap-1">
        <span className="text-gray-500 px-2">{label}</span>
        <span className="font-medium text-gray-800">{value}</span>
    </div>
);

export default SupplierWiseSalesPage;