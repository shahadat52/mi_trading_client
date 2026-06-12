import {
    MdDashboard,
    MdInventory2,
    MdBarChart,
    MdPeople,
    MdAttachMoney,
    MdAccountBalance,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaPeopleCarryBox } from "react-icons/fa6";

export const getMenuItems = (role?: string) => {
    const isAdmin = role === "admin" || role === "superAdmin";
    const isSpecial = role === 'specialManager'

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
                { name: "Sales Overview", path: "/both/sales" },
                { name: "Commission Sales", path: "/commission-sales" },
            ],
        },
        {
            name: "Brokery",
            icon: <MdAccountBalance size={20} />,
            subItems: [
                { name: "Open", path: "dashboard/brokers" },
            ],
        },

        {
            name: "Profile",
            icon: <CgProfile size={20} />,
            subItems: [
                { name: "My Profile", path: "/profile" },
            ],
        },

        ...(isSpecial || isAdmin ? [
            {
                name: "Cash-box",
                icon: <MdDashboard size={20} />,
                subItems: [{ name: "Cash-box", path: "/cashbox" }],
            },

            {
                name: "Income_Expense",
                icon: <MdAttachMoney size={20} />,
                subItems: [
                    { name: "Income_Expense", path: "/income_expense" },
                    { name: "Labour_Godi_Tohori", path: "/kuli_godi_tohori" },
                ],
            },

            {
                name: "Customer & Supplier",
                icon: <FaPeopleCarryBox size={20} />,
                subItems: [
                    { name: "Open", path: "/partners" }
                ],
            },

            {
                name: "Banks Module",
                icon: <MdAccountBalance size={20} />,
                subItems: [
                    { name: "Banks", path: "/bankTxns" },
                ],
            },

            {
                name: "MFS",
                icon: <MdDashboard size={20} />,
                subItems: [
                    // { name: "MFS", path: "/mfs" },
                    { name: "BKASH", path: "/mfs/bkash" },
                    { name: "NAGAD", path: "/mfs/nagad" },
                    { name: "ROCKET", path: "/mfs/rocket" }
                ],
            },
        ] : []),

        // ✅ Admin / Super Admin only
        ...(isAdmin
            ? [
                {
                    name: "Human Resources",
                    icon: <MdPeople size={20} />,
                    subItems: [
                        { name: "দেখুন", path: "/hr" }
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