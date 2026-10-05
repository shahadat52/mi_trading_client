import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import MobileNavbar from "../components/MobileNavbar";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setDrawerController } from "../redux/features/common/commonSlice";
import { TextAlignJustify, X } from "lucide-react";
import { useGetMyDataQuery } from "../redux/features/auth/authApi";
import { updateUser } from "../redux/features/auth/authSlice";

const MainLayout = () => {
    const dispatch = useAppDispatch();

    const drawerController = useAppSelector(
        (state) => state.common.drawerController
    )

    const { data, isLoading } = useGetMyDataQuery(undefined);

    const userData = data?.data;

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (userData) {
            dispatch(updateUser(userData));
        }
    }, [userData, dispatch]);
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <span className="loading loading-spinner loading-lg" />
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-primary text-gray-800 dark:bg-gray-900 dark:text-gray-100">

            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 z-20 bg-black opacity-30 sm:hidden"
                />
            )}

            <div className="flex flex-1 flex-col">

                <header className="flex h-18 items-center justify-between bg-blue-900 px-4 text-white sm:ml-0">
                    <div className="flex items-center gap-3">

                        <button
                            onClick={() =>
                                dispatch(
                                    setDrawerController(!drawerController)
                                )
                            }
                            className="ml-2"
                        >
                            {drawerController ? (
                                <X className="text-red-500" />
                            ) : (
                                <TextAlignJustify className="text-white" />
                            )}
                        </button>

                        <h1 className="my-3 text-lg font-semibold tracking-wide">
                            M/S M.I Trading
                        </h1>
                    </div>
                </header>

                <main className="mb-10 flex-1 overflow-y-auto bg-[#e5efd5] transition-colors dark:bg-gray-900">
                    <Outlet />
                    <MobileNavbar />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;