import { useState } from "react";
import { Outlet } from "react-router-dom";
import MobileNavbar from "../components/MobileNavbar";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setDrawerController } from "../redux/features/common/commonSlice";
import { TextAlignJustify, X } from "lucide-react";

const MainLayout = () => {
    const dispatch = useAppDispatch()
    const drawerController = useAppSelector((state) => state.common.drawerController)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    return (
        <div className="flex h-screen bg-primary text-gray-800 dark:bg-gray-900 dark:text-gray-100">

            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black opacity-30 z-20 sm:hidden"
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="flex items-center justify-between bg-blue-900 text-white h-18 px-4 sm:ml-0">
                    <div className="flex items-center gap-3">

                        <button
                            onClick={() => dispatch(setDrawerController(!drawerController))}
                            className='ml-2'
                        >
                            {drawerController ? <X className='text-red-500' /> : <TextAlignJustify className='text-white' />}
                        </button>
                        <h1 className="text-lg my-3 font-semibold tracking-wide">
                            M/S M.I Trading
                        </h1>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-4 bg-[#e5efd5] dark:bg-gray-900  transition-colors mb-10">
                    <Outlet />
                    <MobileNavbar />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;