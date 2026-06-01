/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { MdDelete } from "react-icons/md";
import { calculateGrandTotal, removeItem, setCustomerCommission, setLabour, setComments, setOthers, setPaidAmount, setPaymentMethod, updateCommissionRate, updateQuantity, updateSalePrice, resetCart, updateBosta, setBrokerBill, setBrokerName, setCustomer } from "../../redux/features/cart/cartSlice";
import Modal from "../../components/Modal";
import AddCustomer from "../home/AddCustomer";
import { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useBothSalesEntryMutation } from "../../redux/features/cart/cartApi";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import SearchableSelectField from "../../components/searchableFields/SearchableSelectField";
import { useGetAllBrokersQuery } from "../../redux/features/broker/brokerApi";
import { useDebounce } from "../../utils/useDebounce";
import { useGetAllCustomersQuery } from "../../redux/features/customer/customerApi";
import CalculatorField from "./CalculatorField";
import type { RootState } from "../../redux/store";
import { PAYMENT_METHOD_OPTIONS } from "../../utils/options";

const CheckoutPage = () => {
    const dispatch = useAppDispatch();

    // Customer selection
    const [customerSearch, setCustomerSearch] = useState("");
    const debouncedCustomerSearch = useDebounce(customerSearch, 400);
    const { data: customerData, isFetching: customerFetching } = useGetAllCustomersQuery({ searchTerm: debouncedCustomerSearch, });
    const selectedCustomer = useAppSelector((state: RootState) => state.cart.customer);
    const customers = customerData?.data ?? [];
    // Broker selection
    const selectedBroker = useAppSelector((state: any) => state.cart.broker);
    const [brokerSearch, setBrokerSearch] = useState("");
    const debouncedBrokerSearch = useDebounce(brokerSearch, 400);
    const { data, isFetching } = useGetAllBrokersQuery({ searchTerm: debouncedBrokerSearch, });
    const brokers: any[] = data?.data ?? [];
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const products = useAppSelector((state: any) => state.cart.items)
    const cart = useAppSelector((state: any) => state.cart)
    const { register } = useForm();
    const commissionProds = products?.filter((prod: any) => Number(prod.commission) > 0);
    const totalCommission = commissionProds?.reduce((acc: any, prod: any) => acc + Number(prod.commission || 0), 0);
    const subTotal = products?.map((p: any) => p.salePrice * p.quantity).reduce((acc: any, prod: any) => acc + Number(prod || 0), 0);

    const grandTotal = totalCommission + cart.grandTotal


    const [createSales] = useBothSalesEntryMutation()
    const handleSales = async () => {
        setLoading(true)
        const toastId = toast.loading("Processing...");
        const updatedCart = {
            ...cart,
            subtotal: subTotal,
            grandTotal: grandTotal,
            customer: cart.customer._id,

        };


        try {
            setLoading(true);

            const result = await createSales(updatedCart)

            if (result?.data?.success) {
                setLoading(false)
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                dispatch(resetCart())
            } else {
                setLoading(false)
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });
            }
        } catch (err: any) {
            setLoading(false)
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-6 mb-[60px] rounded-lg">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                    {/* LEFT SECTION */}
                    <div className="lg:col-span-2 space-y-1">
                        {/* Sales Products */}
                        <div>
                            <div className="overflow-x-auto">
                                <table className=" min-w-full border border-gray-200 text-sm text-center">
                                    <thead className="w-full bg-gray-50 text-gray-700 uppercase">
                                        <tr>
                                            <th className="px-4 py-2 ">পন্য</th>
                                            <th className="px-6 py-2 ">বস্তা</th>
                                            <th className="px-6 py-2 ">পরিমান</th>
                                            <th className="px-6 py-2 ">দাম</th>
                                            <th className="px-6 py-2 ">মোট</th>
                                            <th className="px-6 py-2 ">কমিশন</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            products?.map((product: any, idx: number) => (
                                                <tr key={idx} className=" hover:bg-gray-50">
                                                    <td className="px-2 py-2 ">
                                                        {product.name}
                                                        <span
                                                            onClick={() => dispatch(removeItem(product.product))}
                                                            className="text-red-600">
                                                            <MdDelete size={25} />
                                                        </span>
                                                    </td>

                                                    <td className="px-2 py-2">
                                                        <input
                                                            type="number"
                                                            className="input "
                                                            value={product.bosta}
                                                            onChange={(e) => {

                                                                dispatch(
                                                                    updateBosta({
                                                                        productId: product.product,
                                                                        bosta: Number(e.target.value),
                                                                    })
                                                                );
                                                                dispatch(calculateGrandTotal())
                                                            }
                                                            }
                                                        />
                                                    </td>

                                                    <td className="px-2">

                                                        <CalculatorField
                                                            initialValue={product.quantity}
                                                            onUpdate={(val) =>
                                                                dispatch(updateQuantity({ productId: product.product, quantity: val }))
                                                            }
                                                        />

                                                    </td>

                                                    <td className="px-2">
                                                        <input
                                                            type="number"
                                                            className="input w-12 border rounded px-2 py-1"
                                                            value={product.salePrice}
                                                            onChange={(e) => {

                                                                dispatch(
                                                                    updateSalePrice({
                                                                        productId: product.product,
                                                                        salePrice: Number(e.target.value),
                                                                    })
                                                                );
                                                                dispatch(calculateGrandTotal())
                                                            }
                                                            }
                                                        />
                                                    </td>


                                                    <td className="px-2">
                                                        ৳ {Number(product.quantity * product.salePrice)}
                                                    </td>
                                                    {product?.commission !== undefined && (
                                                        <td className="px-2 py-1">
                                                            <CalculatorField
                                                                initialValue={product.commission}
                                                                onUpdate={(val) =>
                                                                    dispatch(updateCommissionRate({ productId: product.product, commission: val }))
                                                                }
                                                            />
                                                        </td>
                                                    )}
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <p className="text-end mr-[10%] lg:mr-[18%]">মোটঃ{subTotal}</p>
                                <p className="text-end mr-[10%] lg:mr-[18%]">কমিশনঃ {totalCommission}</p>  <hr />
                            </div>


                        </div>
                        {/* Customer Info */}
                        <div>
                            <div className="flex items-center justify-end w-full mt-3 mb-[-12px]">
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="text-2xl flex  px-2 rounded"
                                >
                                    <p className=" bg-red-600 text-white   rounded-full w-auto p-2"> <IoPersonAddSharp /></p>
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-3">
                                {/* কাস্টমার */}
                                <section>
                                    <SearchableSelectField
                                        label="কাষ্টমার"
                                        placeholder="কাষ্টমার খুঁজুন..."
                                        options={customers}
                                        value={selectedCustomer}
                                        loading={customerFetching}
                                        onSearch={(value) => setCustomerSearch(value)}
                                        onSelect={(customer) => dispatch(
                                            setCustomer({
                                                _id: customer?._id,
                                                name: customer?.name,
                                            })
                                        )}
                                        displayKeys={{
                                            title: "name",
                                            subtitle: "address",
                                            optional: "phone",
                                        }}
                                    />
                                </section>
                                <div>
                                    <label htmlFor="">লেবার</label>
                                    <CalculatorField
                                        initialValue={cart.labour}
                                        onUpdate={(val) =>
                                            dispatch(setLabour(val))
                                        }
                                    />
                                </div>


                                <div className="grid grid-cols-3 gap-2">

                                    {/* ব্রোকার */}
                                    <div className="col-span-2">
                                        <SearchableSelectField
                                            label="ব্রোকার"
                                            placeholder="ব্রোকার খুঁজুন..."
                                            options={brokers}
                                            value={selectedBroker}
                                            loading={isFetching}
                                            onSearch={(value) => setBrokerSearch(value)}
                                            onSelect={(broker) =>
                                                dispatch(
                                                    setBrokerName({
                                                        _id: broker._id,
                                                        name: broker.name,
                                                    })
                                                )
                                            }
                                            displayKeys={{
                                                title: "name",
                                                subtitle: "phone",
                                            }}
                                        />

                                    </div>
                                    <div className="col-span-1 ">
                                        <label className="mb-[2px] block text-sm font-medium text-gray-700">
                                            ব্রোকারি
                                        </label>
                                        <CalculatorField
                                            initialValue={cart.brokerBill}
                                            onUpdate={(val) =>
                                                dispatch(setBrokerBill(val))
                                            }
                                        />

                                    </div>

                                </div>

                                {/* Payment */}
                                <div className="">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            পেমেন্ট মেথড
                                        </label>
                                        <select
                                            {...register("paymentMethod", {
                                                onChange: (e) => dispatch(setPaymentMethod(e.target.value)),
                                            })}
                                            className="input"
                                        >
                                            {PAYMENT_METHOD_OPTIONS?.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>



                                </div>

                                {/* others input */}

                                <div>
                                    <label htmlFor="">কাস্টমার কমিশন</label>

                                    <CalculatorField
                                        initialValue={cart.customerCommission}
                                        onUpdate={(val) => {
                                            dispatch(setCustomerCommission(val));
                                            dispatch(calculateGrandTotal())
                                        }}
                                    />

                                </div>

                                <div>
                                    <label htmlFor="">অন্যান্য</label>
                                    <input
                                        type="number"
                                        className="input"
                                        required
                                        onChange={(e) => {
                                            dispatch(setOthers(Number(e.target.value)));
                                            dispatch(calculateGrandTotal());
                                        }}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="">পরিশোধিত মূল্য</label>
                                    <input
                                        type="number"
                                        className="input"
                                        required
                                        onChange={(e) => {
                                            dispatch(setPaidAmount(Number(e.target.value)));
                                            dispatch(calculateGrandTotal());
                                        }}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="">নোট</label>
                                    <input
                                        type="string"
                                        className="input"
                                        required
                                        onChange={(e) => {
                                            dispatch(setComments(e.target.value));
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="bg-white rounded-xl shadow p-3 h-fit">
                        <h2 className="uppercase text-lg font-semibold mb-4">Sale Summary</h2>

                        <div className="space-y-3 text-sm">

                            <div className="flex justify-between text-base font-semibold">
                                <span>Grand Total</span>
                                <span>{grandTotal}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleSales}
                            className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                        >
                            {
                                loading ? <Loading /> : 'Place Order'
                            }
                        </button>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <AddCustomer onClose={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
};

export default CheckoutPage;
