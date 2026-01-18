/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useDebounce } from "../../utils/useDebounce";
import { useAppDispatch } from "../../redux/hook";
import { useGetAllSuppliersQuery } from "../../redux/features/supplier/supplierApi";
import { setSupplier } from "../../redux/features/commissionProduct/commissionProductSlice";

type Product = {
    _id: string;
    name: string;
    sku?: string;
};
const SupplierSearchableSelectField = () => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch();

    const debouncedSearch = useDebounce(search, 400);

    const { data, isFetching } = useGetAllSuppliersQuery(
        { search: debouncedSearch, limit: 20, type: 'commission' },
        { skip: !open }
    );

    const suppliers: Product[] = data?.data ?? [];

    const handleSelect = (customer: any) => {
        dispatch(setSupplier(customer._id));
        setSearch(customer.name);
        setOpen(false);
    };

    return (
        <div className="relative w-full">
            <label className="mb-1 block text-sm font-medium text-gray-700">
                সাপ্লাইয়ার
            </label>

            <input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                placeholder="নাম খুজুন..."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />

            {open && (
                <div className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow">
                    {isFetching && (
                        <div className="px-3 py-2 text-sm text-gray-500">
                            Searching…
                        </div>
                    )}

                    {!isFetching && suppliers.length === 0 && (
                        <div className="px-3 py-2 text-sm text-gray-500">
                            কোন সাপ্লাইয়ার পাওয়া যায়নি।
                        </div>
                    )}

                    {!isFetching &&
                        suppliers.map((product) => (
                            <div
                                key={product._id}
                                onClick={() => handleSelect(product)}
                                className="cursor-pointer px-3 py-2 text-sm hover:bg-blue-50"
                            >
                                <div className="font-medium">{product.name}</div>
                                {product.sku && (
                                    <div className="text-xs text-gray-500">
                                        SKU: {product.sku}
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}

export default SupplierSearchableSelectField;