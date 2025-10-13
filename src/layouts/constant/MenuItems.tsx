import { MdDashboard, MdInventory2, MdBarChart, MdPeople, MdAttachMoney, MdAccountBalance, MdMoneyOff } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";

export const menuItems = [
    {
        name: "Business ERP",
        icon: <MdDashboard size={20} />,
        subItems: [
        ],
    },
    {
        name: "Purchase Management",
        icon: <BiSolidPurchaseTag size={20} />,
        subItems: [
            { name: "Add Purchase", path: "/purchase" },
            { name: "Purchase List", path: "/purchase/list" },
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
            { name: "Sales Overview", path: "/sales" },
            { name: "Invoices", path: "/sales/invoices" },
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
];
