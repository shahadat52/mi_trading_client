/* eslint-disable @typescript-eslint/no-explicit-any */
import { QRCodeSVG } from 'qrcode.react';
import { FaWhatsapp } from 'react-icons/fa';
import { engNumberToBanglaWords } from '../../../utils/engNumberToBanglaWords';
import { FaSquareFacebook } from "react-icons/fa6";


const UnpaidMemo = ({ sale, copyLabel, onClose }: any) => {
    return (
        <div className=" border max-w-3xl rounded overflow-auto print-area bg-white border-black shadow-lg print:shadow-none">
            <div className="flex items-start justify-center overflow-auto     ">

                <div className=" border max-w-3xl rounded  overflow-auto print-area  bg-white  border-black shadow-lg ">

                    {/* Header Section bg-[#f08c1d]  */}
                    <div className=' shadow-lg '>
                        <div className="grid grid-cols-12  text-center text-black ">
                            <div className="col-span-2 p-2 h-24 w-20  flex flex-col  items-end justify-center font-bold">
                                <img src="/mi_logo.png" alt="Logo" className='mt-32 h-20 w-24' />

                                <div className=" flex flex-col items-center bg-white  p-1 shadow-sm">
                                    <QRCodeSVG
                                        value="https://www.facebook.com/profile.php?id=100057298125999"
                                        size={48}
                                        bgColor="#ffffff"
                                        fgColor="#000000"
                                        level="H"
                                    />
                                </div>
                            </div>
                            {/* QR Section */}

                            <div className='col-span-9 mx-auto '>
                                <p className="text-xs italic my-4">বিসমিল্লাহির রাহমানির রাহিম</p>
                                <h1 className="text-red-700 text-3xl font-bold">মেসার্স এম.আই ট্রেডিং</h1>
                                <h2 className="text-blue-950  text-2xl font-serif italic">M/S. M.I TRADING</h2>
                                <p className="text-sm bg-blue-400 rounded-xl text-white ">জেনারেল মার্চেন্ট এন্ড কমিশন এজেন্ট</p>
                                <p className="text-sm ">হলুদ, মরিচ, ধনিয়া, ডাল, মশলা ও যাবতীয় ভূষা মালের আড়ৎ</p>

                            </div>
                            <div className="vertical-text pl-4 col-span-1 text-[14px] border rounded-bl-full   bg-red-800 text-white    ">
                                {sale?.status === "paid" ? '' : <span className='p-10'>{copyLabel}</span>}
                            </div>
                        </div>
                        <div className='bg-red-800'>
                            <p className="text-[14px]  text-center text-white">২০২ নং খাতুনগঞ্জ, কোতোয়ালী, চট্টগ্রাম। </p>
                        </div>

                        <div className=''>
                            <div className="text-[14px] mt-2  text-center text-black">
                                <span className='flex justify-center'> <span className='my-auto text-green-600 text-xl'><FaWhatsapp /></span>
                                    <span className='text-[14px]'>
                                        <span className='flex'>
                                            01842753607,<img src="/bkash_nogod_logo.png" alt="My Logo" className='w-8 h-4 pl-1 my-auto mr-1' /> 01707753607, 01841753607(দিপু)
                                        </span>
                                    </span>
                                </span>

                            </div>
                            <p className="flex justify-center items-center text-[14px]  text-center text-black">
                                <span className='flex justify-center items-center  my-[6px]'>
                                    <span className='my-auto text-[14px]'>
                                    </span>
                                    <span className='ml-2'> <p className="flex flex-row gap-2">
                                        <img src="/communication.png" alt="My Logo" className='w-6 h-[22px] pl-1 my-auto' /> mitrading.202ktg@gmail.com
                                    </p></span> <span className=' text-blue-600 text-xl'> <FaSquareFacebook /> </span> M/S.M.I Trading
                                </span>
                            </p>
                        </div>

                    </div>

                    {/* Info Section */}
                    <div className="p-4 text-sm">
                        <div className="flex justify-between ">
                            <div>নং: <span className="shadow px-4 py-1">{sale.invoice}</span></div>
                            <div className="shadow px-4 py-1">
                                তারিখ:{new Date(sale.date).toLocaleDateString()}

                            </div>
                        </div>
                        <div className='my-2' > নাম: <span className="shadow px-4 ">{sale?.customer?.name}</span> </div>
                        <div className="flex justify-between">
                            <div >ঠিকানা: <span className="shadow px-4 py-1 ">{sale?.customer?.address}</span></div>
                            <div className="w-1/3 text-right">মোবা:  <span className="shadow px-4 py-1 mb-2">{sale?.customer?.phone}</span></div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <table className="w-full h-auto  min-h-[200px] border-collapse border-y border-gray-400">
                        <thead>
                            <tr className="bg-blue-900 text-white text-xs">
                                <th className="border-r border-gray-200 p-1 w-12">সংখ্যা</th>
                                <th className="border-r border-gray-200 p-1">পরিমাণ</th>
                                <th className="border-r border-gray-200 p-1 w-20">দর</th>
                                <th className="p-1 w-24">টাকা</th>
                            </tr>
                        </thead>
                        <tbody className="my-section h-auto align-top overflow-hidden">



                            {/* Actual table rows */}
                            {sale.items?.map((p: any, idx: number) => (
                                <tr key={idx} className="relative border-b border-gray-100">
                                    <td className="border-r border-gray-300 p-1">{idx + 1}</td>
                                    <td className="border-r border-gray-300 p-1">
                                        {p.product.name} {" "}  {p.quantity} {p.product.unit}
                                    </td>
                                    <td className="border-r border-gray-300 p-1 ">{p.product.salesPrice}</td>
                                    <td className="p-1 text-end">{p.totalPrice} </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className=''>
                            <tr className="bg-blue-900 text-white">
                                <td colSpan={2} className="text-center px-2 py-1 font-"><span>কথায়ঃ {engNumberToBanglaWords(sale?.grandTotal)}</span></td>
                                <td className="p-1 pl-3">  <span>মোটঃ</span></td>
                                <td className="p-1 pl-3">  <span>{(sale?.grandTotal)} </span></td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="text-sm text-center text-red-700 leading-tight">
                        <p>মন্তব্যঃ ১৫ দিনের বাকী</p>
                    </div>

                    {/* Footer Section */}
                    <div className="">

                        {/* Bottom Contact Info */}
                        <div className="bg-white text-blue-900 px-3 py-1 flex items-center justify-between rounded-b-lg border-t border-blue-700">

                            {/* Contact Info */}

                            <p className="text-[12px] mt-6 border-t-2">ক্রেতার স্বাক্ষর</p>

                            <div className="flex justify-center items-end text-[10px] mb-1">
                                <div className="  p-1 text-blue-900 leading-tight">
                                    <p className='pb-1'>■ ক্রয়কৃত মাল যাচাই বাচাই করে বুজ স্লিপ দিবেন। <br /> <span className='ml-[10px]'>বুজ স্লিপ দেওয়ার পর অভিযোগ গ্রহনযোগ্য নয়।</span></p>
                                    <p>■ বিক্রিত মাল ফেরত নেওয়া হয় না।</p>
                                </div>

                            </div>

                            <p className="text-[12px] mt-6 border-t-2">চৌথাকারীর স্বাক্ষর</p>


                        </div>

                    </div>
                    <div className="flex justify-between items-center mt-8 pb-6 print:hidden force-single-page">
                        <div className="flex gap-2">
                            <button
                                className="px-4 py-2  rounded bg-blue-500 force-single-page "
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

        </div>
    );
};

export default UnpaidMemo;