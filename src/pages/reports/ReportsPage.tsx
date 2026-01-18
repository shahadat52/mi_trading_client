import { useState } from "react";
// import { FaCheck, FaTimes, FaEye } from "react-icons/fa";
import SalesReports from "./SalesReports";
import PurchasesReports from "./PurchasesReports";
import TransactionReports from "./TransactionReports";

type ApprovalType = "sales" | "purchase" | "transaction";





const ReportsPage = () => {
    const [activeTab, setActiveTab] = useState<ApprovalType>("sales");
    return (
        <div className="bg-gray-100 min-h-screen p-2 rounded-xl space-y-6 ">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">সকল রিপোর্টস দেখুন</h1>
                <p className="text-sm text-gray-500">
                    ক্রয়, বিক্রয়, লেনদেন
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-3 border-b">
                {["sales", "purchase", "transaction"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as ApprovalType)}
                        className={`px-1 py-2 text-sm font-medium border-b-2 transition
              ${activeTab === tab
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/*Main Container*/}
            <div className="">
                {
                    activeTab === 'sales' && <SalesReports />
                }
                {
                    activeTab === 'purchase' && <PurchasesReports />
                }
                {
                    activeTab === 'transaction' && <TransactionReports />
                }
            </div>
        </div>
    );
};

export default ReportsPage;
{/* <table className="w-full text-xm">
                    <thead className="bg-gray-100 text-gray-600 text-[10px] uppercase font-semibold">
                        <tr>
                            <th className="px-1 py-3 text-left">Invoice</th>
                            <th className="px-1 py-3 text-right">Amount</th>
                            <th className="px-1 py-3 text-left">Date</th>
                            <th className="px-1 py-3 text-center">Status</th>
                            <th className="px-1 py-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {mockData[activeTab].map((item) => (
                            <tr
                                key={item.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="px-1 py-3 border-r text-[10px]">MIS(S)-001</td>
                                <td className="px-1 py-3 text-right text-[10px] border-r">
                                    ৳ {item.amount.toLocaleString()}
                                </td>
                                <td className="px-1 py-3 border-r text-[10px]">{item.date}</td>
                                <td className="px-1 py-3 text-center border-r text-[10px]">
                                    <span className="px-2 py-1 rounded-full text-[10px] bg-yellow-100 text-yellow-700">
                                        Pending
                                    </span>
                                </td>
                                <td className="px-1 py-3 text-[10px]">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            className="p-2 rounded bg-gray-100 hover:bg-gray-200"
                                            title="View"
                                        >
                                            <FaEye />
                                        </button>
                                        <button
                                            className="p-2 rounded bg-green-100 text-green-700 hover:bg-green-200"
                                            title="Approve"
                                        >
                                            <FaCheck />
                                        </button>
                                        <button
                                            className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
                                            title="Reject"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {mockData[activeTab].length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-8 text-center text-gray-400 border-t"
                                >
                                    No pending approvals found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table> */}