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
import { LuNotebookPen } from "react-icons/lu";
import { MdOutlinePayment } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { PiBatteryVerticalLowBold, PiChartLineDownBold } from "react-icons/pi";
import { GiProfit } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useGetAllCustomersQuery } from "../../redux/features/customer/customerApi";
import { useState } from "react";
import Modal from "../../components/Modal";
import AddCustomer from "./AddCustomer";


const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { data } = useGetAllCustomersQuery(undefined)
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
        { path: "/expanses", label: "ব্যয়", icon: <PiChartLineDownBold /> },
        { path: "/note", label: " নোট", icon: <LuNotebookPen /> },
        { path: "/cash", label: "ক্যাশ", icon: <MdOutlinePayment /> },
    ];
    const customers = data?.data;
    console.log(customers)
    return (
        <div className="font-bangla">
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

            <div className="font-bangla md:hidden lg:hidden grid grid-cols-4 gap-4  py-6 bg-[#f9f4b9]">
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

            <div className="md:hidden lg:hidden flex gap-4 mx-auto  justify-around my-5">
                <div className="text-green-600">
                    <p className="text-[30px] font-semibold">5000</p>
                    <p>মোট পাবো</p>
                </div>
                <div className="bg-black w-[1px]"></div>
                <div className="text-red-600">
                    <p className="text-[30px] font-semibold">2000</p>
                    <p>মোট দেবো</p>
                </div>
            </div>
            <div className="lg:hidden md:hidden relative sm:flex  items-center justify-between ">
                <p className="pl-1 text-xl font-semibold">কাস্টমার <span className="px-4">{customers?.length}</span> জন</p>
                <div className=" p-6">
                    <button
                        onClick={() => setIsOpen(true)}
                        className=" text-4xl flex text- px-4 py-2 rounded"
                    >
                        <p className="  fixed bottom-20 right-5 z-50 bg-red-600 text-white   rounded-full w-auto p-3"> <IoPersonAddSharp /></p>
                    </button>

                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <AddCustomer onClose={() => setIsOpen(false)} />
                    </Modal>
                </div>
                <div className="flex flex-col gap-4 mb-18">
                    {
                        customers?.map((customer: any, idx: number) => (
                            <NavLink to={`/customerTxn/${customer._id}`} key={customer._id} className="p-2 shadow m-1 rounded">
                                <div className="flex justify-between items-center">

                                    <div className="flex items-center">
                                        <div className="flex gap-1 items-center">
                                            <p className="text-[20px] mr-3 text-orange-500">{idx + 1}</p>
                                            <p className="text-[40px] mr-3 text-orange-500"><BsPersonCircle /></p>
                                        </div>
                                        <div>
                                            <p className="text-xl font-semibold">{customer.name}</p>
                                            <p>কাস্টমার</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <p>1500   </p>
                                        <span><FaChevronRight /></span>
                                    </div>
                                </div>
                            </NavLink>
                        ))
                    }
                </div>

            </div>
        </div>
    );
};

export default HomePage;