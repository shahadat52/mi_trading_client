import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Loading from "../../../components/Loading";
import { useAppSelector } from "../../../redux/hook";
import { useGetCustomerSupplierDueQuery } from "../../../redux/features/reports/reportsApi";
import { customRound } from "../../../utils/customRound";

const CustomerDueReports = () => {
    const user = useAppSelector((state: any) => state?.auth?.auth?.user);

    const { data, isLoading } = useGetCustomerSupplierDueQuery(undefined);
    const suppliers = data?.suppliers || [];


    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Customer-Transaction-Report",
    });

    if (isLoading) {
        return <Loading />;
    }

    const totalPayable = suppliers.reduce((sum: number, item: any) => sum + item.totalPayable, 0);


    return (
        <div className="min-h-screen p-4 mx-auto">
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

            <div className="flex items-center gap-3 no-print">
                <button
                    onClick={handlePrint}
                    className="min-w-40 mb-[-23px] px-3 py-2 rounded bg-blue-600 text-white no-print"
                >
                    Print Report
                </button>

            </div>

            <div
                ref={printRef}
                className="w-[210mm] min-h-[297mm] mx-auto bg-white p-6 text-[12px]"
            >
                {/* Header */}
                <div className="text-center border-b pb-3">
                    <h1 className="text-[#A61C1C] text-xl font-bold">মেসার্স এম.আই ট্রেডিং</h1>
                    <h2 className="text-[#1a4771] text-xl font-serif italic">M/S. M.I TRADING</h2>
                    <p className="text-sm bg-[#317cc2] rounded-xl text-white w-1/2 mx-auto">জেনারেল মার্চেন্ট এন্ড কমিশন এজেন্ট</p>
                    <p className="">হলুদ, মরিচ, ধনিয়া, ডাল, মশলা ও যাবতীয় ভূষা মালের আড়ৎ</p>
                </div>
                <div className="text-center text-sm ">
                    <h2>সাপ্লাইয়ারদের বাকি</h2>

                </div>

                {/* Table */}
                <table className="w-full border-collapse mt-5">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">নং</th>
                            <th className="border p-2">নাম</th>
                            <th className="border p-2">ফোন</th>
                            <th className="border p-2">ঠিকানা</th>
                            <th className="border p-2">টাকার পরিমান</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            suppliers && suppliers?.map((txn: any, index: number) => (
                                <tr key={index}>
                                    <td className="border p-2 text-center">{index + 1}</td>
                                    <td className="border p-2">{txn.name}</td>
                                    <td className="border p-2 text-center">
                                        {txn.phone}
                                    </td>
                                    <td className="border p-2 text-left">
                                        {txn.address}
                                    </td>
                                    <td className="border p-2 text-center">
                                        {customRound(txn.totalPayable)}
                                    </td>

                                </tr>
                            ))}


                    </tbody>
                    <tfoot>
                        <tr className="font-bold bg-gray-100">
                            <td colSpan={4} className="border p-2 text-right">Total</td>
                            <td className="border p-2 text-center">{customRound(totalPayable)}</td>
                        </tr>
                    </tfoot>
                </table>

                {/* Footer */}
                <div className="flex justify-between mt-16">
                    <div className="text-center">
                        <p>{user.role === 'admin' ? 'admin' : user?.name}</p>
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

export default CustomerDueReports;