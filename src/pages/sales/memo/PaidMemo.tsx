import { QRCodeSVG } from "qrcode.react";
import { engNumberToBanglaWords } from "../../../utils/engNumberToBanglaWords";
import { FaWhatsapp } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

/* eslint-disable @typescript-eslint/no-explicit-any */
const PaidMemo = ({ sale, onClose }: any) => {
    return (
        <div className="border max-w-3xl rounded overflow-auto print-area w-[500px] bg-white border-gray-300 shadow-lg">

            <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/40 min-h-screen p-4 ">

                <div className=" border max-w-3xl rounded  overflow-auto print-area w-[500px] bg-white  border-gray-300 shadow-lg ">

                    {/* Header Section */}
                    <div className="bg-[#f08c1d] p-4 text-center text-black relative">
                        <div className="absolute top-4  left-2 mt-6 h-20 w-20 flex items-center justify-center font-bold">
                            <img src="/mi_logo.png" alt="Logo" className='h-20  w-[100px]' />
                        </div>
                        <p className="text-xs italic mb-2">বিসমিল্লাহির রাহমানির রাহিম</p>
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
                    <div className="p-4 text-sm">
                        <div className="flex justify-between mb-2">
                            <div>নং: {sale.invoice}</div>
                            <div>তারিখ: {new Date(sale.date).toLocaleDateString()}


                            </div>
                        </div>
                        <div className='my-4' > নাম: {sale?.customer?.name}</div>
                        <div className="flex justify-between">
                            <div >ঠিকানা:{sale?.customer?.address}</div>
                            <div className="w-1/3">মোবা: {sale?.customer?.phone} </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <table className="w-full border-collapse border-y border-gray-400">
                        <thead>
                            <tr className="bg-blue-900 text-white text-xs">
                                <th className="border-r border-gray-200 p-1 w-12">সংখ্যা</th>
                                <th className="border-r border-gray-200 p-1">পরিমাণ</th>
                                <th className="border-r border-gray-200 p-1 w-20">দর</th>
                                <th className="p-1 w-24">টাকা</th>
                            </tr>
                        </thead>
                        <tbody className="my-section  h-64 align-top overflow-hidden">



                            {/* Actual table rows */}
                            {sale.items?.map((p: any, idx: number) => (
                                <tr key={idx} className="relative border-b border-gray-100">
                                    <td className="border-r border-gray-300 p-2">{idx + 1}</td>
                                    <td className="border-r border-gray-300 p-2">
                                        {p.product.name} {" "}  {p.quantity} {p.product.unit}
                                    </td>
                                    <td className="border-r border-gray-300 p-2 ">{p.product.salesPrice}</td>
                                    <td className="text-left p-2">{p.totalPrice} </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className=" border-t border-gray-400 bg-blue-900 text-white">
                                <td colSpan={2} className="text-center px-2 py-1 font-"><span>কথায়ঃ {engNumberToBanglaWords(sale?.grandTotal)}</span></td>
                                <td className="p-1 ">  <span>মোটঃ</span></td>
                                <td className="p-1 ">  <span> {(sale?.grandTotal)} </span></td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* Footer Section */}
                    <div >

                        <div className="flex justify-between items-center m-1">
                            <div>
                                <p className="text-[12px] mt-6 border-t-2">ক্রেতার স্বাক্ষর</p>
                            </div>
                            <div className=" p-1 text-white border-1 border-red-700  ">
                                <p className="text-cyan-600">■ বিক্রিত মাল ফেরত নেওয়া হয় না।</p>
                                <p className="text-red-600">■ ডেলিভারী মাল না পাইলে ফোন করুন।</p>
                            </div>

                            <p className="text-[12px] mt-6 border-t-2">চৌথাকারীর স্বাক্ষর</p>

                        </div>
                        {/* Bottom Contact Info */}
                        <div className="bg-blue-950 text-white p-2 flex flex-col   rounded-b-lg">


                            <div className="flex justify-between items-center">
                                <div>
                                    <span className='flex flex-col '>
                                        <div className='flex flex-row '>
                                            <span className='my-auto text-green-600 text-xl'><FaWhatsapp /></span>  01842753607,<img src="/bkash_nogod_logo.png" alt="My Logo" className='w-8 h-4 pl-1 my-auto' /> 01707753607, 01841753607
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