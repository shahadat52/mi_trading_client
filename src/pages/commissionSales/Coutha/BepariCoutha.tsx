import { QRCodeSVG } from "qrcode.react";
import { DateTime } from "../../../utils/formatDateTime";
import { FaWhatsapp, FaLocationArrow, FaFacebookSquare } from "react-icons/fa";
import Modal from "../../../components/Modal";
import PriceUpdateEntry from "./PriceUpdateEntry";
import { useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useGetCommissionSalesSupplierLotWiseQuery } from "../../../redux/features/commissionSales/commissionSalesApi";
import { useNavigate, useParams } from "react-router";
import { useGetCouthaByIdQuery } from "../../../redux/features/coutha/couthaApi";



const BepariCoutha = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const { id } = useParams()
    const { data: couthaData } = useGetCouthaByIdQuery(id)
    const coutha = couthaData?.data
    const { data } = useGetCommissionSalesSupplierLotWiseQuery({ couthaOf: coutha?.couthaOf });

    const sales = data?.data || [];
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Bepari-Coutha-${coutha?.invoice || "memo"}`,
    });


    const LIMIT = 25;
    const regSales = sales?.slice(0, LIMIT);
    const restSales = sales?.slice(LIMIT);

    const summary = restSales?.reduce(
        (acc: any, item: any) => {
            acc.totalQuantity += item.product.quantity;
            acc.totalBosta += item.product.bosta;
            acc.totalAmount += item.product.salePrice * item.product.quantity;
            return acc;
        },
        { totalQuantity: 0, totalAmount: 0, totalBosta: 0 }
    );

    const result = [
        {
            totalQuantity: summary?.totalQuantity || 0,
            totalBosta: summary?.totalBosta || 0,
            totalAmount: summary?.totalAmount || 0,
            averagePrice:
                summary && summary.totalQuantity > 0
                    ? (summary.totalAmount / summary.totalQuantity).toFixed(2)
                    : 0,
        },
    ];

    const totalBosta = sales?.reduce((total: number, item: any) => total + Number(item.product.bosta || 0), 0);
    const totalQuantity = sales?.reduce((total: number, item: any) => total + Number(item.product.quantity || 0), 0);
    const totalSales = sales?.reduce((sum: number, item: any) =>
        sum + (item.product.quantity * item.product.salePrice), 0
    );




    return (
        <div
            ref={printRef}
            className="overflow-y-scroll print:max-w-[400px] mx-auto h-[1588px] print-area fixed inset-0 z-50 flex items-start justify-center   p-4 sm:p-8 print:p-0"

        >
            <div

                onClick={(e) => e.stopPropagation()}
                className=" bg-white w-full max-w-2xl shadow-2xl print:shadow-none print:max-w-full rounded-lg overflow-hidden "
            >
                {/* --- PRINT HEADER / BRANDING --- */}
                <div className="relative border-b-2 border-red-600 bg-white p-2">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <img src="/mi_logo.png" alt="Logo" className="h-12 w-12 object-contain" />

                        </div>
                        <div className="text-center">
                            <p className="text-[10px] italic text-green-800">বিসমিল্লাহির রাহমানির রাহিম</p>
                            <h1 className="text-lg font-medium text-red-700 leading-tight">মেসার্স এম.আই ট্রেডিং</h1>
                            <p className="text-[8px] font-bold text-gray-800">পরিচালকঃ আরিফ মোহাম্মাদ ফোরকান</p>
                            <p className="text-[6px] font-semibold text-gray-800">জেনারেল মার্চেন্ট এন্ড কমিশন এজেন্ট</p>
                        </div>

                        <div className="text-right flex flex-col items-end">
                            <div className=" text-red-700 px-1 py-1 text-[7px] font-bold rounded mb-1">বেপারী চৌথা</div>
                            <QRCodeSVG value="https://wa.me/8801842753607" size={36} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 mt-2 text-[11px] text-gray-700 border-t border-dashed border-gray-300 pt-2">
                        <div>
                            <p className="text-[7px] flex items-center gap-1"><FaLocationArrow className="text-red-600" /> ২০২ নং খাতুনগঞ্জ, কোতোয়ালী, চট্টগ্রাম।</p>
                            <p className="text-[7px] flex items-center gap-1 font-bold"><FaWhatsapp className="text-green-600" /> 01842-753607, 01707-753607, 01841753607(দিপু)</p>
                        </div>
                        <div className="text-[7px] text-right">
                            <p>Email: mitrading.202ktg@gmail.com</p>
                            <p className="flex items-center justify-end gap-1"><FaFacebookSquare className="text-blue-600" /> M/S.M.I Trading</p>
                        </div>
                    </div>
                </div>

                {/* --- INVOICE INFO --- */}
                <div className="px-5 py-3  bg-gray-50  text-xs font-medium">
                    <div className="flex justify-between items-center">
                        <p className="text-[6px]">ইনভয়েস নং: <span className="font-normal">{coutha?.invoice}</span></p>
                        <p className="text-[6px]">তারিখ: <span className="font-normal">{DateTime(coutha?.createdAt)}</span></p>
                    </div>
                    <div className=" grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-red-50/50  rounded border border-red-100">
                            <span className="text-gray-500 block text-[8px] uppercase ">নাম: {coutha?.supplier?.name}</span>
                        </div>
                        <div className="bg-red-50/50  rounded border border-red-100">
                            <span className="text-right text-gray-500 block text-[8px] uppercase ">ঠিকানা: {coutha?.supplier?.address}</span>
                        </div>
                    </div>
                </div>

                {/* --- SUPPLIER DETAILS --- */}


                {/* --- MAIN LEDGER TABLE --- */}
                <div className="grid grid-cols-12 ">
                    {/* Sales Side (Credit) */}
                    <div className="col-span-7 border-r border-gray-300">
                        <div className="bg-green-700  text-gray-50 text-center py-1 text-xs font-bold uppercase tracking-wider">জমা (Sales)</div>
                        <div className="p-2">
                            <table className="w-full text-[8px] text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200 text-gray-500">
                                        <th className="py-1">পরিমাণ</th>
                                        <th className="py-1 text-right">দর</th>
                                        <th className="py-1 text-right">মোট</th>
                                        <th className="py-1 print:hidden"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {

                                        regSales.map((sale: any, idx: number) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="py-1">{sale?.product?.bosta}| {sale?.product?.quantity} কেজি</td>
                                                <td className="py-1 text-right">{sale?.product?.salePrice}</td>
                                                <td className="py-1 text-right font-bold">{(sale?.product?.quantity * sale?.product?.salePrice).toLocaleString()}</td>
                                                <td className="py-1 text-right print:hidden">
                                                    <button
                                                        onClick={() => { setSelected(sale?._id); setIsOpen(true); }}
                                                        className="text-[10px] bg-gray-200 px-1 rounded hover:bg-blue-600 hover:text-white transition-colors"
                                                    >
                                                        EDIT
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                    {
                                        restSales?.length >= 1 && result?.map((sale: any, idx: number) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="py-1">{sale?.totalBosta}| {sale?.totalQuantity} কেজি</td>
                                                <td className="py-1 text-right">{sale?.averagePrice}</td>
                                                <td className="py-1 text-right font-bold">{(sale?.totalAmount)}</td>
                                                <td className="py-1 text-right print:hidden">

                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-auto border-t border-gray-300 p-2 bg-green-50 flex justify-between  text-sm">
                            <span className="text-xs" >{totalBosta} | {totalQuantity} কেজি </span>
                            <span className="font-bold border-b border-dashed">{totalSales?.toLocaleString()} ৳</span>
                        </div>
                    </div>

                    {/* Expenses Side (Debit) */}
                    <div className="col-span-5 bg-slate-50/50">
                        <div className="text-gray-50  bg-red-700 text-center py-1 text-xs font-bold uppercase tracking-wider">খরচ (Expenses)</div>
                        <div className="p-3 space-y-1.5 text-xs text-gray-700">
                            {[
                                { label: "আমদানী", value: coutha?.import },
                                { label: "ব্রোকারী", value: coutha?.brokary },
                                { label: "কুলি", value: coutha?.kuli },
                                { label: "গাড়ি ভাড়া", value: coutha?.transport_rent },
                                { label: "নগদ/হাওলাত", value: coutha?.haolat },
                                { label: "আড়ৎদারী", value: coutha?.arot },
                                { label: "গদি", value: coutha?.godi },
                                { label: "তহরী", value: coutha?.tohori },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between border-b border-gray-200 pb-1">
                                    <span>{item.label}:</span>
                                    <span className="font-semibold">{item.value || 0}</span>
                                </div>
                            ))}

                            <div className=" space-y-1">
                                <div className="flex justify-between text-gray-900  border-b-2 border-gray-300">
                                    <span className="text-[10px]">মোট খরচ: </span>
                                    <span> {coutha?.subTotal}</span>
                                </div>
                                <div className="flex justify-between text-xs font-black text-red-700 pt-1 border-b border-gray-400">
                                    <span className="text-[10px]">অবশিষ্ট জমা: </span>
                                    <span> {coutha?.joma} </span>
                                </div>
                                <div className=" flex justify-between text-black text-[10px]">
                                    <span className="">সর্বমোট: </span>
                                    <span className="font-bold text-xs border-b border-dashed"> {coutha?.grandTotal} ৳</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- FOOTER SIGNATURE --- */}
                <div className="p-8 flex justify-between items-end">
                    <div className="text-[10px] text-gray-400">Software Generated Invoice</div>
                    <div>
                        <p className="text-[8px] text-center">{coutha?.createdBy?.name}</p>
                        <p className="text-center border-t border-black w-32 pt-1 text-xs font-bold">চৌথাকারীর স্বাক্ষর</p>

                    </div>
                </div>

                {/* --- ACTION BUTTONS (Hidden on print) --- */}
                <div className="bg-gray-100 p-4 flex justify-end gap-3 print:hidden">
                    <button onClick={() => navigate(-1)} className="px-5 py-1 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 shadow-sm">
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handlePrint}
                        className="px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-md transition-all"
                    >
                        Print Memo
                    </button>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <PriceUpdateEntry item={selected} onClose={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
};

export default BepariCoutha;



