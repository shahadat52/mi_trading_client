import { useState, useRef, useEffect } from "react";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import type { TSalesProducts } from "../../interfaces/sales";

interface Props {
    value: string;
    onChange: (value: string, product?: TSalesProducts) => void;
}

const ProductSearchSelect = ({ value, onChange }: Props) => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const { data } = useGetAllProductsQuery({ search, limit: 20 });
    const products: TSalesProducts[] = data?.data || [];
    // Currently selected product
    const selected = products.find((p) => p._id === value);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative w-full">
            {/* Search Input */}
            <input
                type="text"
                className="w-full border px-3 py-2 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Search product..."
                onFocus={() => setOpen(true)}
                value={open ? search : selected?.name || ""}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setOpen(true);
                }}
                autoComplete="off"
            />

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 w-full bg-white shadow-lg border rounded-md mt-1 max-h-60 overflow-auto custom-scrollbar">
                    {products.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-gray-500">
                            No product found
                        </div>
                    ) : (
                        products.map((p) => (
                            <div
                                key={p._id}
                                onClick={() => {
                                    onChange(p._id, p);
                                    setSearch("");
                                    setOpen(false);
                                }}
                                className="px-3 py-2 cursor-pointer hover:bg-blue-50 text-sm"
                            >
                                <div className="font-medium">{p.name}</div>
                                <div className="text-xs text-gray-500">
                                    Price: {p.salesPrice} Tk | Stock: {p.stockQty}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductSearchSelect;