import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { MdDelete } from "react-icons/md";
import { calculateGrandTotal, removeItem, setBankName, setCustomerCommission, setLabour, setComments, setOthers, setPaidAmount, setPaymentMethod, updateCommissionRate, updateQuantity, updateSalePrice, setBroker, setBankAmount, setIssueDate, setPostingDate, setBankNote, resetCart } from "../../redux/features/cart/cartSlice";
import CustomerSearchableSelectFields from "../sales/CustomerSearchableSelectFields";
import Modal from "../../components/Modal";
import AddCustomer from "../home/AddCustomer";
import { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { banksName } from "../accounts/banksName";
import { useBothSalesEntryMutation } from "../../redux/features/cart/cartApi";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const CheckoutPage = () => {
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const products = useAppSelector((state: any) => state.cart.items)
    const cart = useAppSelector((state: any) => state.cart)
    const dispatch = useAppDispatch();
    const { register } = useForm();
    const commissionProds = products?.filter((prod: any) => Number(prod.commission) > 0);
    const totalCommission = commissionProds?.reduce((acc: any, prod: any) => acc + Number(prod.commission || 0), 0);
    const subTotal = products?.map((p: any) => p.salePrice * p.quantity).reduce((acc: any, prod: any) => acc + Number(prod || 0), 0);

    const grandTotal = totalCommission + cart.grandTotal

    const [createBothSales] = useBothSalesEntryMutation()
    const handleSales = async () => {
        setLoading(true)
        const toastId = toast.loading("Processing...");
        const updatedCart = {
            ...cart,
            subtotal: subTotal,
            grandTotal: grandTotal,
            customer: cart.customer._id

        }
        console.log(updatedCart)

        try {
            setLoading(true);

            const result = await createBothSales(updatedCart)
            console.log(result)

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
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT SECTION */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Sales Products */}
                        <div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-200 text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-700 uppercase">
                                        <tr>
                                            <th className="px-4 py-2 ">পন্য</th>
                                            <th className="px-4 py-2 ">দাম</th>
                                            <th className="px-4 py-2 ">পরিমান</th>
                                            <th className="px-4 py-2 ">মোট</th>
                                            <th className="px-4 py-2 ">কমিশন</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            products?.map((product: any, idx: number) => (
                                                <tr key={idx} className="hover:bg-gray-50">
                                                    <td className="px-4 py-2 ">
                                                        {product.name}
                                                        <span
                                                            onClick={() => dispatch(removeItem(product.product))}
                                                            className="text-red-600">
                                                            <MdDelete size={25} />
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <input
                                                            type="number"
                                                            className="w-12 border rounded px-2 py-1"
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

                                                    <td className="px-4 py-2 ">
                                                        <input
                                                            type="number"
                                                            className="w-12 border rounded px-2 py-1"
                                                            value={product.quantity}
                                                            onChange={(e) => {
                                                                dispatch(
                                                                    updateQuantity({
                                                                        productId: product.product,
                                                                        quantity: Number(e.target.value),
                                                                    })
                                                                );
                                                                dispatch(calculateGrandTotal())
                                                            }
                                                            }
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        ৳ {Number(product.quantity * product.salePrice)}
                                                    </td>
                                                    {product?.commission !== undefined && (
                                                        <td className="px-4 py-2">
                                                            <input
                                                                type="number"
                                                                className="w-12 border rounded px-2 py-1"
                                                                value={product.commission}
                                                                onChange={(e) =>
                                                                    dispatch(
                                                                        updateCommissionRate({
                                                                            productId: product.product,
                                                                            commission: e.target.value === ""
                                                                                ? 0
                                                                                : Number(e.target.value),
                                                                        })
                                                                    )
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
                            <div className="flex items-center justify-end w-full">
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="  text-4xl flex  px-4 rounded"
                                >
                                    <p className="   bg-red-600 text-white   rounded-full w-auto p-3"> <IoPersonAddSharp /></p>
                                </button>
                            </div>
                            <section>
                                <CustomerSearchableSelectFields />
                            </section>
                        </div>
                        <div>
                            <label htmlFor="">ব্রোকার</label>
                            <input
                                type="string"
                                onChange={(e) => {
                                    dispatch(setBroker(e.target.value))
                                }}
                                className="input" required />
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
                                    <option value="cash">Cash</option>
                                    <option value="bank">Bank</option>
                                    <option value="bkash">bKash</option>
                                    <option value="nagad">Nagad</option>
                                    <option value="rocket">Rocket</option>
                                    <option value="card">Card</option>
                                </select>
                            </div>

                            {
                                cart?.paymentMethod === 'bank' &&
                                <div className="border border-red-700 rounded-2xl p-2 grid gap-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                                    <select
                                        {...register("bankName", {
                                            onChange: (e) => dispatch(setBankName(e.target.value)),
                                        })}
                                        className="input"
                                    >
                                        {
                                            banksName?.map((bank: any, idx: number) => <option key={idx} value={bank.value}>{bank.label}</option>)
                                        }
                                    </select>

                                    <input
                                        {...register("amount", {
                                            required: "পরিমান নাই",
                                            onChange: (e) => dispatch(setBankAmount(e.target.value)),
                                        })}
                                        className="input"
                                        placeholder="টাকার পরিমান"
                                    />
                                    <label >ইস্যুর তারিখ</label>
                                    <input
                                        {...register("issueDate", {
                                            required: "ইস্যুর তারিখ নাই",
                                            onChange: (e) => dispatch(setIssueDate(e.target.value)),
                                        })}
                                        className="input"
                                        type='datetime-local'
                                        placeholder="ইস্যুর তারিখ"
                                    />

                                    <label >পোস্টিং তারিখ</label>
                                    <input
                                        {...register("postingDate", {
                                            required: 'পোস্টিং তারিখ নাই',
                                            onChange: (e) => dispatch(setPostingDate(e.target.value)),
                                        })}

                                        placeholder="পোস্টিং এর তারিখ"
                                        type='datetime-local'
                                        className="input"
                                    />

                                    <input
                                        {...register("note", {
                                            onChange: (e) => dispatch(setBankNote(e.target.value)),
                                        })}

                                        placeholder="নোট"
                                        type='text'
                                        className="input"
                                    />

                                </div>

                            }

                        </div>
                        {/* others input */}
                        <div>
                            <label htmlFor="">লেবার</label>
                            <input onChange={(e) => {
                                dispatch(setLabour(e.target.value))
                                dispatch(calculateGrandTotal());
                            }} type="number" className="input" required />
                        </div>
                        <div>
                            <label htmlFor="">কাস্টমার কমিশন</label>
                            <input
                                type="number"
                                className="input"
                                required
                                onChange={(e) => {
                                    dispatch(setCustomerCommission(Number(e.target.value)));
                                    dispatch(calculateGrandTotal());
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

                    {/* RIGHT SECTION */}
                    <div className="bg-white rounded-xl shadow p-6 h-fit">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

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
