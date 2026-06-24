import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { useDeletePurchaseMutation, useGetRegualarPurchaseByIdQuery, useUpdatePurchaseMutation } from "../../redux/features/purchase/purchaseApi";
import DetailField, { type TPurchaseFormData } from "./DetailField";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { useAppDispatch } from "../../redux/hook";
import report_icon from "../../assets/icons/report_icon.png"
import edit_icon from "../../assets/icons/edit_icon.png"
import { setTotalCost } from "../../redux/features/product/productSlice";
import ImagePreviewButton from "../../components/ImagePreviewButton";

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [deleteProduct] = useDeletePurchaseMutation(undefined)
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useGetRegualarPurchaseByIdQuery(id, {
        skip: !id,
    });

    const [updatePurchase, { isLoading: isUpdating }] = useUpdatePurchaseMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<TPurchaseFormData | null>(null);

    const purchase = data?.data;

    const formatDateForInput = (date?: string) => {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0];
    };

    const formatDateForDisplay = (date?: string) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString();
    };

    const normalizePurchaseData = (purchaseData: any): TPurchaseFormData => ({
        product: purchaseData?.product ?? "",
        sku: purchaseData?.sku ?? "",
        invoice: purchaseData?.invoice ?? "",
        lot: purchaseData?.lot ?? "",
        purchaseDate: formatDateForInput(purchaseData?.purchaseDate),
        purchasePrice: purchaseData?.purchasePrice ?? "",
        quantity: purchaseData?.quantity ?? "",
        purchaseQty: purchaseData?.purchaseQty ?? "",
        bosta: purchaseData?.bosta ?? "",
        labour: purchaseData?.labour ?? "",
        commission: purchaseData?.commission ?? "",
        others: purchaseData?.others ?? "",
        othersField: purchaseData?.othersField ?? "",
        note: purchaseData?.note ?? "",
        unit: purchaseData?.unit ?? "",
        purchaseType: purchaseData?.purchaseType ?? "",
        isVerified: purchaseData?.isVerified ?? false,
        supplier: purchaseData?.supplier ?? {},
    });

    useEffect(() => {
        if (purchase) {
            setFormData(normalizePurchaseData(purchase));
        }
    }, [purchase]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) =>
            prev
                ? {
                    ...prev,
                    [name]: value,
                }
                : prev
        );
    };

    const handleCancel = () => {
        if (!purchase) return;
        setFormData(normalizePurchaseData(purchase));
        setIsEditing(false);
    };

    const handleSave = async () => {
        if (!id || !formData) return;

        const payload = {
            product: formData.product,
            sku: formData.sku,
            invoice: formData.invoice,
            lot: formData.lot,
            purchaseDate: formData.purchaseDate,
            purchasePrice: Number(formData.purchasePrice || 0),
            quantity: Number(formData.quantity || 0),
            bosta: Number(formData.bosta || 0),
            labour: Number(formData.labour || 0),
            commission: Number(formData.commission || 0),
            others: Number(formData.others || 0),
            othersField: formData.othersField,
            note: formData.note,
            unit: formData.unit,
        };

        try {
            await updatePurchase({ id, data: payload }).unwrap();
            await refetch();
            setIsEditing(false);
        } catch (error) {
        }
    };

    const totalCost = useMemo(() => {
        if (!formData) return 0;

        return (
            Number(formData.purchasePrice || 0) * Number(formData.purchaseQty || 0) +
            Number(formData.labour || 0) +
            Number(formData.commission || 0) +
            Number(formData.others || 0)
        );
    }, [formData]);
    useEffect(() => {
        dispatch(setTotalCost(totalCost));
    }, [totalCost, dispatch]);

    const costPerUnit = useMemo(() => {
        if (!formData) return "0.00";

        const quantity = Number(formData.quantity || 0);
        if (quantity <= 0) return "0.00";

        return (totalCost / quantity).toFixed(2);
    }, [formData, totalCost]);

    const handleDeleteProduct = async (id: string) => {
        try {
            const confirmed = window.confirm(`পণ্য ডিলিট করেলে সাপ্লাইয়ার "${purchase.supplier.name}" এর  লেনদেন থেকে এই পন্যের দাম ডিলিট করুন?`);

            if (!confirmed) return;

            await deleteProduct(id).unwrap();

            toast.success("Product deleted successfully");

            navigate("/products");
        } catch (error) {
            toast.error("Failed to delete product");
        } finally {
        }
    };
    if (isLoading) {
        return (
            <div className="p-10 text-center animate-pulse text-gray-500">
                Loading purchase details...
            </div>
        );
    }

    if (isError || !purchase || !formData) {
        return (
            <div className="p-10 text-center text-red-500 font-medium">
                Product details not found.
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-2 md:p-4 mt-5 mb-16">
            <div className="bg-white shadow-xl rounded-3xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="p-4 md:p-8 border-b bg-gradient-to-r from-blue-50 to-white">
                    <div className="grid grid-cols-3 ">
                        <div className="col-span-2">
                            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">
                                {formData.product || "N/A"}
                            </h1>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                    Invoice: {formData.invoice || "N/A"}
                                </span>
                                <button
                                    onClick={() => handleDeleteProduct((id as string))}

                                >
                                    <span className="text-xl text-red-600">
                                        <MdDelete />
                                    </span>
                                </button>
                            </div>

                            <div>
                                <NavLink to={`/purchase/report/${purchase?._id}`}>
                                    <button
                                    >
                                        <span className=" mt-1  text-xs font-normal rounded-xl uppercase  hover:bg-black transition shadow">
                                            <img src={report_icon} alt="report" className="size-10 rounded" />
                                        </span>
                                    </button>
                                </NavLink>

                                <div>
                                    <ImagePreviewButton
                                        imageUrl={purchase?.imageurl}
                                        buttonText="Image"
                                    />
                                    <NavLink to={`/purchase/slip/${purchase?._id}`}>
                                        <button
                                            className="ml-3"
                                        >
                                            <span className="p-2 text-xs font-normal rounded bg-green-700 uppercase text-white hover:bg-black transition shadow">
                                                Slip
                                            </span>
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1">
                            {isEditing ? (
                                <div className=" flex flex-col gap-5">
                                    <button
                                        onClick={handleCancel}
                                    >
                                        <span
                                            className="py-2 px-7 text-sm rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                                        >
                                            Cancel
                                        </span>
                                    </button>

                                    <button
                                        onClick={handleSave}
                                        disabled={isUpdating}
                                    >
                                        <span
                                            className="py-2 px-8 rounded-xl text-sm bg-blue-600 text-white hover:bg-blue-700 transition shadow disabled:opacity-60"
                                        >
                                            {isUpdating ? "Saving..." : "Save"}
                                        </span>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                >
                                    <span
                                        className="flex justify-end p-2  text-xs rounded-xl  text-white hover:bg-black transition shadow"
                                    >
                                        <img src={edit_icon} alt="edit" className="size-9 mb-1 ml-3" />

                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Left Section */}
                    <div className="xl:col-span-2 space-y-6">
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-800 mb-5">
                                Purchase Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <DetailField
                                    label="Name"
                                    name="product"
                                    value={formData.product}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                    readOnly
                                />
                                <DetailField
                                    label="SKU"
                                    name="sku"
                                    value={formData.sku}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                    readOnly
                                />
                                <DetailField
                                    label="Lot"
                                    name="lot"
                                    value={formData.lot}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                    readOnly
                                />
                                <DetailField
                                    label="Invoice"
                                    name="invoice"
                                    value={formData.invoice}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                    readOnly
                                />
                                <DetailField
                                    label="Purchase Date"
                                    name="purchaseDate"
                                    value={formData.purchaseDate}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                    type="date"
                                    displayValue={formatDateForDisplay(formData.purchaseDate)}
                                />
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-800 mb-5">
                                Pricing, Quantity & Cost Breakdown
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <DetailField
                                    label="Purchase Price"
                                    name="purchasePrice"
                                    value={formData.purchasePrice}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                    type="number"
                                    displayValue={`৳ ${formData.purchasePrice || 0}`}
                                />
                                <DetailField
                                    label="Quantity"
                                    name="quantity"
                                    value={formData.quantity}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                    type="number"
                                />
                                <DetailField
                                    label="Bosta"
                                    name="bosta"
                                    value={formData.bosta}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                    type="number"
                                />
                                <DetailField
                                    label="Unit"
                                    name="unit"
                                    value={formData.unit}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />
                                <DetailField
                                    label="Labour"
                                    name="labour"
                                    value={formData.labour}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                    type="number"
                                    displayValue={`৳ ${formData.labour || 0}`}
                                />
                                <DetailField
                                    label="Others Field"
                                    name="othersField"
                                    value={formData.othersField}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />
                                <DetailField
                                    label="Others"
                                    name="others"
                                    value={formData.others}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                    type="number"
                                    displayValue={`৳ ${formData.others || 0}`}
                                />
                                <DetailField
                                    label="Commission"
                                    name="commission"
                                    value={formData.commission}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                    type="number"
                                    displayValue={`৳ ${formData.commission || 0}`}
                                />
                            </div>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex justify-between bg-blue-50 rounded-2xl p-5 border border-blue-100">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Total Cost</p>
                                        <h3 className="text-2xl font-extrabold text-blue-700">
                                            ৳ {totalCost.toLocaleString()}
                                        </h3>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Paid Amount</p>
                                        <h3 className="text-2xl font-extrabold text-blue-700">
                                            ৳ {purchase?.paidAmount.toLocaleString()}
                                        </h3>
                                    </div>
                                </div>

                                <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
                                    <p className="text-sm text-gray-500 mb-1">Cost Per Unit</p>
                                    <h3 className="text-2xl font-extrabold text-green-700">
                                        ৳ {costPerUnit}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-800 mb-5">
                                Supplier Information
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        Supplier Name
                                    </p>
                                    <p className="text-lg font-bold text-gray-800">
                                        {formData?.supplier?.name || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        Phone
                                    </p>
                                    <p className="text-base text-gray-700">
                                        {formData?.supplier?.phone || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        Address
                                    </p>
                                    <p className="text-base text-gray-700 leading-relaxed">
                                        {formData?.supplier?.address || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        Supplier Type
                                    </p>
                                    <p className="text-base text-gray-700">
                                        {formData?.supplier?.type || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-800 mb-5">Notes</h2>
                            <DetailField
                                label="Note"
                                name="note"
                                value={formData.note}
                                isEditing={isEditing}
                                onChange={handleChange}
                                textarea
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* {
                open && 
            } */}
        </div >
    );
};

export default ProductDetails;