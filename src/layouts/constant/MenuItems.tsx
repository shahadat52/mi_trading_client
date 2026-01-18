import {
    MdDashboard,
    MdInventory2,
    MdBarChart,
    MdPeople,
    MdAttachMoney,
    MdAccountBalance,
    MdMoneyOff,
} from "react-icons/md";
// import partners from '../../../public/partners.png'
import { CgProfile } from "react-icons/cg";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaPeopleCarryBox } from "react-icons/fa6";

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
                { name: "Current Stock", path: "/stock" }
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
        {
            name: "Profile",
            icon: <CgProfile size={20} />,
            subItems: [
                { name: "My Profile", path: "/profile" },
            ],
        },

        // ✅ Admin / Super Admin only
        ...(isAdmin
            ? [

                {
                    name: "Customer & Supplier",
                    icon: <FaPeopleCarryBox size={20} />,
                    subItems: [
                        { name: "দেখুন", path: "/partners" }
                    ],
                },
                {
                    name: "Banks Module",
                    icon: <MdAccountBalance size={20} />,
                    subItems: [
                        { name: "একাউন্ট বিবরণী", path: "/accounts" },
                        { name: "অপরিশোধিত লেনদেন", path: "/outstandingTxn" },
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
                    subItems: [
                        { name: "Report", path: "dashboard" },
                        { name: "Pending Approvals", path: "dashboard/approvals" },
                        { name: "User management", path: "dashboard/users" },
                        { name: "User Register", path: "register" }
                    ],
                },
            ]
            : []),
    ];

    return menuItems;
};