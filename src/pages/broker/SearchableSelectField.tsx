/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "../../utils/useDebounce";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useGetAllBrokersQuery } from "../../redux/features/broker/brokerApi";
import { setBrokerName } from "../../redux/features/cart/cartSlice";

export type TBroker = {
    _id: string;
    name: string;
    phone?: string;
};

const SearchableSelectField = () => {
    const dispatch = useAppDispatch();

    // নিশ্চিত হয়ে নিন যে আপনার state.cart এর ভেতর broker অবজেক্টটি আছে
    const selectedBroker = useAppSelector((state: any) => state.cart.broker);

    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const debouncedSearch = useDebounce(search, 400);

    // search কাজ করার জন্য query parameter টি ঠিক আছে কিনা চেক করুন
    const { data, isFetching } = useGetAllBrokersQuery(
        { searchTerm: debouncedSearch },
        { skip: !open && !search }
    );

    const brokers: TBroker[] = data?.data ?? [];

    // শুধু মাউন্ট হওয়ার সময় বা selectedBroker পরিবর্তন হলে search সেট হবে
    useEffect(() => {
        if (selectedBroker?.name) {
            setSearch(selectedBroker.name);
        }
    }, [selectedBroker?.name]);

    // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করার জন্য
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (broker: TBroker) => {
        dispatch(
            setBrokerName({
                _id: broker._id,
                name: broker.name,
            })
        );
        setSearch(broker.name);
        setOpen(false); // সিলেক্ট করার পর ড্রপডাউন বন্ধ
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            <label className="mb-1 block text-sm font-medium text-gray-700">
                ব্রোকার
            </label>

            <input
                type="text"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    if (!open) setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                placeholder="খুঁজুন..."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />

            {open && (
                <div className="absolute border-gray-200 z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg">
                    {isFetching && (
                        <div className="px-3 py-2 text-sm text-gray-500 italic">
                            খুঁজছে...
                        </div>
                    )}

                    {!isFetching && brokers.length === 0 && (
                        <div className="px-3 py-2 text-sm text-gray-500">
                            কোন ব্রোকার পাওয়া যায়নি।
                        </div>
                    )}

                    {!isFetching &&
                        brokers.map((broker) => (
                            <div
                                key={broker._id}
                                onClick={() => handleSelect(broker)}
                                className="cursor-pointer px-3 py-2 text-sm hover:bg-blue-50 border-b last:border-none"
                            >
                                <div className="font-medium text-gray-900">
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

export default SearchableSelectField;