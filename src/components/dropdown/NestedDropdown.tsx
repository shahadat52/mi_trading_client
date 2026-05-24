import { useState } from "react";


export type TMenuItem = {
    label: string;
    value?: string;
    children?: TMenuItem[];
};
type Props = {
    items: TMenuItem[];
    depth?: number;
};

const NestedDropdown = ({ items, depth = 0 }: Props) => {
    return (
        <ul className={`bg-white shadow rounded min-w-[200px]`}>
            {items?.map((item, index) => (
                <DropdownItem key={index} item={item} depth={depth} />
            ))}
        </ul>
    );
};

const DropdownItem = ({
    item,
    depth,
}: {
    item: TMenuItem;
    depth: number;
}) => {
    const [open, setOpen] = useState(false);

    const hasChildren = item.children && item.children.length > 0;

    return (
        <li
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                className="flex justify-between items-center w-full px-4 py-2 hover:bg-gray-100"
            >
                <span>{item.label}</span>
                {hasChildren && <span>▶</span>}
            </button>

            {hasChildren && open && (
                <div
                    className={`absolute top-0 ${depth === 0 ? "left-full" : "left-full"
                        }`}
                >
                    <NestedDropdown items={item.children!} depth={depth + 1} />
                </div>
            )}
        </li>
    );
};

export default NestedDropdown;