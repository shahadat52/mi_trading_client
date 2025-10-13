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
    MdLogout,
    MdSettings,
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
    const [isOpen, setIsOpen] = useState(false); // For mobile
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
                {/* --- Sidebar Header --- */}
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

                {/* --- Collapse Toggle (Desktop Only) --- */}
                <div className="hidden sm:flex justify-end px-3 py-2">
                    <button
                        onClick={() => setCollapsed((prev) => !prev)}
                        className="p-2 rounded-lg hover:bg-gray-200 transition"
                    >
                        {collapsed ? <MdChevronRight size={22} /> : <MdChevronLeft size={22} />}
                    </button>
                </div>

                {/* --- Sidebar Menu --- */}
                <nav className="mt-2 flex flex-col gap-1 px-2 flex-grow overflow-y-auto">
                    {menuItems.map((item) => (
                        <SidebarItem key={item.name} {...item} collapsed={collapsed} />
                    ))}
                </nav>

                {/* --- Sidebar Footer --- */}
                <div className="border-t bg-gray-50 mt-auto px-2 py-3">
                    {/* Admin Info */}
                    <div
                        className={`flex items-center gap-3 mb-3 transition-all ${collapsed ? "justify-center" : ""
                            }`}
                    >
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="Admin"
                            className="w-9 h-9 rounded-full border"
                        />
                        {!collapsed && (
                            <div>
                                <p className="text-sm font-medium text-gray-800">Shahadat Hossain</p>
                                <p className="text-xs text-gray-500">Admin</p>
                            </div>
                        )}
                    </div>

                    {/* Settings / Logout */}
                    <div
                        className={`flex ${collapsed ? "flex-col items-center gap-2" : "justify-between"
                            }`}
                    >
                        <button
                            className="flex items-center gap-2 px-3 py-1.5 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg w-full transition"
                        >
                            <MdSettings size={20} />
                            {!collapsed && <span>Settings</span>}
                        </button>

                        <button
                            className="flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg w-full transition"
                        >
                            <MdLogout size={20} />
                            {!collapsed && <span>Logout</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* --- Main Content --- */}
            <div className="flex flex-1 flex-col">
                {/* --- Top Navbar --- */}
                <header className="flex items-center h-16 px-4 bg-blue-600 text-white shadow-sm">
                    <button
                        className="sm:hidden mr-3 p-2 hover:bg-blue-500 rounded"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <MdMenu size={24} />
                    </button>
                    <h1 className="text-lg font-semibold tracking-wide">M.I Trading ERP</h1>
                </header>

                {/* --- Page Content --- */}
                <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
