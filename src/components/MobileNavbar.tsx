import { NavLink } from "react-router-dom";
import {
    FaShoppingCart,
    FaHome,
} from "react-icons/fa";
import type { JSX } from "react";
import { useAppSelector } from "../redux/hook";
import { FaProductHunt, FaSalesforce } from "react-icons/fa6";

type NavItem = {
    to: string;
    label: string;
    icon: JSX.Element;
};


const MobileNavbar = () => {

    const cart = useAppSelector((state) => state?.cart)

    const navItems: NavItem[] = [
        { to: "/", label: "Home", icon: <FaHome className="h-6 w-6" /> },
        { to: "/both/sales", label: "Sales", icon: <FaSalesforce className="h-6 w-6" /> },
        { to: "/products", label: "Products", icon: <FaProductHunt className="h-6 w-6" /> },
    ];

    return (
        <nav className=" fixed bottom-0 left-0 right-0 bg-blue-900 border-t border-gray-200 shadow-md">
            <ul className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <li key={item.to}>
                        <NavLink
                            to={item.to}
                            end
                            className={({ isActive }) =>
                                `flex flex-col items-center text-sm ${isActive ? "text-orange-500 font-bold" : "text-gray-100"
                                }`
                            }
                        >
                            {item.icon}
                            <span className="uppercase mt-1">{item.label}</span>
                        </NavLink>
                    </li>
                ))}

                <li>
                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            `relative mt-1 flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-200 ${isActive
                                ? "text-orange-500 "
                                : "text-gray-50 hover:text-orange-400"
                            }`
                        }
                    >
                        {cart?.items?.length > 0 && (
                            <span className="absolute -top-1 right-1 min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full bg-orange-500 text-white text-[11px] font-bold shadow-md">
                                {cart.items.length}
                            </span>
                        )}

                        <FaShoppingCart size={28} className="" />
                        <span className="text-xs font-medium uppercase">Cart</span>
                    </NavLink>
                </li>
            </ul>
        </nav>

    );
};

export default MobileNavbar;