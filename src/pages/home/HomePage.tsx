/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    FaShoppingCart,
    FaClipboardList,
    FaChartLine,
    FaTruck,
    FaMoneyBillWave,
    FaChevronRight,

} from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { FcSalesPerformance } from "react-icons/fc";
import { PiBatteryVerticalLowBold, PiChartLineDownBold } from "react-icons/pi";
import { GiProfit } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useGetAllCustomersQuery, useGetAllCustomerTxnQuery } from "../../redux/features/customer/customerApi";
import { useState } from "react";
import Modal from "../../components/Modal";
import AddCustomer from "./AddCustomer";
import { useDebounce } from "../../utils/useDebounce";


const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const debounceSearch = useDebounce(search.trim(), 1000);
    const { data: customerTxns } = useGetAllCustomerTxnQuery(undefined);
    const { data, isLoading } = useGetAllCustomersQuery({ search: debounceSearch });
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

    const transactions = customerTxns?.data
    const totalDebit = transactions?.filter((txn: any) => (txn.type === 'debit'))?.reduce((sum: number, txn: { amount: number }) => sum + (txn.amount || 0), 0)
    const totalCredit = transactions?.filter((txn: any) => (txn.type === 'credit'))?.reduce((sum: number, txn: { amount: number }) => sum + (txn.amount || 0), 0);
    const balance = totalDebit - totalCredit || 0;

    console.log({ totalCredit, totalDebit, balance })

    const customers = data?.data
    console.log(customers)

    // const totalDebit = customerTxn?.data?.reduce((total: number, customer: any) => {
    //     const debitSum = customer?.transactions?
    //         .filter((txn: any) => txn.type === "debit")
    //         .reduce((sum: number, txn: any) => sum + txn.amount, 0);

    //     return total + debitSum;
    // }, 0);

    // const totalCredit = customerTxn?.data?.reduce((total: number, customer: any) => {
    //     const debitSum = customer?.transactions
    //         .filter((txn: any) => txn.type === "credit")
    //         .reduce((sum: number, txn: any) => sum + txn.amount, 0);

    //     return total + debitSum;
    // }, 0);

    // console.log({ totalDebit, totalCredit })
    // const balance = totalDebit - totalCredit || 0;

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

            <div className="rounded-2xl border mt-[-30px] border-white/20  bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] p-6 md:hidden lg:hidden flex gap-4 mx-auto  justify-around  rounded-t-4xl h-80  ">
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


            <div className=" rounded-2xl border border-white/20  bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] p-2 relative lg:hidden md:hidden sm:flex  items-center justify-between  rounded-t-4xl  mt-[-180px]  ">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="কাস্টমার খুঁজুন..."
                    className=" input input-md max-w-[80%] bg-white ml-1 rounded-full mt-8  "
                />
                {/* <p className="sticky ml-1 px-1 mt-2 text-xl font-semibold">কাস্টমার <span className="px-4">{customers?.length}</span> জন</p> */}
                <div className="">

                    <div className="flex items-center justify-end w-full">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="  text-4xl flex  px-4 rounded"
                        >
                            <p className="   bg-red-600 text-white   rounded-full w-auto p-3"> <IoPersonAddSharp /></p>
                        </button>
                    </div>


                </div>
                <div>
                    <p>Customers: {customers?.length}</p>
                </div>
                <div className="flex flex-col gap-4 mb-18">

                    {
                        customers?.map((customer: any, idx: number) => (
                            <NavLink to={`/customerTxn/${customer._id}`} key={customer._id} className="p-2 shadow m-1 rounded">
                                <div className="flex justify-between items-center">

                                    <div className="flex items-center">
                                        <div className="flex gap-1 items-center">
                                            <p className="text-[20px] mr-3 text-orange-500">{idx + 1}</p>
                                            <p className="text-[30px] mr-3 text-orange-500"><BsPersonCircle /></p>
                                        </div>
                                        <div>
                                            <p className="text-[18px] font-semibold">{customer.name}</p>

                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <p>কাস্টমার</p>
                                        <span><FaChevronRight /></span>
                                    </div>
                                </div>
                            </NavLink>
                        ))
                    }
                </div>

            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <AddCustomer onClose={() => setIsOpen(false)} />
            </Modal>

        </div>
    );
};

export default HomePage;