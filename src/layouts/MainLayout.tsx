import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import MainLayoutSidebar from "./MainLayoutSidebar";
import MobileNavbar from "../components/MobileNavbar";
import { FaShoppingCart } from "react-icons/fa";
import { useAppSelector } from "../redux/hook";

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open state
    const cart = useAppSelector((state) => state.cart)


    return (
        <div className="flex h-screen bg-primary text-gray-800 dark:bg-gray-900 dark:text-gray-100">
            {/* Sidebar */}
            <MainLayoutSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black opacity-30 z-20 sm:hidden"
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="flex items-center justify-between bg-[#193c6a] text-white h-16 px-4 sm:ml-0">
                    <div className="flex items-center gap-3">
                        <button
                            className="sm:hidden p-2 hover:bg-white/10 rounded-md"
                            onClick={() => setIsSidebarOpen(true)} // 🔥 Open sidebar
                        >
                            <MdMenu size={24} />
                        </button>
                        <h1 className="text-lg font-semibold tracking-wide">
                            M/S.M.I Trading
                        </h1>
                    </div>
                    <NavLink to={'/cart'}><span className="text-blue-300 ">{cart?.items?.length}</span><FaShoppingCart size={30} className=" mb-2" /></NavLink>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-[#e5efd5] dark:bg-gray-900  transition-colors">
                    <Outlet />
                    <MobileNavbar />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
