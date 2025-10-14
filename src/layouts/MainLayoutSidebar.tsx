/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { menuItems } from './constant/MenuItems';
import { NavLink, useLocation } from 'react-router';
import { MdCancel, MdExpandLess, MdExpandMore, MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { useAppSelector } from '../redux/hook';


const drawerWidth = "260px";
const collapsedWidth = "70px";
const MainLayoutSidebar = () => {
    const [isOpen, setIsOpen] = useState(false); // Mobile menu
    const location = useLocation();
    const user = useAppSelector((state: any) => state?.auth?.auth?.user);
    const [collapsedMenus, setCollapsedMenus] = useState<Set<string>>(new Set());
    const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar collapse
    const isActiveParent = (subItems: { path: string }[]) =>
        subItems.some((sub) => location.pathname.startsWith(sub.path));

    const toggleCollapseMenu = (menu: string) => {
        const newSet = new Set(collapsedMenus);
        if (newSet.has(menu)) newSet.delete(menu);
        else newSet.add(menu);
        setCollapsedMenus(newSet);
    };
    return (
        <aside
            className={`fixed z-30 top-0 left-0 h-full bg-[#0b1f3a] dark:bg-gray-800 text-white 
                           shadow-2xl transform transition-all duration-300 ease-in-out
                           ${isOpen ? "translate-x-0" : "-translate-x-full"}
                           sm:translate-x-0 sm:static sm:shadow-none`}
            style={{ width: isCollapsed ? collapsedWidth : drawerWidth }}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4 h-16 shadow-md shadow-gray-500">
                {!isCollapsed && <h2 className="text-lg font-semibold tracking-wide">{user?.name}</h2>}

                <div className="flex items-center gap-2">
                    {/* Collapse Button */}
                    <button
                        className="p-1 rounded-md hover:bg-white/10 transition"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {isCollapsed ? (
                            <MdOutlineChevronRight size={24} />
                        ) : (
                            <MdOutlineChevronLeft size={24} />
                        )}
                    </button>

                    {/* Mobile close button */}
                    <button
                        className="sm:hidden p-2 rounded-md hover:bg-white/10 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        <MdCancel size={24} />
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="mt-4 px-3 overflow-y-auto h-[calc(100%-4rem)] scrollbar-thin scrollbar-thumb-gray-300">
                {menuItems.map((menu) => {
                    const activeParent = isActiveParent(menu.subItems);
                    const menuCollapsed = collapsedMenus.has(menu.name);

                    return (
                        <div key={menu.name} className="mb-1">
                            <button
                                onClick={() => toggleCollapseMenu(menu.name)}
                                className={`flex items-center justify-between w-full px-3 py-2 text-[15px] font-medium rounded-md transition-all duration-200
                                               ${activeParent
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                        : "text-gray-200 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                <span className="flex items-center gap-3">
                                    {menu.icon}
                                    {!isCollapsed && menu.name}
                                </span>
                                {!isCollapsed && (menuCollapsed ? <MdExpandLess size={18} /> : <MdExpandMore size={18} />)}
                            </button>

                            {/* Submenu */}
                            {menuCollapsed && !isCollapsed && (
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
    );
};

export default MainLayoutSidebar;