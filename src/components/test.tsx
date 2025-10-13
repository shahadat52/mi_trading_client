import { useState } from "react";
import {
    MdCancel,
    MdMenu,
    MdDashboard,
    MdBarChart,
    MdInventory2,
    MdChevronLeft,
    MdChevronRight,
    MdPublish,
    MdAccountBalance,
    MdAttachMoney,
    MdMoneyOff,
    MdGroups,
} from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { Tooltip } from "react-tooltip";

// --- Sidebar Menu Config ---
const menuItems = [
    { name: "Business ERP", path: "/", icon: <MdDashboard size={20} /> },
    { name: "Purchase Management", path: "/purchase", icon: <MdPublish size={20} /> },
    { name: "Stock Management", path: "/stock", icon: <MdInventory2 size={20} /> },
    { name: "Sales Management", path: "/sales", icon: <MdBarChart size={20} /> },
    { name: "Manage Income", path: "/income", icon: <MdAttachMoney size={20} /> },
    { name: "Manage Expenses", path: "/expenses", icon: <MdMoneyOff size={20} /> },
    { name: "Accounts Module", path: "/accounts", icon: <MdAccountBalance size={20} /> },
    { name: "Human Resources", path: "/hr", icon: <MdGroups size={20} /> },
];

// --- Sidebar Item Component ---
const SidebarItem = ({
    name,
    icon,
    path,
    collapsed,
}: {
    name: string;
    icon: React.ReactNode;
    path: string;
    collapsed: boolean;
}) => (
    <NavLink
        to={path}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
       ${isActive
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            }`
        }
        data-tooltip-id={collapsed ? `tooltip-${name}` : undefined}
    >
        {icon}
        {!collapsed && <span>{name}</span>}
        {collapsed && (
            <Tooltip id={`tooltip-${name}`} place="right">
                {name}
            </Tooltip>
        )}
    </NavLink>
);

// --- Main Layout Component ---
const MainLayout = () => {
    const [isOpen, setIsOpen] = useState(false); // For mobile drawer
    const [collapsed, setCollapsed] = useState(false); // For desktop collapse

    const expandedWidth = 240;
    const collapsedWidth = 72;

    return (
        <div className="flex h-screen bg-gray-50">
            {/* --- Mobile Overlay --- */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 sm:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* --- Sidebar --- */}
            <aside
                className={`fixed top-0 left-0 z-30 h-full bg-white border-r shadow-lg transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0 sm:static sm:shadow-none`}
                style={{
                    width: collapsed ? collapsedWidth : expandedWidth,
                }}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between h-16 px-4 border-b bg-gray-50">
                    {!collapsed && (
                        <h2 className="text-lg font-semibold text-gray-800 whitespace-nowrap">
                            Admin Panel
                        </h2>
                    )}
                    <button
                        className="sm:hidden p-2 rounded hover:bg-gray-200"
                        onClick={() => setIsOpen(false)}
                    >
                        <MdCancel size={22} />
                    </button>
                </div>

                {/* Collapse Toggle Button (Desktop Only) */}
                <div className="hidden sm:flex justify-end px-3 py-2">
                    <button
                        onClick={() => setCollapsed((prev) => !prev)}
                        className="p-2 rounded-lg hover:bg-gray-200 transition"
                    >
                        {collapsed ? <MdChevronRight size={22} /> : <MdChevronLeft size={22} />}
                    </button>
                </div>

                {/* Sidebar Menu */}
                <nav className="mt-2 flex flex-col gap-1 px-2">
                    {menuItems.map((item) => (
                        <SidebarItem key={item.name} {...item} collapsed={collapsed} />
                    ))}
                </nav>
            </aside>

            {/* --- Main Content --- */}
            <div className="flex flex-1 flex-col">
                {/* Navbar */}
                <header className="flex items-center h-16 px-4 bg-blue-600 text-white shadow-sm">
                    <button
                        className="sm:hidden mr-3 p-2 hover:bg-blue-500 rounded"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <MdMenu size={24} />
                    </button>
                    <h1 className="text-lg font-semibold tracking-wide">M.I Trading ERP</h1>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
