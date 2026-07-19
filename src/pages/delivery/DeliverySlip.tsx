/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaWhatsapp } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { format } from 'date-fns';
import mi_logo from "../../assets/icons/mi_logo.png";


const DeliverySlip: React.FC<{ sale: any | null; onClose: () => void }> = ({ sale, onClose }) => {
    if (!sale) return null;
    const sales = sale?.sales;
    const products = sale?.sales?.items;
    const totalBosta = products?.reduce(
        (sum: number, item: any) => sum + Number(item.bosta),
        0
    );

    const minRows = 8;
    const emptyRows = Math.max(minRows - products.length, 0);

    return (
        <div className="fixed inset-0 z-50 flex  items-start justify-center overflow-auto  bg-black/40 min-h-screen   ">

            <div className=" border max-w-[400px] rounded  overflow-auto print-area w-[490px] bg-white  border-black shadow-lg ">

                <div className=' shadow shadow-blue-900   '>
                    {/* Header Section */}
                    <div className="grid grid-cols-12 bg-[#182c64] text-center text-white ">
                        <div className="col-span-2  h-20 w-20 flex my-auto mx-auto bg-white rounded-full items-center justify-center font-bold">
                            <img src="/mi_logo.png" alt="Logo" className='h-20 w-20' />
                        </div>
                        <div className='col-span-8'>
                            <p className="text-xs italic my-1">বিসমিল্লাহির রাহমানির রাহিম</p>
                            <h1 className="text-white text-[24px] ml-[13px] font-bold">মেসার্স এম.আই ট্রেডিং</h1>
                            <h2 className="text-red-500  text-xl font-serif">M/S. M.I TRADING</h2>
                            <p className="text-sm">জেনারেল মার্চেন্ট এন্ড কমিশন এজেন্ট</p>
                            <p className="text-xs  flex items-center justify-center"> <IoLocationSharp /> ২০২ নং খাতুনগঞ্জ, কোতোয়ালী, চট্টগ্রাম। </p>

                        </div>
                        <div className="col-span-2  my-auto py-4 bg-blue-800 text-white text-[12px] font-semibold  rounded-l-full shadow-2xl shadow-black">
                            ডেলিভারী <br /> চালান
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="p-2 text-xs  rounded-t-4xl bg-white mx-[6px]">
                        <div className="flex justify-between mb-2">
                            <div> নং: <span className="border-dashed border-b px-2">{sale?.sales?.invoice}</span></div>
                            <div >
                                তারিখ: {format(sale.updatedAt, 'dd/MM/yyyy')} <br /> সময়: {format(sale.updatedAt, 'hh:mm a')}
                            </div>
                        </div>
                        <div className='mb-2 mt-[-10px]'>নাম: <span className="border-dashed border-b px-2">{sales?.customer?.name}</span> </div>
                        <div className="grid grid-cols-2 mb-2">
                            <div className="text-left">মোবাইল:  <span className="border-dashed border-b px-1">{sales?.customer?.phone}</span></div>
                            <div className=""><span className=''>ট্রান্সপোর্ট নাম/নাম্বার: </span> <span className="border-dashed border-b px-১">{sale?.via}</span></div>
                        </div>
                        <div className='mt-[-10px]'>ঠিকানা:<span className=" border-dashed border-b px-1">{sales?.customer?.address}</span></div>

                    </div>

                    {/* Table Section */}
                    <div className=' bg-white '>
                        <table className="w-full border border-gray-900 border-collapse text-xs min-h-[200px] relative">


                            <thead className="relative z-10">
                                <tr className="bg-orange-500 text-white">
                                    <th className="w-12 border border-gray-900 py-1 text-center">
                                        নং
                                    </th>
                                    <th className="border border-gray-900 py-1 text-center">
                                        মালের বিবরণ
                                    </th>
                                    <th className="w-24 border border-gray-900 py-1 text-center">
                                        পরিমাণ
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="relative z-10">
                                {/* Watermark */}
                                <tr>
                                    <td>
                                        <img
                                            src={mi_logo}
                                            alt="watermark"
                                            className="absolute top-1/2 left-1/2 w-40 -translate-x-1/2 -translate-y-1/2 opacity-20"
                                        />
                                    </td>
                                </tr>
                                {products?.length ? (
                                    products.map((ite: any, idx: number) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="border  text-center py-1">
                                                {idx + 1}
                                            </td>

                                            <td className="border  px-2 py-1">
                                                {ite?.name}
                                            </td>

                                            <td className="border  text-center py-1">
                                                {ite?.bosta} বস্তা
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="border  text-center py-10 text-gray-500"
                                        >
                                            কোনো পণ্য নেই
                                        </td>
                                    </tr>
                                )}

                                {/* Empty rows for fixed height */}
                                {Array.from({ length: emptyRows }).map((_, i) => (
                                    <tr key={i}>
                                        <td className="border py-3"></td>
                                        <td className="border py-3"></td>
                                        <td className="border py-3"></td>
                                    </tr>
                                ))}
                            </tbody>

                            <tfoot className="relative z-10">
                                <tr className="bg-blue-600 text-white font-semibold">
                                    <td
                                        colSpan={2}
                                        className="border border-gray-900 text-end px-2 py-1"
                                    >
                                        মোটঃ
                                    </td>

                                    <td className="border border-gray-900 text-center py-1">
                                        {totalBosta} বস্তা
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Footer Section */}
                    <div className="bg-white p-1  ">
                        <div className="flex  items-center justify-center text-[10px] my-1">

                            <div className="border border-red-600 p-1 text-red-600 leading-tight">
                                <p><span className='text-white'>■ </span>বিক্রিত মাল ফেরত নেওয়া হয় না।</p>
                            </div>



                        </div>

                        {/* Bottom Contact Info */}
                        <div className="bg-blue-900 text-white px-3 py-2 flex items-center justify-between rounded-b-lg border-t border-blue-700">

                            {/* Contact Info */}
                            <div className="text-[10px] leading-tight">
                                <div className="text-[14px] mt-2  text-center text-white">
                                    <span className='flex justify-center '> <span className='my-auto text-green-600 text-xl'><FaWhatsapp /></span>
                                        <span className='text-[12px]'>
                                            <span className='flex'>
                                                01842753607,<img src="/bkash_nogod_logo.png" alt="My Logo" className='w-8 h-4 pl-1 my-auto mr-1' /> 01707753607, 01841753607
                                            </span>
                                        </span>
                                    </span>

                                </div>
                                <p className="flex items-center gap-1 mt-[2px]">
                                    <span><img src="/communication.png" alt="My Logo" className='w-6 h-5 pl-1 my-auto' /></span>
                                    <span className='text-sm'>mitrading.202ktg@gmail.com</span>
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