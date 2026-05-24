import { useEffect, useRef, useState } from "react";

export type TSearchableOption = {
    _id: string;
    name: string;
    phone?: string;
    [key: string]: any;
};

type TSearchableSelectProps = {
    label?: string;
    placeholder?: string;
    options: TSearchableOption[];
    value?: TSearchableOption | null;
    loading?: boolean;
    onSearch?: (value: string) => void;
    onSelect: (item: TSearchableOption) => void;
    displayKeys?: {
        title: string;
        subtitle?: string;
        optional?: string
    };
    className?: string;
};

const SearchableSelectField = ({
    label = "Select",
    placeholder = "খুঁজুন...",
    options,
    value,
    loading = false,
    onSearch,
    onSelect,
    displayKeys = {
        title: "name",
        subtitle: "phone",
        optional: "address"
    },
    className = "",
}: TSearchableSelectProps) => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // selected value input এ show করবে
    useEffect(() => {
        if (value?.[displayKeys.title]) {
            setSearch(value[displayKeys.title]);
        }
    }, [value, displayKeys.title]);

    // outside click => close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        setOpen(true);
        onSearch?.(value);
    };

    const handleSelect = (item: TSearchableOption) => {
        setSearch(item[displayKeys.title]);
        onSelect(item);
        setOpen(false);
    };

    return (
        <div className={`relative w-full ${className}`} ref={containerRef}>
            {label && (
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <input
                type="text"
                value={search}
                onChange={handleChange}
                onFocus={() => setOpen(true)}
                onClick={() => setOpen(true)}
                placeholder={placeholder}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />

            {open && (
                <div className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
                    {loading && (
                        <div className="px-3 py-2 text-sm text-gray-500 italic">
                            খুঁজছে...
                        </div>
                    )}

                    {!loading && options.length === 0 && (
                        <div className="px-3 py-2 text-sm text-gray-500">
                            কোন ডাটা পাওয়া যায়নি।
                        </div>
                    )}

                    {!loading &&
                        options.map((item) => (
                            <div
                                key={item._id}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleSelect(item)}
                                className="cursor-pointer border-b px-3 py-2 text-sm hover:bg-blue-50 last:border-none"
                            >
                                <div className="font-medium text-gray-900">
                                    {item[displayKeys.title]}
                                </div>

                                {displayKeys.subtitle && displayKeys.optional && (
                                    <div className="text-xs text-gray-500">
                                        {item?.[displayKeys.subtitle]} ({item?.[displayKeys.optional]})
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default SearchableSelectField;

{/* <SearchableSelect
    label="Customer"
    placeholder="Search customer..."
    options={customers}
    value={selectedCustomer}
    loading={isFetching}
    onSearch={(value) => setSearch(value)}
    onSelect={(customer) => setSelectedCustomer(customer)}
    displayKeys={{
        title: "name",
        subtitle: "phone",
    }}
/> */}