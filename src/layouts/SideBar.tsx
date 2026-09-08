
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { Banknote, Home } from "lucide-react";
import {
    MdCancel,
    MdExpandLess,
    MdExpandMore,
} from "react-icons/md";

import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setDrawerController } from "../redux/features/common/commonSlice";
import { getMenuItems } from "./MenuItems";

import devIcon from "../assets/developer.jpg";

const SideBar = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const drawerController = useAppSelector(
        (state: any) => state.common.drawerController
    );

    const user = useAppSelector(
        (state: any) => state?.auth?.auth?.user
    );

    const [collapsedMenus, setCollapsedMenus] = useState<Set<string>>(
        new Set()
    );

    // Desktop sidebar collapsed state

    const menuItems = getMenuItems(user?.role);

    /**
     * Check whether any submenu of a parent menu is currently active
     */
    const isActiveParent = (subItems: { path: string }[] = []) => {
        return subItems.some((sub) => {
            return (
                location.pathname === sub.path ||
                location.pathname.startsWith(`${sub.path}/`)
            );
        });
    };

    /**
     * Toggle submenu
     */
    const toggleCollapseMenu = (menuName: string) => {
        setCollapsedMenus((prev) => {
            const newSet = new Set(prev);

            if (newSet.has(menuName)) {
                newSet.delete(menuName);
            } else {
                newSet.add(menuName);
            }

            return newSet;
        });
    };

    /**
     * Close mobile drawer
     */
    const closeMobileDrawer = () => {
        dispatch(setDrawerController(false));
    };

    return (
        <>

            <div
                onClick={closeMobileDrawer}
                className={`
                    fixed inset-0 z-30
                    bg-black/40
                    backdrop-blur-[2px]
                    transition-opacity duration-300

                    lg:hidden

                    ${drawerController
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                    }
                `}
            />


            <aside
                className={`
        fixed
        top-0
        left-0
        z-40
        h-screen
        w-72
        bg-slate-900
        text-white
        shadow-2xl
        transition-transform
        duration-300
        ease-in-out

        ${drawerController
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
    `}
            >

                <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
                    {/* Logo / Title */}
                    <div
                        className={`
                            flex items-center gap-3
                            overflow-hidden
                            transition-all duration-300

                        `}
                    >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold  text-white shadow-lg">
                            M.I
                        </div>

                        <div className="whitespace-nowrap">
                            <h2 className="text-sm uppercase font-bold text-white">
                                {user?.name}
                            </h2>

                            <p className="text-sm uppercase text-slate-400">
                                {user?.role}
                            </p>
                        </div>
                    </div>

                    {/* Desktop Collapse Button */}
                    <button
                        className=" p-2 rounded-md hover:bg-white/10 transition"
                        onClick={() => dispatch(setDrawerController(!drawerController))} // 🔥 Close sidebar
                    >
                        <MdCancel size={24} />
                    </button>
                </div>

                {/* =================================================
                    Navigation
                ================================================== */}
                <div className="h-[calc(100vh-4rem)] overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    <nav className="space-y-1">
                        {/* =================================================
                            Home
                        ================================================== */}
                        <NavLink
                            to="/"
                            end
                            onClick={closeMobileDrawer}
                            title="Home"
                            className={({ isActive }) =>
                                `
                                group
                                flex
                                items-center
                                rounded-md
                                py-2.5
                                text-sm
                                font-medium
                                transition-all
                                duration-200

                                ${isActive
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                                }
                                `
                            }
                        >
                            <Home
                                size={19}
                                className="shrink-0 mr-4"
                            />

                            <span
                                className={`
                                    whitespace-nowrap
                                    transition-all
                                    duration-200
                                `}
                            >
                                Home
                            </span>
                        </NavLink>

                        <NavLink
                            to="/cheque"
                            end
                            onClick={closeMobileDrawer}
                            title="Home"
                            className={({ isActive }) =>
                                `
                                group
                                flex
                                items-center
                                rounded-md
                                py-2.5
                                text-sm
                                font-medium
                                transition-all
                                duration-200

                                ${isActive
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                                }
                                `
                            }
                        >
                            <Banknote
                                size={19}
                                className="shrink-0 mr-4"
                            />

                            <span
                                className={`
                                    whitespace-nowrap
                                    transition-all
                                    duration-200
                                `}
                            >
                                Cheque
                            </span>
                        </NavLink>

                        {/* =================================================
                            Menu Items
                        ================================================== */}
                        {menuItems.map((menu: any) => {
                            const activeParent = isActiveParent(
                                menu.subItems
                            );

                            const menuCollapsed =
                                collapsedMenus.has(menu.name);

                            const hasSubItems =
                                Array.isArray(menu.subItems) &&
                                menu.subItems.length > 0;

                            return (
                                <div
                                    key={menu.name}
                                    className="relative"
                                >
                                    {/* ================================
                                        Parent Menu
                                    ================================= */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (hasSubItems) {
                                                toggleCollapseMenu(
                                                    menu.name
                                                );
                                            }
                                        }}
                                        title={menu.name}
                                        className={`
                                            group
                                            flex
                                            w-full
                                            items-center
                                            justify-between
                                            rounded-md
                                            py-2.5
                                            text-sm
                                            font-medium
                                            transition-all
                                            duration-200

                                            

                                            ${activeParent
                                                ? "bg-blue-500/15 text-blue-300"
                                                : "text-slate-300 hover:bg-white/10 hover:text-white"
                                            }
                                        `}
                                    >
                                        <span className="flex min-w-0 items-center gap-3">
                                            {/* Menu Icon */}
                                            <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                                                {menu.icon}
                                            </span>

                                            {/* Menu Name */}
                                            <span
                                                className={`
                                                    whitespace-nowrap
                                                    transition-all
                                                    duration-200

                                                 
                                                `}
                                            >
                                                {menu.name}
                                            </span>
                                        </span>

                                        {/* Expand Icon */}
                                        {hasSubItems && (
                                            <span
                                                className={`
                                                    shrink-0
                                                    transition-all
                                                    duration-200

                                                    
                                                `}
                                            >
                                                {menuCollapsed ? (
                                                    <MdExpandLess size={19} />
                                                ) : (
                                                    <MdExpandMore size={19} />
                                                )}
                                            </span>
                                        )}
                                    </button>

                                    {/* ====================================
                                        Submenu
                                    ===================================== */}
                                    {hasSubItems &&
                                        menuCollapsed &&
                                        <div className="ml-5 mt-1 space-y-1 border-l border-white/10 pl-3">
                                            {menu.subItems.map(
                                                (sub: any) => (
                                                    <NavLink
                                                        key={sub.name}
                                                        to={sub.path}
                                                        onClick={
                                                            closeMobileDrawer
                                                        }
                                                        className={({
                                                            isActive,
                                                        }) =>
                                                            `
                                                                block
                                                                rounded-md
                                                                px-3
                                                                py-2
                                                                text-sm
                                                                transition-all
                                                                duration-200

                                                                ${isActive
                                                                ? "bg-blue-600 text-white shadow-sm"
                                                                : "text-slate-400 hover:bg-white/10 hover:text-white"
                                                            }
                                                                `
                                                        }
                                                    >
                                                        {sub.name}
                                                    </NavLink>
                                                )
                                            )}
                                        </div>
                                    }
                                </div>
                            );
                        })}

                        {/* =================================================
                            Developer
                        ================================================== */}
                        <NavLink
                            to="/developers"
                            onClick={closeMobileDrawer}
                            title={"Developer's"}
                            className={({ isActive }) =>
                                `
                                group
                                mt-3
                                flex
                                items-center
                                rounded-md
                                py-2.5
                                text-sm
                                font-medium
                                transition-all
                                duration-200

                               

                                ${isActive
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                                }
                                `
                            }
                        >
                            <img
                                src={devIcon}
                                alt="Developer"
                                className="
                                mr-4
                                    h-[19px]
                                    w-[19px]
                                    shrink-0
                                    rounded
                                    object-cover
                                    ring-1
                                    ring-white/20
                                "
                            />

                            <span
                                className={`
                                    whitespace-nowrap
                                    transition-all
                                    duration-200 
                                `}
                            >
                                Developer's
                            </span>
                        </NavLink>
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default SideBar;

