/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    FaClipboardList,
    FaChartLine,
    FaTruck,
    FaMoneyBillWave,
} from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { PiBatteryVerticalLowBold } from "react-icons/pi";
import { GiProfit } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import PartyLedgerPage from "./PartyLedgerPage";
import comi_icon from "../../assets/icons/comi_icon.png";
import prod_icon from "../../assets/icons/prod_icon.png";
import pur_icon from "../../assets/icons/pur_icon.png";
import cashbox_icon from "../../assets/icons/cashbox_icon1.png";
import stock_icon from "../../assets/icons/stock_icon.png";
import deli_icon from "../../assets/icons/deli_icon.png";
import income_icon from "../../assets/icons/income_icon.png";
import hr_icon from "../../assets/icons/hr_icon1.png";
import { useState } from "react";
import HomePageMenuToggleButton from "../../components/buttons/HomePageMenuToggleButton";

const HomePage = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const menuItems = [
        { path: "/products", label: "Products", icon: <AiFillProduct /> },
        { path: "/purchase/entry", label: "Purchase Entry", icon: <FaClipboardList /> },
        { path: "/commission-sales", label: "Commission Sales", icon: <FaMoneyBillWave /> },
        { path: "/both/sales", label: "Sales Overview", icon: <FaChartLine /> },
        { path: "/deliveries", label: "Deliveries", icon: <FaTruck /> },
        { path: "/purchase/overview", label: "Purchase Overview", icon: <FaChartLine /> },
        { path: "/stock", label: "Stock Low", icon: <PiBatteryVerticalLowBold /> },
        { path: "/income_expense", label: "Income_Expanse", icon: <GiProfit /> },
    ];

    const menuItemsForMobile = [
        { path: "/products", label: "পন্য", icon: <img src={prod_icon} alt="product" className="size-12" /> },
        { path: "/purchase/entry", label: "ক্রয়", icon: <img src={pur_icon} alt="purchase" className="size-10" /> },
        { path: "/cashbox", label: "ক্যাশবক্স", icon: <img src={cashbox_icon} alt="cashbox" className="size-14" /> },
        { path: "/commission-sales", label: "কমিশন", icon: <img src={comi_icon} alt="commission" className="size-14" /> },
        { path: "/deliveries", label: "ডেলিভারি", icon: <img src={deli_icon} alt="delivery" className="size-14" /> },
        { path: "/stock", label: "স্টক", icon: <img src={stock_icon} alt="stock" className="size-10" /> },
        { path: "/income_expense", label: "আয়_ব্যয়", icon: <img src={income_icon} alt="income_expense" className="size-10" /> },
        { path: "/hr", label: "HR", icon: <img src={hr_icon} alt="hr" className="size-12" /> },
    ];



    return (
        <div className="bg-[#ffffff]">
            <div className="hidden md:flex  w-full bg-white items-center justify-center p-5 rounded-2xl">
                <div className=" w-full">

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                        M/S M.I TRADING
                    </h1>

                    <HomePageMenuToggleButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                    {/* Grid */}
                    <div className="
                   grid 
                   grid-cols-2 
                   sm:grid-cols-3 
                   md:grid-cols-3 
                   gap-4 
                   md:gap-6
                ">
                        {
                            menuOpen && menuItems.map((item, index) => (
                                <NavLink
                                    key={index}
                                    to={item.path}
                                    className="
                                group flex flex-col items-center justify-between gap-3
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
                            ))
                        }
                    </div>
                </div>
            </div>


            <div className="md:hidden lg:hidden grid grid-cols-4 gap-5 py-6 px-4 bg-gray-300 shadow-2xl ">
                {menuItemsForMobile.map((menu: any, idx: number) => (
                    <div key={idx} className="tooltip tooltip-top" data-tip={menu.label}>
                        <NavLink to={menu.path}>
                            <button
                                type="button"
                                className="flex mb-2 h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 via-cyan-600 to-teal-400 shadow-md mx-auto cursor-pointer"
                            >
                                <p className="text-[30px] text-red-100">{menu.icon}</p>
                            </button>
                        </NavLink>
                    </div>
                ))}
            </div>



            <div className="mb-14 ">
                <PartyLedgerPage />
            </div>
        </div>
    );
};

export default HomePage;