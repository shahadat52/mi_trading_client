/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItem, removeItem } from "../../redux/features/commissionSales/commissionSalesSlice";
import type { RootState } from "../../redux/store";
import { useGetCommissionProductsQuery } from "../../redux/features/commissionProduct/commissionProductApi";

// Debounce Hook
const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};

const ItemsForm = () => {
    const dispatch = useDispatch();
    const commissionSales = useSelector((state: RootState) => state.commissionSales);

    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

    const debouncedSupplier = useDebounce(commissionSales.supplier, 300);
    const { data } = useGetCommissionProductsQuery(debouncedSupplier);
    const products = data?.data || [];
    const productOptions = products.map((p: any) => ({
        name: p?.name,
        _id: p?._id,
        lot: p?.lot,
        quantity: p?.quantity
    }));

    const calculateItemTotal = useCallback((q: number, price: number) => q * price, []);

    return (
        <div>
            <h3 className="text-lg font-semibold mb-3">Items</h3>

            <div className="space-y-3">
                {commissionSales.items.map((item, index) => (
                    <div
                        key={index}
                        className="border-2 grid grid-cols-2 gap-2 items-start bg-gray-50 p-2 rounded"
                    >
                        {/* Product searchable select */}
                        <div className="col-span-2 relative">
                            <label className="block text-xs font-medium">Product</label>

                            <input
                                type="text"
                                value={
                                    productOptions?.find((p: any) => p.name === item.product)?.name || ""
                                }
                                onFocus={() => setOpenDropdownIndex(index)}
                                onChange={() => setOpenDropdownIndex(index)}
                                placeholder="Select product"
                                className="input input-bordered input-sm w-full"
                            />

                            {openDropdownIndex === index && productOptions.length > 0 && (
                                <ul className="absolute z-20 w-full max-h-48 overflow-auto border bg-white rounded shadow mt-1">
                                    {productOptions?.map((p: any, i: number) => (
                                        <li
                                            key={i}
                                            className="p-2 hover:bg-gray-200 cursor-pointer text-xs"
                                            onClick={() => {
                                                dispatch(
                                                    updateItem({
                                                        index,
                                                        item: { product: p.name, lot: p.lot }
                                                    })
                                                );
                                                setOpenDropdownIndex(null);
                                            }}
                                        >
                                            <div className="flex justify-between text-xs">
                                                <span>
                                                    <span className="font-bold">নাম:</span> {p?.name} <span className="font-bold">স্টক:</span> {p?.quantity}
                                                </span>
                                                <span>
                                                    <span className="font-bold">লট:</span>{" "}
                                                    {p?.lot}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="block text-xs font-medium">Qty</label>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => {
                                    const q = Number(e.target.value);
                                    const total = calculateItemTotal(q, item.salesPrice);
                                    dispatch(updateItem({ index, item: { quantity: q, total } }));
                                }}
                                className="input input-bordered input-sm w-full"
                            />
                        </div>

                        {/* Sales Price */}
                        <div>
                            <label className="block text-xs font-medium">Sales Price</label>
                            <input
                                type="number"
                                value={item.salesPrice}
                                onChange={(e) => {
                                    const price = Number(e.target.value);
                                    const total = calculateItemTotal(item.quantity, price);
                                    dispatch(updateItem({ index, item: { salesPrice: price, total } }));
                                }}
                                className="input input-bordered input-sm w-full"
                            />
                        </div>

                        {/* Commission */}
                        <div>
                            <label className="block text-xs font-medium">Comm. %</label>
                            <input
                                type="number"
                                value={item.commissionRatePercent}
                                onChange={(e) =>
                                    dispatch(
                                        updateItem({
                                            index,
                                            item: { commissionRatePercent: Number(e.target.value) }
                                        })
                                    )
                                }
                                className="input input-bordered input-sm w-full"
                            />
                        </div>

                        {/* Remove */}
                        <div className="flex items-end">
                            <button
                                type="button"
                                onClick={() => dispatch(removeItem(index))}
                                className="btn btn-error btn-sm"
                            >
                                বাদ দিন
                            </button>
                        </div>

                        {/* Total */}
                        <div>
                            <label className="block text-xs font-medium">Total</label>
                            <input
                                type="number"
                                readOnly
                                value={item.total}
                                className="input input-bordered input-sm bg-gray-100 w-full"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Button */}
            <button
                type="button"
                onClick={() =>
                    dispatch(
                        addItem({
                            product: "",
                            quantity: 1,
                            lot: 1,
                            salesPrice: 0,
                            commissionRatePercent: 0,
                            total: 0
                        })
                    )
                }
                className="btn btn-primary mt-3"
            >
                ➕ Add Item
            </button>
        </div>
    );
};

export default ItemsForm;
