/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useDebounce } from "../../utils/useDebounce";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setBrokerName } from "../../redux/features/cart/cartSlice";
import { useGetAllProductNamesQuery } from "../../redux/features/product/productApi";

export type TBroker = {
    _id: string;
    name: string;
    phone?: string;
};

const ProductSearchableSelectField = () => {
    const dispatch = useAppDispatch();
    const selectedBroker = useAppSelector((state: any) => state.broker);

    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const debouncedSearch = useDebounce(search, 400);

    const { data, isFetching } = useGetAllProductNamesQuery(
        { search: debouncedSearch, limit: 20 },
        { skip: !open }
    );

    const brokers: TBroker[] = data?.data ?? [];

    useEffect(() => {
        if (selectedBroker) {
            setSearch(selectedBroker.name);
        }
    }, [selectedBroker]);

    const handleSelect = (broker: any) => {
        dispatch(
            setBrokerName({
                _id: broker?._id,
                name: broker?.name,
            })
        );

        setSearch(broker.name);
        setOpen(false);
    };

    return (
        <div className="relative w-full">
            <label className="mb-1 block text-sm font-medium text-gray-700">
                ব্রোকার
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

                    {!isFetching && brokers.length === 0 && (
                        <div className="px-3 py-2 text-sm text-gray-500">
                            কোন ব্রোকার পাওয়া যায়নি।
                        </div>
                    )}

                    {!isFetching &&
                        brokers.map((broker) => (
                            <div
                                key={broker._id}
                                onClick={() => handleSelect(broker)}
                                className="cursor-pointer px-3 py-2 text-sm hover:bg-blue-50"
                            >
                                <div className="font-medium">
                                    {broker.name}
                                </div>
                                {broker.phone && (
                                    <div className="text-xs text-gray-500">
                                        {broker.phone}
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default ProductSearchableSelectField;
