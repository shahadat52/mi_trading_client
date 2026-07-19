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
import memo_mi_logo from "../../../assets/icons/memo_mi_logo.png";




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
            className=" mt-1 overflow-y-scroll mx-auto  print-area fixed inset-0 z-50 flex items-start justify-center   p-4 sm:p-8 print:p-0"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="border rounded-lg print:shadow-none w-[580px]  overflow-hidden "
            >
                {/* --- PRINT HEADER / BRANDING --- */}
                <div className="   relative border-b-2 border-red-600  p-2">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <img src="/mi_logo.png" alt="Logo" className="h-24 w-24 object-contain" />

                        </div>
                        <div className="text-center">
                            <p className="font-semibold">
                                بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                            </p>
                            <h1 className="text-2xl font-bold text-red-700 ">মেসার্স এম.আই ট্রেডিং</h1>
                            <h1 className="text-2xl font-bold text-[#1a4771] leading-tight">M/S M.I TRADING</h1>
                            <p className="text-[12px] font-bold text-gray-800">পরিচালক: আরিফ মোহাম্মাদ ফোরকান</p>
                            <p className="text-[12px] font-semibold text-gray-800">জেনারেল মার্চেন্ট এন্ড কমিশন এজেন্ট</p>
                            <p className="text-[12px] font-semibold text-gray-800">হলুদ, ধনিয়া, মরিচ, ডাল, মসলা ও যাবতীয় ভূষা মালের আড়ত।</p>
                        </div>

                        <div className="text-right flex flex-col items-end">
                            <div className=" text-red-700 px-1 py-1 text-[12px] font-bold rounded mb-1">বেপারী চৌথা</div>
                            <QRCodeSVG value="https://wa.me/8801842753607" size={50} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 mt-2 text-[12px] text-gray-700 border-t border-dashed border-gray-300 pt-2">
                        <div>
                            <p className="text-[14px] flex items-center gap-1"><FaLocationArrow className="text-red-600" /> ২০২ নং খাতুনগঞ্জ, কোতোয়ালী, চট্টগ্রাম।</p>
                            <p className="text-[14px] flex items-center gap-1 font-bold"><FaWhatsapp className="text-green-600" /> 01842-753607, 01707-753607,</p>
                            <p className="text-[14px] flex items-center gap-1 font-bold">01841753607(দিপু)</p>
                        </div>
                        <div className="text-[14px] text-right">
                            <p>Email: mitrading.202ktg@gmail.com</p>
                            <p className="flex items-center justify-end gap-1"><FaFacebookSquare className="text-blue-600" /> M/S.M.I Trading</p>

                        </div>
                    </div>
                </div>

                {/* --- INVOICE INFO --- */}
                <div className="px-2 py-3    text-xs font-medium">
                    <div className="flex justify-between items-center">
                        <p className="text-[14px]">ইনভয়েস নং: <span className="font-normal">{coutha?.invoice}</span></p>
                        <p className="text-[14px]">তারিখ: <span className="font-normal">{DateTime(coutha?.createdAt)}</span></p>
                    </div>
                    <div className=" grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-red-50/50  rounded border border-red-100">
                            <span className="text-black block text-[14px] uppercase ">নাম: {coutha?.supplier?.name}</span>
                        </div>
                        <div className="bg-red-50/50  rounded border border-red-100">
                            <span className="text-right text-black block text-[14px] uppercase ">ঠিকানা: {coutha?.supplier?.address}</span>
                        </div>
                    </div>
                </div>

                {/* --- MAIN LEDGER TABLE --- */}
                <div className=" relative grid grid-cols-12 h-[500px] ">
                    <img
                        src={memo_mi_logo}
                        alt="watermark"
                        className=" absolute top-1/2 left-1/2 w-100 -translate-x-1/2 -translate-y-1/2 opacity-25 pointer-events-none "
                    />

                    {/* Sales Side (Credit) */}
                    <div className="col-span-7 border-r bg-green-200  border-gray-300">
                        <div className="bg-green-700  text-gray-50 text-center py-1 text-xs font-bold uppercase tracking-wider">জমা (Sales)</div>
                        <div className="p-2">
                            <table className="w-full text-[12px] text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200 text-black">
                                        <th className="py-1">পরিমাণ</th>
                                        <th className="py-1 text-right">দর</th>
                                        <th className="py-1 text-right">মোট</th>
                                        <th className="py-1 print:hidden"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-[9px]">
                                    {

                                        regSales.map((sale: any, idx: number) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="py-[2px]">{sale?.product?.bosta}| {sale?.product?.quantity} কেজি</td>
                                                <td className="py-[2px] text-right">{sale?.product?.salePrice}</td>
                                                <td className="py-[2px] text-right font-bold">{(sale?.product?.quantity * sale?.product?.salePrice).toLocaleString()}</td>
                                                <td className="py-[2px] text-right print:hidden">
                                                    <button
                                                        onClick={() => { setSelected(sale); setIsOpen(true); }}
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
                                                <td className="py-[2px]">{sale?.totalBosta}| {sale?.totalQuantity} kg</td>
                                                <td className="py-[2px] text-right">{sale?.averagePrice}</td>
                                                <td className="py-[2px] text-right font-bold">{(sale?.totalAmount)}</td>
                                                <td className="py-[2px] text-right print:hidden">

                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-auto border-t border-gray-300 p-2  flex justify-between  text-sm">
                            <span className="text-sm" >{totalBosta} | {totalQuantity} কেজি </span>
                            <span className="font-bold border-b border-dashed">{totalSales?.toLocaleString()} ৳</span>
                        </div>
                    </div>

                    {/* Expenses Side (Debit) */}
                    <div className="col-span-5 bg-red-200">
                        <div className="text-gray-50  bg-red-700 text-center py-1 text-xs font-bold uppercase tracking-wider">খরচ (Expenses)</div>
                        <div className="p-3 space-y-1.5 text-[12px] text-gray-700">
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
                                    <span className="text-[12px]">মোট খরচ: </span>
                                    <span> {coutha?.subTotal}</span>
                                </div>
                                <div className="flex justify-between text-xs font-black text-red-700 pt-1 border-b border-gray-400">
                                    <span className="text-[12px]">অবশিষ্ট জমা: </span>
                                    <span> {coutha?.joma} </span>
                                </div>
                                <div className=" flex justify-between text-black text-[12px]">
                                    <span className="">সর্বমোট: </span>
                                    <span className="font-bold text-sm border-b border-dashed"> {coutha?.grandTotal} ৳</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- FOOTER SIGNATURE --- */}
                <div className="p-8 flex justify-between items-end ">
                    <div className="text-[12px] text-gray-400">Software Generated Invoice</div>
                    <div>
                        <p className="text-[12px] text-center">{coutha?.createdBy?.name}</p>
                        <p className="text-center border-t border-black w-32 pt-1 text-sm font-bold">চৌথাকারীর স্বাক্ষর</p>

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



