/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { usePurchaseEntryMutation } from "../../redux/features/purchase/purchaseApi";
import { toast } from "react-toastify";
import { useGetAllProductNamesQuery } from "../../redux/features/product/productApi";
import { useGetAllSuppliersNameQuery } from "../../redux/features/supplier/supplierApi";
import './purchase.css'
import { units } from "../../utils/units";
import SearchableSelectField from "../../components/searchableFields/SearchableSelectField";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useDebounce } from "../../utils/useDebounce";
import type { RootState } from "../../redux/store";
import { calculatePurchaseTotals, resetPurchase, setBosta, setBroker, setBrokerBill, setCommission, setIsCommissionPaid, setIsLabourPaid, setIsOthersPaid, setLabour, setNote, setOthers, setOthersField, setPaidAmount, setProduct, setPurchaseDate, setPurchasePrice, setQuantity, setSupplier, setUnit, type TPurchase } from "../../redux/features/purchase/purchaseSlice";
import Loading from "../../components/Loading";
import CalculatorField from "../cart/CalculatorField";
import { compressImage } from "../../utils/compressImage";
import ImagePicker from "../../components/ImagePicker";
import { useGetAllBrokersQuery } from "../../redux/features/broker/brokerApi";

const PurchaseEntryForm = () => {
    const dispatch = useAppDispatch()
    const purchaseData: TPurchase = useAppSelector(state => state.purchase);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [supplierSearch, setSupplierSearch] = useState("");

    const [brokerSearch, setBrokerSearch] = useState("");
    const debouncedBrokerSearch = useDebounce(brokerSearch, 400);
    const { data: brokersData, isFetching: brokerFetch } = useGetAllBrokersQuery({ searchTerm: debouncedBrokerSearch, });
    const brokers: any[] = brokersData?.data ?? [];
    const debouncedSupplierSearch = useDebounce(supplierSearch, 400);
    const { data: supplierData, isFetching: supplierFetching } = useGetAllSuppliersNameQuery({ searchTerm: debouncedSupplierSearch, type: 'regular', limit: 20 });
    const selectedsupplier: any = useAppSelector((state: RootState) => state.purchase.supplier);
    const selectedBroker: any = useAppSelector((state: RootState) => state.purchase.broker);
    const suppliers = supplierData?.data ?? [];

    // Product Selection
    const [productSearch, setproductSearch] = useState("");
    const debouncedProductSearch = useDebounce(productSearch, 400);
    const { data: productData, isFetching: productFetching } = useGetAllProductNamesQuery({ searchTerm: debouncedProductSearch });
    const selectedProduct: any = useAppSelector((state: RootState) => state.purchase.supplier);
    const products = productData?.data ?? [];
    const [loading, setLoading] = useState(false);


    const handleComprssImage = async (file: any) => {
        if (!file) return;
        const compressedFile = await compressImage(file);
        setImageFile(compressedFile);
    }

    const [addPurchase] = usePurchaseEntryMutation();
    const handlePurchase = async () => {
        const toastId = toast.loading("Processing...");
        (purchaseData)
        const { grandTotal, dueAmount, subTotal, ...payload } = purchaseData;
        if (payload.supplier === '' || payload.product === '' || payload.purchasePrice === 0 || payload.quantity === 0 || payload.bosta === 0) {
            toast.update(toastId, { render: 'সব গুলো দেওয়া হয় নাই ', type: "warning", isLoading: false, autoClose: 1500, closeOnClick: true });
            return
        }

        setLoading(true)

        try {
            setLoading(true);
            const formData = new FormData();

            Object.entries(payload).forEach(([key, value]) => {
                formData.append(key, String(value));
            });

            if (imageFile) {
                formData.append("image", imageFile);
            }
            const result = await addPurchase(formData);
            if (result?.data?.success) {
                setLoading(false)
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                dispatch(resetPurchase())
            } else {
                setLoading(false)
                toast.update(toastId, { render: `${(result as any)?.error?.data?.errorSource[0].message}`, type: "error", isLoading: false, autoClose: 2000 });
            }
        } catch (err: any) {
            setLoading(false)
            toast.update(toastId, { render: err?.error?.data?.errorSource[0].message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-2xl shadow mb-16"
        >
            <SearchableSelectField
                label="সাপ্লাইয়ার"
                placeholder="সাপ্লাইয়ার খুঁজুন..."
                options={suppliers}
                value={selectedsupplier}
                loading={supplierFetching}
                onSearch={(value) => setSupplierSearch(value)}
                onSelect={(supplier) => dispatch(
                    setSupplier(supplier._id)
                )}
                displayKeys={{
                    title: "name",
                    subtitle: "address",
                    optional: "phone",
                }}
            />

            <SearchableSelectField
                label="পণ্য"
                placeholder="পণ্য খুঁজুন..."
                options={products}
                value={selectedProduct}
                loading={productFetching}
                onSearch={(value) => setproductSearch(value)}
                onSelect={(product) => dispatch(
                    setProduct({ name: product.name, sku: product.sku })
                )}
                displayKeys={{
                    title: "name",
                    subtitle: "sku",
                }}
            />

            <input
                type="date"
                className="input"
                value={purchaseData.purchaseDate ? purchaseData.purchaseDate.split("T")[0] : ""}
                onChange={(e) =>
                    dispatch(setPurchaseDate(new Date(e.target.value).toISOString()))
                }
            />

            <input type="number" className="input " value={purchaseData.bosta || ""} onChange={(e) => { dispatch(setBosta(Number(e.target.value))) }} placeholder="কত বস্তা" required />

            <div className="w-full">
                <label className="text-xs font-normal">পরিমান</label>
                <CalculatorField
                    initialValue={purchaseData.quantity}
                    onUpdate={(val) => {
                        dispatch(setQuantity(val));
                        dispatch(calculatePurchaseTotals())
                    }}
                />
            </div>


            <div>
                <label >দাম</label>
                <input type="number" className="input" value={purchaseData.purchasePrice || ""} onChange={(e) => { dispatch(setPurchasePrice(Number(e.target.value))); dispatch(calculatePurchaseTotals()) }} placeholder="ক্রয় মূল্য" required />
            </div>

            <SearchableSelectField
                label="ব্রোকার"
                placeholder="ব্রোকার খুঁজুন..."
                options={brokers}
                value={selectedBroker}
                loading={brokerFetch}
                onSearch={(value) => setBrokerSearch(value)}
                onSelect={(supplier) => dispatch(
                    setBroker(supplier._id)
                )}
                displayKeys={{
                    title: "name"
                }}
            />

            <div>
                <label >ব্রোকার বিল</label>
                <input type="number" className="input" value={purchaseData.brokerBill || ""} onChange={(e) => { dispatch(setBrokerBill(Number(e.target.value))) }} placeholder="ব্রোকার বিল" required />
            </div>


            <div className="">
                <label className="text-xs font-normal">ক্রয় ইউনিট</label>
                <select
                    value={purchaseData.unit ?? ""}
                    onChange={(e) => dispatch(setUnit(e.target.value))}
                    className="select select-bordered w-full"
                    required
                >

                    {units.map((unit) => (
                        <option key={unit.value} value={unit.value}>
                            {unit.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex gap-2 items-end w-full ">
                <div className="w-full">
                    <label className="text-xs font-normal">লেবার</label>
                    <CalculatorField
                        initialValue={purchaseData.labour}
                        onUpdate={(val) => {
                            dispatch(setLabour(val));
                            dispatch(calculatePurchaseTotals())
                        }}
                    />
                </div>
                <input type="checkbox" className="checkbox checkbox-primary mb-2" checked={purchaseData.isLabourPaid} onChange={() => { dispatch(setIsLabourPaid(!purchaseData.isLabourPaid)); }} />
            </div>

            <div className="flex gap-2 items-end w-full ">
                <div className="w-full">
                    <label className="text-xs font-normal">কমিশন</label>
                    <CalculatorField
                        initialValue={purchaseData.commission}
                        onUpdate={(val) => {
                            dispatch(setCommission(val));
                            dispatch(calculatePurchaseTotals())
                        }}
                    />
                </div>
                <input type="checkbox" className="checkbox checkbox-primary mb-2" checked={purchaseData.isCommissionPaid} onChange={() => { dispatch(setIsCommissionPaid(!purchaseData.isCommissionPaid)); }} />
            </div>

            <div className="flex gap-2 items-end w-full ">
                <div className="flex items-center gap-2">
                    <input value={purchaseData.othersField || ""} onChange={(e) => { dispatch(setOthersField(e.target.value)) }} placeholder="অন্যান্য খাত" type="text" className="input" required />


                    <div>
                        <CalculatorField
                            initialValue={purchaseData.others}
                            onUpdate={(val) => {
                                dispatch(setOthers(val));
                                dispatch(calculatePurchaseTotals())
                            }
                            }
                        />
                    </div>


                    <input checked={purchaseData.isOthersPaid} onChange={() => { dispatch(setIsOthersPaid(!purchaseData.isOthersPaid)) }} type="checkbox" className="checkbox checkbox-primary " />

                </div>
            </div>

            <input type="number" className="input " value={purchaseData.paidAmount || ""} onChange={(e) => { dispatch(setPaidAmount(Number(e.target.value))); dispatch(calculatePurchaseTotals()) }} placeholder="পরিশোধের পরিমান" />

            <input value={purchaseData.note || ""} onChange={(e) => { dispatch(setNote(e.target.value)) }} placeholder="নোট লিখুন" type="text" className="input" required />
            <div>
                {/* <div className='flex justify-between mx-4 items-center'>
                    <FileUploadField control={control} name='img' label='ছবি' />
                </div> */}
                <label className="block text-sm mb-1">বিল / ছবি</label>
                <ImagePicker
                    onFileSelect={(file) => {
                        handleComprssImage(file);
                    }}
                />

                {imageFile && (
                    <p className="text-xs text-green-600 mt-1">
                        {imageFile.name}
                    </p>
                )}

                {imageFile && (
                    <img
                        src={URL.createObjectURL(imageFile)}
                        alt="preview"
                        className="w-10 h-15 object-cover rounded mt-2"
                    />
                )}
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between bg-blue-50 rounded-2xl p-5 border border-blue-100">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">মোট দাম</p>
                        <h3 className="text-2xl font-extrabold text-blue-700">
                            ৳ {purchaseData?.grandTotal}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 mb-1">বাকি</p>
                        <h3 className="text-2xl font-extrabold text-blue-700">
                            ৳ {purchaseData?.dueAmount}
                        </h3>
                    </div>

                </div>
            </div>


            <button
                className="mt-2"
                onClick={handlePurchase}
            >
                {
                    loading ? <Loading /> : <span
                        className="w-full p-4 mt-6 px-10 bg-accent text-white rounded-lg hover:bg-gray-800 transition"
                    >
                        ক্রয় করুন
                    </span>
                }
            </button>
        </div>
    );
};

export default PurchaseEntryForm;
