/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { formatDateTime } from '../../utils/formatDateTime';
import { QRCodeSVG } from 'qrcode.react';

const DeliverySlip: React.FC<{ sale: any | null; onClose: () => void }> = ({ sale, onClose }) => {
    if (!sale) return null;
    return (
        <div className="fixed inset-0 z-50 flex  items-start justify-center overflow-auto  bg-black/40 min-h-screen  p-4 ">

            <div className=" border max-w-[500px] rounded  overflow-auto print-area w-[490px] bg-white  border-black shadow-lg ">

                <div className=' shadow shadow-blue-900   '>
                    {/* Header Section */}
                    <div className="grid grid-cols-12 bg-[#082882] text-center text-white  ">
                        <div className="col-span-2  h-20 w-20 flex my-auto mx-auto bg-white rounded-full items-center justify-center font-bold">
                            <img src="/mi_logo.png" alt="Logo" className='h-20 w-20' />
                        </div>
                        <div className='col-span-8'>
                            <p className="text-xs italic my-2">বিসমিল্লাহির রাহমানির রাহিম</p>
                            <h1 className="text-red-400 text-2xl font-bold">মেসার্স এম.আই ট্রেডিং</h1>
                            <h2 className="text-orange-400  text-xl font-serif italic">M/S. M.I TRADING</h2>
                            <p className="text-sm">জেনারেল মার্চেন্ট এন্ড কমিশন এজেন্ট</p>
                            <p className="text-[10px] mt-1 mb-4">২০২ নং খাতুনগঞ্জ, কোতোয়ালী, চট্টগ্রাম। ফোন: ০২৩-৩৩৩৫৮৯৯</p>
                        </div>
                        <div className="col-span-2  my-auto py-4 bg-blue-800 text-white text-[12px] font-semibold  rounded-l-full shadow-2xl shadow-black">
                            ডেলিভারী <br /> চালান
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="p-4 text-sm  rounded-t-4xl bg-white mx-[6px]">
                        <div className="flex justify-between mb-2">
                            <div> নং: <span className="border-dashed border-b px-2">{sale?.sales?.invoice}</span></div>
                            <div >
                                তারিখ: <span className="text-sta border-dashed border-b px-2">{formatDateTime(sale?.deliveryTime).split(',').slice(0, 2)}</span>

                            </div>
                        </div>
                        <div className='my-4' >নাম: <span className="border-dashed border-b px-2">জসিম</span> </div>
                        <div className="flex justify-between mb-2">
                            <div >ঠিকানা: <span className=" border-dashed border-b px-2">{sale?.destination}</span></div>
                            <div className=" text-right">মোবা:  <span className="border-dashed border-b px-2">01866168264</span></div>
                        </div>
                        <div className=""><span className=''>ট্রান্সপোর্ট/গাড়ির নাম্বার: </span> <span className="border-dashed border-b px-2">{sale?.via}</span></div>

                    </div>

                    {/* Table Section */}
                    <div className='mx-[6px] bg-white'>
                        <table className="w-full border-collapse border-y  ">
                            <thead className=''>
                                <tr className=" bg-orange-400 grid grid-cols-3 text-white text-xs">
                                    <th className="col-span-2 border-r border-gray-200 p-1 ">মালের বিবরণ</th>
                                    <th className="col-span-1 border-r border-gray-200 p-1 ">পরিমাণ</th>
                                </tr>
                            </thead>
                            <tbody className=" my-section  h-64 align-top overflow-hidden">



                                {/* Actual table rows */}
                                <tr className="grid grid-cols-3 text-center border-gray-100">
                                    <td className="col-span-2 border-r h-full border-gray-300 p-2">
                                        {sale.description}
                                    </td>
                                    <td className="col-span-1 border-r border-gray-300 p-2 ">{sale?.quantity} {sale?.units}</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>

                    {/* Footer Section */}
                    <div className="bg-white p-1  mx-[6px]">
                        <div className="flex justify-center items-center text-[10px] my-1">

                            <div className="border border-red-600 p-1 text-red-600 leading-tight">
                                <p><span className='text-white'>■ </span>বিক্রিত মাল ফেরত নেওয়া হয় না।</p>
                            </div>

                        </div>

                        {/* Bottom Contact Info */}
                        <div className="bg-blue-900 text-white px-3 py-2 flex items-center justify-between rounded-b-lg border-t border-blue-700">

                            {/* Contact Info */}
                            <div className="text-[10px] leading-tight">
                                <p className="flex items-center gap-1">
                                    <span>📞</span>
                                    <span>01842-753607, 01707-753607</span>
                                </p>
                                <p className="flex items-center gap-1 mt-[2px]">
                                    <span>✉</span>
                                    <span>mitrading.202ktg@gmail.com</span>
                                </p>
                            </div>

                            {/* QR Section */}
                            <div className="flex flex-col items-center bg-white  p-1 shadow-sm">
                                <QRCodeSVG
                                    value="https://wa.me/8801842753607"
                                    size={48}
                                    bgColor="#ffffff"
                                    fgColor="#000000"
                                    level="H"
                                />
                                <span className="text-[8px] text-blue-900 mt-[2px] font-semibold">
                                    Whatsapp
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
                                onClick={() => onClose()}
                            >
                                Close
                            </button>
                        </div>
                    </div>



                </div>
            </div>

        </div>
    );
};

export default DeliverySlip;