import { useParams } from "react-router";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Loading from "../../../components/Loading";
import { useAppSelector } from "../../../redux/hook";
import { endOfDay, format, startOfDay } from "date-fns";
import { useGetSpecificSupplierTxnQuery } from "../../../redux/features/supplierTxn/supplierTxnApi";

const SupplierTxnReportPage = () => {
    const { id } = useParams();
    const user = useAppSelector((state: any) => state?.auth?.auth?.user);
    const { data, isLoading } = useGetSpecificSupplierTxnQuery({ id });
    const transactions = data?.data || [];
    const supplier = transactions ? transactions[0]?.supplier[0] : {};

    const [startDate, setStartDate] = useState<string>(
        format(startOfDay(new Date()), "yyyy-MM-dd")
    );

    const [toDate, setToDate] = useState<string>(
        format(endOfDay(new Date()), "yyyy-MM-dd")
    );

    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Customer-Transaction-Report",
    });

    if (isLoading) {
        return <Loading />;
    }

    const totalDebit = transactions
        .filter((item: any) => item.type === "debit")
        .reduce((sum: number, item: any) => sum + item.amount, 0);

    const totalCredit = transactions
        .filter((item: any) => item.type === "credit")
        .reduce((sum: number, item: any) => sum + item.amount, 0);

    const currentBalance =
        transactions.length > 0
            ? transactions[transactions.length - 1].balance
            : 0;

    return (
        <div className="min-h-screen p-4">
            {/* প্রিন্ট স্টাইল ফিক্স */}
            <style>
                {`
                    @media print {
                        body {
                            background: white !important;
                        }
                        thead {
                            display: table-header-group;
                        }
                        tr {
                            break-inside: avoid;
                            page-break-inside: avoid;
                        }
                        .no-print {
                            display: none !important;
                        }
                    }
                `}
            </style>
            <div className="flex items-center gap-3">
                <button
                    onClick={handlePrint}
                    className="min-w-40 mb-[-23px] px-3 py-2 rounded bg-blue-600 text-white no-print"
                >
                    Print Report
                </button>

                <div>
                    <p>Start Date</p>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <p>End Date</p>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="border rounded px-3 py-2 text-sm"
                    />
                </div>
            </div>


            <div
                ref={printRef}
                className="w-[210mm] min-h-[297mm] mx-auto bg-white p-8 text-[12px]"
            >
                {/* Header */}
                <div className="text-center border-b pb-3">
                    <h1 className="text-[#A61C1C] text-xl font-bold">মেসার্স এম.আই ট্রেডিং</h1>
                    <h2 className="text-[#1a4771] text-xl font-serif italic">M/S. M.I TRADING</h2>
                    <p className="text-sm bg-[#317cc2] rounded-xl text-white w-1/2 mx-auto">জেনারেল মার্চেন্ট এন্ড কমিশন এজেন্ট</p>
                    <p className="">হলুদ, মরিচ, ধনিয়া, ডাল, মশলা ও যাবতীয় ভূষা মালের আড়ৎ</p>
                </div>

                {/* Customer */}
                <div className="grid grid-cols-2 mt-5 gap-2 text-sm">
                    <div>
                        <b>Customer :</b> {supplier?.name} <br />
                        <b>Phone :</b> {supplier?.phone} <br />
                        <b>Address :</b> {supplier?.address}
                    </div>
                    <div className="text-right">
                        <b>Date :</b> {format(new Date(), 'dd/MM/yyyy')} <br />
                        <b>Time :</b> {format(new Date(), 'hh:mm a')}
                    </div>
                </div>

                {/* Table */}
                <table className="w-full border-collapse mt-5">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">SL</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Debit</th>
                            <th className="border p-2">Credit</th>
                            <th className="border p-2">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn: any, index: number) => (
                            <tr key={txn._id}>
                                <td className="border p-2 text-center">{index + 1}</td>
                                <td className="border p-2">
                                    {format(new Date(txn.date), 'dd/MM/yyyy')}
                                </td>
                                <td className="border p-2">{txn.description}</td>
                                <td className="border p-2 text-right">
                                    {txn.type === "debit" ? txn.amount.toLocaleString() : "-"}
                                </td>
                                <td className="border p-2 text-right">
                                    {txn.type === "credit" ? txn.amount.toLocaleString() : "-"}
                                </td>
                                <td className="border p-2 text-right">
                                    {txn.balance.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="font-bold bg-gray-100">
                            <td colSpan={3} className="border p-2 text-right">Total</td>
                            <td className="border p-2 text-right">{totalDebit.toLocaleString()}</td>
                            <td className="border p-2 text-right">{totalCredit.toLocaleString()}</td>
                            <td className="border p-2 text-right">{currentBalance.toLocaleString()}</td>
                        </tr>
                    </tfoot>
                </table>

                {/* Footer */}
                <div className="flex justify-between mt-16">
                    <div className="text-center">
                        <p>{user?.name}</p>
                        <div className="border-t w-40"></div>
                        <p>Prepared By</p>
                    </div>
                    <div className="text-center">
                        <div className="border-t w-40"></div>
                        <p>Authorized Signature</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierTxnReportPage;