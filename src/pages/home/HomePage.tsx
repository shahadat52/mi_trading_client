/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    FaShoppingCart,
    FaClipboardList,
    FaChartLine,
    FaTruck,
    FaMoneyBillWave,
} from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { PiBatteryVerticalLowBold, PiChartLineDownBold } from "react-icons/pi";
import { GiProfit } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useGetAllCustomerTxnQuery } from "../../redux/features/customer/customerApi";
import { useState } from "react";
import Customers from "./Customers";
import Suppliers from "./Suppliers";

type ApprovalType = "customer" | "supplier";
const HomePage = () => {
    const [activeTab, setActiveTab] = useState<'customer' | 'supplier'>('customer');
    const { data, isLoading } = useGetAllCustomerTxnQuery(undefined);
    const menuItems = [
        { path: "/sales/entry", label: "Sales Entry", icon: <FaShoppingCart /> },
        { path: "/purchase/entry", label: "Purchase Entry", icon: <FaClipboardList /> },
        { path: "/commission-sales", label: "Commission Sales", icon: <FaMoneyBillWave /> },
        { path: "/sales/overview", label: "Sales Overview", icon: <FaChartLine /> },
        { path: "/deliveries", label: "Deliveries", icon: <FaTruck /> },
        { path: "/purchase/overview", label: "Purchase Overview", icon: <FaChartLine /> },
        { path: "/stock", label: "Stock Low", icon: <PiBatteryVerticalLowBold /> },
        { path: "/income", label: "Income", icon: <GiProfit /> },
        { path: "/expanses", label: "Expanse", icon: <PiChartLineDownBold /> },
    ];

    const menuItemsForMobile = [
        { path: "/sales/entry", label: "বিক্রয়", icon: <FaShoppingCart /> },
        { path: "/purchase/entry", label: "ক্রয়", icon: <FaClipboardList /> },
        { path: "/deliveries", label: "ডেলিভারি", icon: <FaTruck /> },
        { path: "/stock", label: "স্টক", icon: <PiBatteryVerticalLowBold /> },
        { path: "/income", label: "আয়", icon: <GiProfit /> },
        { path: "/expenses", label: "ব্যয়", icon: <PiChartLineDownBold /> },
        { path: "/commission-sales", label: "কমিশন", icon: <FcSalesPerformance /> },
        { path: "*", label: "ক্যাশ", icon: <MdOutlinePayment /> },
    ];

    const customerTxns = data?.data
    const totalDebit = customerTxns?.filter((txn: any) => (txn.type === 'debit'))?.reduce((sum: number, txn: { amount: number }) => sum + (txn.amount || 0), 0)
    const totalCredit = customerTxns?.filter((txn: any) => (txn.type === 'credit'))?.reduce((sum: number, txn: { amount: number }) => sum + (txn.amount || 0), 0);



    return (
        <div className="bg-[#eaf2ee]">
            <div className="hidden md:flex min-h-full w-full bg-white items-center justify-center p-5 rounded-2xl">
                <div className="max-w-5xl w-full">

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
                        এম আই ট্রেডিং (ERP) ড্যাশবোর্ড
                    </h1>

                    {/* Grid */}
                    <div className="
                    grid 
                    grid-cols-2 
                    sm:grid-cols-3 
                    md:grid-cols-3 
                    gap-4 
                    md:gap-6
                ">
                        {menuItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.path}
                                className="
                                group flex flex-col items-center justify-center
                                p-6 sm:p-7 md:p-8
                                rounded-xl
                                bg-white
                                border border-gray-200
                                shadow-md
                                hover:shadow-lg
                                hover:border-blue-300
                                transition-all
                                duration-300
                                cursor-pointer
                            "
                            >
                                <div className="flex flex-col items-center text-center gap-3">

                                    {/* Icon */}
                                    <div className="
                                    text-3xl sm:text-4xl md:text-5xl 
                                    text-blue-700 
                                    transition-all 
                                    duration-300 
                                    group-hover:scale-110 
                                    group-hover:text-blue-800
                                ">
                                        {item.icon}
                                    </div>

                                    {/* Label */}
                                    <div className="
                                    text-sm sm:text-base md:text-lg 
                                    font-semibold 
                                    text-gray-900
                                    transition-all 
                                    duration-300 
                                    group-hover:text-blue-800
                                ">
                                        {item.label}
                                    </div>

                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>

            <div className="sticky md:hidden lg:hidden grid grid-cols-4 gap-4  h-60 py-10 bg-[#f2f7f4]">
                {
                    menuItemsForMobile.map((menu: any, idx: number) => (
                        <NavLink key={idx} to={menu.path}>
                            <div className="flex flex-col items-center ">
                                <p className="text-[24px] text-orange-500">{menu.icon}</p>
                                <p className="text-orange-900">{menu.label}</p>
                            </div>
                        </NavLink>
                    ))
                }
            </div>

            <div className="rounded-2xl border mt-[-30px] border-white/20  bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] p-6 md:hidden lg:hidden   rounded-t-4xl h-80  ">


                <div className="flex items-center justify-around mt-4 mb-10">
                    <div className="text-red-600">

                        <p className="text-[30px] font-semibold">{isLoading ? 0 : totalCredit} ৳</p>
                        <p className="text-[25px] font-semibold">মোট পাবো</p>
                    </div>
                    <div className="bg-black w-[1px]"></div>
                    <div className="text-green-600">
                        <p className="text-[30px] font-semibold">{isLoading ? 0 : totalDebit} ৳</p>
                        <p className="text-[25px] font-semibold">মোট দেবো</p>
                    </div>
                </div>

                <div className="absolute top-1 left-1 flex gap-3 border-b">
                    {["customer", "supplier"].map((tab) => (
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
            </div>


            {
                activeTab === 'customer' ? <Customers /> : <Suppliers />
            }



        </div>
    );
};

export default HomePage;