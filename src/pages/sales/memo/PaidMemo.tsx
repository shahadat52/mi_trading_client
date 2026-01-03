import { QRCodeSVG } from "qrcode.react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const PaidMemo = ({ sale, onClose }: any) => {
    return (
        <div className="border max-w-3xl rounded overflow-auto print-area w-[500px] bg-white border-gray-300 shadow-lg">

            <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/40 min-h-screen p-4 ">

                <div className=" border max-w-3xl rounded  overflow-auto print-area w-[500px] bg-white  border-gray-300 shadow-lg ">

                    {/* Header Section */}
                    <div className="bg-[#f08c1d] p-4 text-center text-white relative">
                        <div className="absolute top-4 left-2 p-2 h-20 w-20 flex items-center justify-center font-bold">
                            <img src="/mi_logo.png" alt="Logo" className='h-16 w-24' />
                        </div>
                        <p className="text-xs italic mb-2">বিসমিল্লাহির রাহমানির রাহিম</p>
                        <h1 className="text-red-600 text-2xl font-bold">মেসার্স এম.আই ট্রেডিং</h1>
                        <h2 className="text-blue-950  text-xl font-serif italic">M/S. M.I TRADING</h2>
                        <p className="text-sm">জেনারেল মার্চেন্ট এন্ড কমিশন এজেন্ট</p>
                        <p className="text-xs">হলুদ, মরিচ, ধনিয়া, ডাল, মশলা ও যাবতীয় ভুসি মালের আড়ৎ</p>
                        <p className="text-[10px] mt-1">২০২ নং খাতুনগঞ্জ, কোতোয়ালী, চট্টগ্রাম। ফোন: ০২৩-৩৩৩৫৮৯৯</p>
                        <div className="absolute top-2 right-2 bg-blue-800 text-white text-xs px-2 py-1 rounded-full">
                            ক্যাশ মেমো
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="p-4 text-sm">
                        <div className="flex justify-between mb-2">
                            <div>নং: <span className="shadow px-4 py-1">{sale.invoice}</span></div>
                            <div className="shadow px-4 py-1">
                                তারিখ:{new Date(sale.date).toLocaleDateString()}

                            </div>
                        </div>
                        <div className='my-4' > নাম: <span className="shadow px-4 py-1">{sale.customer.name}</span> </div>
                        <div className="flex justify-between">
                            <div >ঠিকানা: <span className="shadow px-4 py-1 ">{sale.customer.address}</span></div>
                            <div className="w-1/3 text-right">মোবা:  <span className="shadow px-4 py-1 mb-2">{sale.customer.phone}</span></div>
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
                                    <td className="p-2">{p.totalPrice} </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className=" border-t border-gray-400 bg-blue-900 text-white">
                                <td colSpan={3} className="text-right px-2 py-1 font-bold">মোট</td>
                                <td className="p-1 pl-3">{sale?.grandTotal}</td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* Footer Section */}
                    <div className="">
                        <div className="flex justify-between items-end text-[10px] mb-8">
                            <div className="text-center">
                                <div className="border-t border-dashed border-gray-400 pt-1">ক্রেতার স্বাক্ষর</div>
                            </div>
                            <div className="border border-red-600 p-1 text-red-600 leading-tight">
                                <p>■ বিক্রিত মাল ফেরত নেওয়া হয় না।</p>
                                <p>■ ডেলিভারী মাল না পাইলে ফোন করুন।</p>
                            </div>
                            <div className="text-center">
                                <div className="border-t border-dashed border-gray-400 pt-1">চৌথাকারীর স্বাক্ষর</div>
                            </div>
                        </div>

                        {/* Bottom Contact Info */}
                        <div className="bg-blue-950 text-white p-2 flex justify-between items-center rounded-b-lg">
                            <div className="text-[10px]">
                                <p>📞 01842-753607, 01707-753607</p>
                                <p>✉ mitrading.202ktg@gmail.com</p>
                            </div>
                            <div className="flex flex-col items-center bg-white  p-1 shadow-sm">
                                <QRCodeSVG
                                    value="https://www.facebook.com/profile.php?id=100057298125999"
                                    size={48}
                                    bgColor="#ffffff"
                                    fgColor="#000000"
                                    level="H"
                                />
                                <span className="text-[8px] text-blue-900 mt-[2px] font-semibold">
                                    Facebook
                                </span>
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