/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
    MdMenu
} from "react-icons/md";
import { Outlet, } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import { logOut } from "../redux/features/auth/authSlice";
import MainLayoutSidebar from "./MainLayoutSidebar";


const MainLayout = () => {
    const [isOpen, setIsOpen] = useState(false); // Mobile menu

    const dispatch = useAppDispatch();



    const handleLogOut = () => {
        dispatch(logOut());
    };

    return (
        <div className="flex h-screen bg-primary text-gray-800 dark:bg-gray-900 dark:text-gray-100">
            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 sm:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <MainLayoutSidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="flex items-center justify-between bg-[#193c6a] text-white h-16 px-4 sm:ml-0">
                    <div className="flex items-center gap-3">
                        <button
                            className="sm:hidden p-2 hover:bg-white/10 rounded-md"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <MdMenu size={24} />
                        </button>
                        <h1 className="text-lg font-semibold tracking-wide">
                            M/S M.I Trading ERP
                        </h1>
                    </div>
                    <div
                        onClick={handleLogOut}
                        className="text-sm text-gray-300 cursor-pointer"
                    >
                        <p className="p-2 bg-red-50 rounded text-blue-950 font-bold">Log Out</p>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-[#c2dbea] dark:bg-gray-900 p-6 transition-colors">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
