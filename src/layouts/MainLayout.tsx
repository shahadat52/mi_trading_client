import { useState } from "react";
import {
    MdMenu,
    MdCancel,
    MdExpandLess,
    MdExpandMore,
} from "react-icons/md";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { menuItems } from "./constant/MenuItems";

const drawerWidth = "260px";

const MainLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [collapsedMenus, setCollapsedMenus] = useState<Set<string>>(new Set());
    const location = useLocation();

    const toggleCollapse = (menu: string) => {
        const newSet = new Set(collapsedMenus);
        if (newSet.has(menu)) {
            newSet.delete(menu);
        } else {
            newSet.add(menu);
        }
        setCollapsedMenus(newSet);
        setCollapsedMenus(newSet);
    };

    const isActiveParent = (subItems: { path: string }[]) =>
        subItems.some((sub) => location.pathname.startsWith(sub.path));

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
            <aside
                className={`fixed z-30 top-0 left-0 h-full bg-[#0b1f3a]  dark:bg-gray-800 text-white 
                shadow-2xl transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                sm:translate-x-0 sm:static sm:shadow-none`}
                style={{ width: drawerWidth }}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between px-4 h-16  shadow-md shadow-gray-500">
                    <h2 className="text-lg font-semibold tracking-wide">Admin Panel</h2>
                    <button
                        className="sm:hidden p-2 rounded-md hover:bg-white/10 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        <MdCancel size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-4 px-3 overflow-y-auto h-[calc(100%-4rem)] scrollbar-thin scrollbar-thumb-gray-300">
                    {menuItems.map((menu) => {
                        const isActive = isActiveParent(menu.subItems);
                        const isCollapsed = collapsedMenus.has(menu.name);

                        return (
                            <div key={menu.name} className="mb-1">
                                <button
                                    onClick={() => toggleCollapse(menu.name)}
                                    className={`flex items-center justify-between w-full px-3 py-2 text-[15px] font-medium rounded-md transition-all duration-200
                                        ${isActive
                                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                            : "text-gray-200 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <span className="flex items-center gap-3">
                                        {menu.icon}
                                        {menu.name}
                                    </span>
                                    {isCollapsed ? (
                                        <MdExpandLess size={18} />
                                    ) : (
                                        <MdExpandMore size={18} />
                                    )}
                                </button>

                                {/* Submenu */}
                                {isCollapsed && (
                                    <div className="ml-8 mt-1 space-y-1 transition-all duration-300">
                                        {menu.subItems.map((sub) => (
                                            <NavLink
                                                key={sub.name}
                                                to={sub.path}
                                                className={({ isActive }) =>
                                                    `block px-2 py-1.5 text-sm rounded-md font-normal transition-all
                                                    ${isActive
                                                        ? "bg-blue-600 text-white"
                                                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                                                    }`
                                                }
                                            >
                                                {sub.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </aside>

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
                    <div className="text-sm text-gray-300">
                        {/* Placeholder for user profile or date/time */}
                        Welcome, Admin
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
