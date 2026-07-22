import { useEffect } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { useUpdateInvoiceMutation } from "../../../redux/features/cart/cartApi";
import { useAppSelector } from "../../../redux/hook";

const InvoiceEditModal = ({ onClose, sale }: any) => {
    const user = useAppSelector((state) => state.auth.auth.user);

    const [updateInvoice] = useUpdateInvoiceMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<any>();

    // ✅ Set all default values properly
    useEffect(() => {
        if (sale) {
            reset({
                invoice: sale?.invoice,
                customerCommission: sale?.customerCommission,
                labour: sale?.labour,
                paidAmount: sale?.paidAmount,
                others: sale?.others,
                subtotal: sale?.subtotal,
                grandTotal: sale?.grandTotal,
                comments: sale?.comments,
                items: sale?.items || [],
            });
        }
    }, [sale, reset]);

    // ✅ Submit handler
    const onSubmit = async (data: FieldValues) => {
        alert(`অবশ্যই ${sale?.customer?.name} এর লেনদেন আপডেট করবেন`)
        try {
            const id = sale?._id;
            await updateInvoice({ id, data }).unwrap();
            onClose();
        } catch (error) {
        }
    };

    return (
        <div className="p-2">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full bg-white rounded-2xl shadow-md p-4 space-y-5"
            >
                <h2 className="text-lg font-semibold text-gray-800">
                    Update Entry
                </h2>

                {/* ✅ Products Table */}
                <div className="bg-white rounded-2xl shadow-sm border p-3">
                    <h2 className="text-md font-semibold text-gray-700 mb-3">
                        Products
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-sm text-gray-600">
                                    <th className="px-3 py-2 text-left">Product</th>
                                    <th className="px-3 py-2 text-center">Qty</th>
                                    <th className="px-3 py-2 text-center">Price</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {sale?.items?.map((item: any, idx: number) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="px-3 py-2 text-sm font-medium text-gray-800">
                                            {item?.name}
                                        </td>

                                        <td className="px-3 py-2 text-center">
                                            <input
                                                type="number"
                                                readOnly={user?.role === 'manager'}
                                                step="any"
                                                {...register(`items.${idx}.quantity`, {
                                                    required: true,
                                                })}
                                                className="w-20 text-center border rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </td>

                                        <td className="px-3 py-2 text-center">
                                            <input
                                                type="number"
                                                step="any"
                                                readOnly={user?.role === 'manager'}
                                                {...register(`items.${idx}.salePrice`, {
                                                    required: true,
                                                })}
                                                className="w-24 text-center border rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ✅ Other Fields */}
                <div className="grid grid-cols-2 gap-3">
                    <Input label="Invoice" readOnly {...register("invoice")} />

                    <Input
                        label="Customer Commission"
                        readOnly={user?.role === 'manager'}
                        step='any'
                        type="number"
                        {...register("customerCommission", { required: true })}
                    />

                    <Input
                        label="Labour"
                        readOnly={user?.role === 'manager'}
                        step='any'
                        type="number"
                        {...register("labour", { required: true })}
                    />

                    <Input
                        label="Paid Amount"
                        readOnly={user?.role === 'manager'}
                        step='any'
                        type="number"
                        {...register("paidAmount", { required: true })}
                    />

                    <Input
                        label="Others"
                        readOnly={user?.role === 'manager'}
                        step='any'
                        type="number"
                        {...register("others", { required: true })}
                    />

                    <Input
                        label="Sub Total"
                        readOnly={user?.role === 'manager'}
                        step='any'
                        type="number"
                        {...register("subtotal", { required: true })}
                    />

                    <Input
                        label="Grand Total"
                        readOnly={user?.role === 'manager'}
                        step='any'
                        type="number"
                        {...register("grandTotal", { required: true })}
                    />
                </div>

                {/* ✅ Comments */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">নোট</label>
                    <input
                        type="text"
                        {...register("comments")}
                        className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* ✅ Buttons */}
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl border text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isSubmitting ? "Updating..." : "Update"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InvoiceEditModal;

// ✅ Reusable Input Component
const Input = ({ label, ...props }: any) => (
    <div>
        <label className="block text-sm text-gray-600 mb-1">{label}</label>
        <input
            {...props}
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
    </div>
);