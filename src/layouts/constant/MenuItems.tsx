import {
    MdDashboard,
    MdInventory2,
    MdBarChart,
    MdPeople,
    MdAttachMoney,
    MdAccountBalance,
    MdMoneyOff,
} from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";

export const getMenuItems = (role?: string) => {
    const isAdmin = role === "admin" || role === "superAdmin";

    const menuItems = [
        {
            name: "Business ERP",
            icon: <MdDashboard size={20} />,
            subItems: [{ name: "Home", path: "/" }],
        },
        {
            name: "Purchase Management",
            icon: <BiSolidPurchaseTag size={20} />,
            subItems: [
                { name: "Purchase Entry", path: "/purchase/entry" },
                { name: "Purchase List", path: "/purchase/overview" },
            ],
        },
        {
            name: "Stock Management",
            icon: <MdInventory2 size={20} />,
            subItems: [
                { name: "Current Stock", path: "/stock" },
                { name: "Stock History", path: "/stock/history" },
            ],
        },
        {
            name: "Sales Management",
            icon: <MdBarChart size={20} />,
            subItems: [
                { name: "Sales Entry", path: "/sales/entry" },
                { name: "Sales Overview", path: "/sales/overview" },
                { name: "Commission Sales", path: "/commission-sales" },
            ],
        },
        {
            name: "Manage Income",
            icon: <MdAttachMoney size={20} />,
            subItems: [
                { name: "Income Overview", path: "/income" },
                { name: "Invoices", path: "/income/invoices" },
            ],
        },
        {
            name: "Manage Expenses",
            icon: <MdMoneyOff size={20} />,
            subItems: [
                { name: "Expenses Overview", path: "/expenses" },
                { name: "Invoices", path: "/expenses/invoices" },
            ],
        },

        // ✅ Admin / Super Admin only
        ...(isAdmin
            ? [
                {
                    name: "Accounts Module",
                    icon: <MdAccountBalance size={20} />,
                    subItems: [
                        { name: "Account Overview", path: "/accounts" },
                        { name: "Transactions", path: "/accounts/transactions" },
                    ],
                },
                {
                    name: "Human Resources",
                    icon: <MdPeople size={20} />,
                    subItems: [
                        { name: "Employees", path: "/hr/employees" },
                        { name: "Attendance", path: "/hr/attendance" },
                    ],
                },
                {
                    name: "Dashboard",
                    icon: <MdDashboard size={20} />,
                    subItems: [{ name: "Report", path: "/reports" }],
                },
            ]
            : []),
    ];

    return menuItems;
};