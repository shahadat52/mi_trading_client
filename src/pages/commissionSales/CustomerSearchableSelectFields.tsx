/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useDebounce } from "../../utils/useDebounce";
import { useGetAllCustomersQuery } from "../../redux/features/customer/customerApi";
import { setCustomer } from "../../redux/features/commissionSales/commissionSalesSlice";
import { useAppDispatch } from "../../redux/hook";

type Product = {
    _id: string;
    name: string;
    sku?: string;
};

const CustomerSearchableSelectFields = () => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const debouncedSearch = useDebounce(search, 400);
    const dispatch = useAppDispatch();

    const { data, isFetching } = useGetAllCustomersQuery(
        { search: debouncedSearch, limit: 20 },
        { skip: !open }
    );

    const products: Product[] = data?.data ?? [];

    const handleSelect = (customer: any) => {
        dispatch(setCustomer(customer._id));
        setSearch(customer.name);
        setOpen(false);
    };

    return (
        <div className="relative w-full">
            <label className="mb-1 block text-sm font-medium text-gray-700">
                কাষ্টমার
            </label>

            <input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                placeholder="খুজুন..."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />

            {open && (
                <div className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow">
                    {isFetching && (
                        <div className="px-3 py-2 text-sm text-gray-500">
                            খুজুন…
                        </div>
                    )}

                    {!isFetching && products.length === 0 && (
                        <div className="px-3 py-2 text-sm text-gray-500">
                            No products found
                        </div>
                    )}

                    {!isFetching &&
                        products.map((product) => (
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

export default CustomerSearchableSelectFields;