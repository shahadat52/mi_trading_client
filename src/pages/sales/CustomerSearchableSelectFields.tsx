import { useState, useEffect } from "react";
import { useDebounce } from "../../utils/useDebounce";
import { useGetAllCustomersQuery } from "../../redux/features/customer/customerApi";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setCustomer } from "../../redux/features/cart/cartSlice";

type Customer = {
    _id: string;
    name: string;
    phone?: string;
};

const CustomerSearchableSelectFields = () => {
    const dispatch = useAppDispatch();
    const selectedCustomer = useAppSelector((state: any) => state.cart.customer);

    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const debouncedSearch = useDebounce(search, 400);

    const { data, isFetching } = useGetAllCustomersQuery(
        { search: debouncedSearch, limit: 20 },
        { skip: !open }
    );

    const customers: Customer[] = data?.data ?? [];

    // যদি redux এ আগে থেকেই customer থাকে → name show করবে
    useEffect(() => {
        if (selectedCustomer) {
            setSearch(selectedCustomer.name);
        }
    }, [selectedCustomer]);

    const handleSelect = (customer: any) => {
        dispatch(
            setCustomer({
                _id: customer?._id,
                name: customer?.name,
            })
        );

        setSearch(customer.name);
        setOpen(false);
    };

    return (
        <div className="relative w-full">
            <label className="mb-1 block text-sm font-medium text-gray-700">
                কাস্টমার
            </label>

            <input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                placeholder="খুঁজুন..."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />

            {open && (
                <div className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow">
                    {isFetching && (
                        <div className="px-3 py-2 text-sm text-gray-500">
                            খুঁজছে...
                        </div>
                    )}

                    {!isFetching && customers.length === 0 && (
                        <div className="px-3 py-2 text-sm text-gray-500">
                            কোন গ্রাহক পাওয়া যায়নি।
                        </div>
                    )}

                    {!isFetching &&
                        customers.map((customer) => (
                            <div
                                key={customer._id}
                                onClick={() => handleSelect(customer)}
                                className="cursor-pointer px-3 py-2 text-sm hover:bg-blue-50"
                            >
                                <div className="font-medium">
                                    {customer.name}
                                </div>
                                {customer.phone && (
                                    <div className="text-xs text-gray-500">
                                        {customer.phone}
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default CustomerSearchableSelectFields;
