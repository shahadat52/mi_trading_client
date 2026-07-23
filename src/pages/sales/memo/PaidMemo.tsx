import { QRCodeSVG } from "qrcode.react";
import { FaWhatsapp } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { toCurrency } from 'to-words/bn-BD';
import { format } from "date-fns";
import mi_logo from "../../../assets/icons/mi_logo.png";

/* eslint-disable @typescript-eslint/no-explicit-any */
const PaidMemo = ({ sale, onClose }: any) => {
    const MIN_ROWS = 9;
    return (
        <div className=" max-w-2xl mx-auto rounded overflow-auto print-area  bg-white">

            <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto  min-h-screen  ">

                <div className=" border max-w-[430px] rounded  overflow-auto print-area bg-white  border-gray-300 shadow-lg ">

                    {/* Header Section */}
                    <div className="bg-[#f08c1d] p-4 text-center text-black relative">
                        <div className="absolute top-4  left-2 mt-6 h-20 w-20 flex items-center justify-center font-bold">
                            <img src="/mi_logo.png" alt="Logo" className='h-20  w-[100px]' />
                        </div>
                        <p className="text-xs italic mb-2">বিসমিল্লাহির রাহমানির রহিম</p>
                        <h1 className="text-red-800 text-2xl font-bold">মেসার্স এম.আই ট্রেডিং</h1>
                        <h2 className="text-blue-950  text-2xl font-serif italic">M/S. M.I TRADING</h2>
                        <p className="text-sm">জেনারেল মার্চেন্ট এন্ড কমিশন এজেন্ট</p>
                        <p className="text-xs">হলুদ, মরিচ, ধনিয়া, ডাল, মশলা ও যাবতীয় ভূষা মালের আড়ৎ</p>
                        <p className="text-xs  flex items-center justify-center"> <IoLocationSharp /> ২০২ নং খাতুনগঞ্জ, কোতোয়ালী, চট্টগ্রাম। </p>

                        <div className="absolute top-10 right-2 bg-blue-800 text-white text-lg px-2 py-1 rounded-full">
                            ক্যাশ <br /> মেমো
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="px-4 py-1 text-sm">
                        <div className="grid grid-cols-2 text-start my-1">
                            <div>নং: {sale.invoice}</div>
                            <div>
                                তারিখ: {format(sale.date, 'dd/MM/yyyy')} সময়ঃ {format(new Date(sale.createdAt), 'hh:mm a')}
                            </div>
                        </div>
                        <div className='grid grid-cols-2 text-start my-1' >
                            <p>নাম: {sale?.customer?.name}</p>
                            <p>{sale?.broker === '' ? '' : ` ব্রোকার:${sale?.broker}`}</p>
                        </div>
                        <div className="grid grid-cols-2 text-start">
                            <div >ঠিকানা:{sale?.customer?.address}।</div>
                            <div className="">মোবাইল: {sale?.customer?.phone} </div>
                        </div>
                    </div>

                    {/* Table Section */}

                    <table className="w-full border-collapse border-y border-gray-400">
                        <thead>
                            <tr className="bg-blue-900 text-white text-xs">
                                <th className="border-r border-gray-200 p-1 w-12">সংখ্যা</th>
                                <th className="border-r border-gray-200 p-1">বিবরণ ও পরিমাণ</th>
                                <th className="border-r border-gray-200 p-1 w-20">দর</th>
                                <th className="p-1 w-24">মোট</th>
                            </tr>
                        </thead>


                        <tbody className="relative">
                            <tr>
                                <td>
                                    <img
                                        src={mi_logo}
                                        alt="watermark"
                                        className="absolute top-1/2 left-1/2 w-40 -translate-x-1/2 -translate-y-1/2 opacity-20"
                                    />
                                </td>
                            </tr>
                            {sale.items?.map((p: any, idx: number) => (
                                <tr key={idx} className="text-[12px] border-b border-gray-100">
                                    <td className="p-[2px] text-center border-r border-gray-300">
                                        {idx + 1}
                                    </td>
                                    <td className="p-[2px] border-r border-gray-300">
                                        {p.name}  {p?.bosta} | {p.quantity}{" "}
                                        {p?.unit === "কেজি" ? "kg" : p.unit}
                                    </td>
                                    <td className="p-[2px] text-center border-r border-gray-300">
                                        {p?.salePrice}
                                    </td>
                                    <td className="p-[2px] text-center">{p?.salePrice * p?.quantity}</td>
                                </tr>
                            ))}

                            {Array.from({
                                length: Math.max(0, MIN_ROWS - (sale.items?.length || 0)),
                            }).map((_, idx) => (
                                <tr key={`empty-${idx}`} className="h-6">
                                    <td className="border-r border-gray-300">&nbsp;</td>
                                    <td className="border-r border-gray-300"></td>
                                    <td className="border-r border-gray-300"></td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="text-[12px]">
                            <tr className=" border-t border-gray-400 bg-blue-900 text-white">
                                <td colSpan={2} className="text-center px-2  font-"><span></span></td>
                                <td className=" text-xs">  <span>সাব টোটালঃ </span></td>
                                <td className=" ">  <span>{sale?.subtotal} </span></td>
                            </tr>
                            <tr className=" border-t border-gray-400 bg-blue-900 text-white">
                                <td colSpan={2} className="text-center px-2  font-"><span></span></td>
                                <td className=" text-xs">  <span>লেবারঃ </span></td>
                                <td className=" ">  <span>{sale?.labour} </span></td>
                            </tr>

                            <tr className=" border-t border-gray-400 bg-blue-900 text-white">
                                <td colSpan={2} className="text-center px-2  font-"><span></span></td>
                                <td className=" text-xs">  <span>কমিশনঃ </span></td>
                                <td className=" ">  <span>{(sale?.customerCommission) + (sale?.grandTotal) - (sale?.subtotal + sale?.others + sale?.labour + sale?.customerCommission)} </span></td>
                            </tr>
                            <tr className=" border-t border-gray-400 bg-blue-900 text-white">
                                <td colSpan={2} className="text-center px-2  font-"><span></span></td>
                                <td className=" text-xs">  <span>অন্যান্য </span></td>
                                <td className=" ">  <span>{sale?.others} </span></td>
                            </tr>
                            <tr className=" border-t border-gray-400 bg-blue-900 text-white">
                                <td colSpan={2} className="text-center px-2  font-"><span></span></td>
                                <td className=" text-xs">  <span>বাকিঃ </span></td>
                                <td className=" ">  <span>{sale?.grandTotal - sale?.paidAmount} </span></td>
                            </tr>

                            <tr className=" border-t border-gray-400 bg-blue-900 text-white">
                                <td colSpan={2} className="text-center px-2 py-1 font-"><span>কথায়ঃ {toCurrency(sale?.grandTotal)}</span></td>
                                <td className="p-1 ">  <span>মোটঃ</span></td>
                                <td className="p-1 ">  <span> {(sale?.grandTotal)} </span></td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* Footer Section */}
                    <div >

                        <div className="text-[11px] flex justify-between items-center m-1">
                            <div>
                                <p className="text-[10px] mt-6 border-t-2">ক্রেতার স্বাক্ষর</p>
                            </div>
                            <div className=" p-1 text-white border-1 border-red-700  ">
                                <p className="text-cyan-600">■ বিক্রিত মাল ফেরত নেওয়া হয় না।</p>
                                <p className="text-red-600">■ ডেলিভারী মাল না পাইলে ফোন করুন।</p>
                            </div>

                            <div>
                                <p className="text-[12px]">{sale?.createdBy?.name}</p>
                                <p className="text-[12px]  border-t-2">চৌথাকারীর স্বাক্ষর</p>
                            </div>
                        </div>
                        {/* Bottom Contact Info */}
                        <div className="bg-blue-950 text-white p-2 flex flex-col   rounded-b-lg">


                            <div className="text-[12px] flex justify-between items-center">
                                <div>
                                    <span className='flex flex-col '>
                                        <div className='flex flex-row '>
                                            <span className='my-auto text-green-600'>{" "} <FaWhatsapp /> </span>  {" "}  01842753607,<img src="/bkash_nogod_logo.png" alt="My Logo" className='w-8 h-4 pl-1 my-auto' /> 01707753607, 01841753607
                                        </div>
                                        <p className="flex flex-row gap-2">
                                            <img src="/communication.png" alt="My Logo" className='w-6 h-[22px] pl-1 my-auto' /> mitrading.202ktg@gmail.com
                                        </p>


                                    </span>
                                </div>
                                <div className="flex flex-col items-center bg-white  p-1 shadow-sm">
                                    <QRCodeSVG
                                        value="https://www.facebook.com/profile.php?id=100057298125999"
                                        size={48}
                                        bgColor="#ffffff"
                                        fgColor="#000000"
                                        level="H"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-8 pb-6 print:hidden">
                        <div className="flex gap-2">
                            <button
                                className="px-4 py-2  rounded bg-blue-500 "
                                onClick={() => window.print()}
                            >
                                Print
                            </button>
                            <button
                                className="px-4 py-2 bg-red-50 text-red-700 rounded"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>

                </div>

            </div>

            <div className="flex gap-2 mt-8 pb-6 print:hidden">
                <button
                    className="px-4 py-2 rounded bg-blue-500"
                    onClick={() => window.print()}
                >
                    Print
                </button>
                <button
                    className="px-4 py-2 bg-red-50 text-red-700 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>

        </div>
    );
};

export default PaidMemo;                        