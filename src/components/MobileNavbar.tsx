import { NavLink } from "react-router-dom";
import {
    FaTachometerAlt,
    FaBoxes,
    FaShoppingCart,
    // FaUsers,
    // FaMoneyBillWave,
    FaChartBar,
    FaHome,
    FaUser,
} from "react-icons/fa";
import type { JSX } from "react";

type NavItem = {
    to: string;
    label: string;
    icon: JSX.Element;
};

const navItems: NavItem[] = [
    { to: "/", label: "Home", icon: <FaHome className="h-6 w-6" /> },
    { to: "/", label: "Dashboard", icon: <FaTachometerAlt className="h-6 w-6" /> },
    { to: "/stock", label: "Inventory", icon: <FaBoxes className="h-6 w-6" /> },
    { to: "/sales/overview", label: "Sales", icon: <FaShoppingCart className="h-6 w-6" /> },
    { to: "/reports", label: "Reports", icon: <FaChartBar className="h-6 w-6" /> },
    { to: "/profile", label: "Profile", icon: <FaUser className="h-6 w-6" /> },
];


const MobileNavbar = () => {
    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md">
            <ul className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <li key={item.to}>
                        <NavLink
                            to={item.to}
                            end
                            className={({ isActive }) =>
                                `flex flex-col items-center text-sm ${isActive ? "text-blue-600" : "text-gray-500"
                                }`
                            }
                        >
                            {item.icon}
                            <span className="mt-1">{item.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>

    );
};

export default MobileNavbar;