/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { QRCodeSVG } from 'qrcode.react';
import { FaWhatsapp } from 'react-icons/fa';
import { engNumberToBanglaWords } from '../../../utils/engNumberToBanglaWords';
import { FaSquareFacebook } from "react-icons/fa6";
import { DateTime } from '../../../utils/formatDateTime';
import { useParams } from 'react-router';
import { useGetBothSaleByInvoiceQuery } from '../../../redux/features/cart/cartApi';
import { useAppSelector } from '../../../redux/hook';
import { useGetCustomerDueQuery } from '../../../redux/features/customer/customerApi';


const UnpaidMemo = ({ sale: saleData, copyLabel, onClose }: any) => {
    const dueShow = useAppSelector((state) => state.sales.dueShow)
    const { id } = useParams()
    const { data } = useGetBothSaleByInvoiceQuery(id)
    const sale = data?.data || saleData || {}
    const customerId = saleData.customer._id
    const { data: customerTxns } = useGetCustomerDueQuery({ id: customerId })
    const customerDue = customerTxns?.data?.balance
    return (
        <div className=" border max-w-3xl rounded overflow-auto print-area bg-white border-black shadow-lg print:shadow-none">
            <div className="flex items-start justify-center overflow-auto     ">

                <div className=" border max-w-3xl rounded  overflow-auto print-area  bg-white  border-black shadow-lg ">

                    {/* Header Section bg-[#f08c1d]  */}
                    <div className='shadow-lg '>
                        <div className="grid grid-cols-12  text-center text-black ">
                            <div className="col-span-2 p-2 h-24 w-20  flex flex-col  items-end justify-center font-bold">
                                <img src="/mi_logo.png" alt="Logo" className='mt-8 h-20 w-24' />

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
                                <p className="text-xs italic my-1">বিসমিল্লাহির রাহমানির রাহিম</p>
                                <h1 className="text-red-700 text-xl font-bold">মেসার্স এম.আই ট্রেডিং</h1>
                                <h2 className="text-blue-950  text-xl font-serif italic">M/S. M.I TRADING</h2>
                                <p className="text-sm bg-blue-400 rounded-xl text-white ">জেনারেল মার্চেন্ট এন্ড কমিশন এজেন্ট</p>
                                <p className="text-[8px] ">হলুদ, মরিচ, ধনিয়া, ডাল, মশলা ও যাবতীয় ভূষা মালের আড়ৎ</p>

                            </div>
                            <div className="vertical-text pl-4 col-span-1 text-[10px] h-24 border rounded-bl-full   bg-red-800 text-white    ">
                                {sale?.status === "paid" ? '' : <span className=''>{copyLabel}</span>}
                            </div>
                        </div>
                        <div className='bg-red-800'>
                            <p className="text-[10px]  text-center text-white">২০২ নং খাতুনগঞ্জ, কোতোয়ালী, চট্টগ্রাম। </p>
                        </div>

                        <div className=''>
                            <div className="text-[8px]  text-center text-black">
                                <span className='flex justify-center'> <span className='mt-[-1px] text-green-600 text-sm'><FaWhatsapp /></span>
                                    <span className='text-[8px]'>
                                        <span className='flex'>
                                            01842753607,<img src="/bkash_nogod_logo.png" alt="My Logo" className='w-4 h-2 pl-1  mr-1' /> 01707753607, 01841753607(দিপু)
                                        </span>
                                    </span>
                                </span>

                            </div>
                            <p className="flex justify-center items-center text-[8px] mt-[-7px]  text-center text-black">
                                <span className='flex justify-center items-center  my-1'>
                                    <span className='my-auto text-[8px]'>
                                    </span>
                                    <span className='ml-2'> <p className="flex flex-row gap-1">
                                        <img src="/communication.png" alt="My Logo" className='w-4 h-[13px] pl-1 my-1' /> mitrading.202ktg@gmail.com
                                    </p></span> <span className=' text-blue-600 text-xs'> <FaSquareFacebook /> </span> M/S.M.I Trading
                                </span>
                            </p>
                        </div>

                    </div>

                    {/* Info Section */}
                    <div className="p-2 text-[8px]">
                        <div className="flex justify-between ">
                            <div>মেমো নং: <span className="">{sale.invoice}</span></div>
                            <div>
                                <div className="w-full text-center">মোবাইল:  <span className=" mb-2">{sale?.customer?.phone}</span></div>

                            </div>
                            <div className="">
                                তারিখ: {DateTime(sale?.date)}
                            </div>
                        </div>
                        <div className=' mb-[-3px] flex justify-between'>
                            <div className=" my-1 flex justify-between">
                                <div className='' > নাম: <span className=" ">{sale?.customer?.name}</span> </div>
                            </div>
                            <div >ঠিকানা: <span className="">{sale?.customer?.address}</span></div>
                        </div>

                    </div>

                    {/* Table Section */}
                    <table className="w-full h-auto  min-h-[200px] border-collapse border-y border-gray-400">
                        <thead>
                            <tr className="bg-blue-900 text-white text-xs">
                                <th className="border-r border-gray-200 p-1 w-12">সংখ্যা</th>
                                <th className="border-r border-gray-200 p-1">পণ্য ও পরিমাণ</th>
                                <th className="border-r border-gray-200 p-1 w-20">দর</th>
                                <th className="p-1 w-24">মোট</th>
                            </tr>
                        </thead>
                        <tbody className="my-section h-auto align-top overflow-hidden">



                            {/* Actual table rows */}
                            {sale.items?.map((p: any, idx: number) => (
                                <tr key={idx} className="text-[7px] relative border-b text-start  border-gray-100">
                                    <td className="border-r border-gray-300 text-center ">{idx + 1}</td>
                                    <td className="border-r pl-3 border-gray-300 ">
                                        {p.name} {" "} - {p?.bosta} বস্তা - {p.quantity} {p?.unit}
                                    </td>
                                    <td className="border-r text-center border-gray-300  ">{p.salePrice} </td>
                                    <td className=" text-center">{p?.salePrice * p?.quantity} </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="text-[8px] border-t border-gray-700 bg-blue-100 text-black">
                                <td colSpan={2} className="px-2  font-"><span></span></td>
                                <td className="text-end text-[7px]">  <span>সাব টোটাল- </span></td>
                                <td className="text-center ">  <span>{sale?.subtotal} </span></td>
                            </tr>
                            <tr className="text-[7px] border-t border-gray-700 bg-blue-100 text-black">
                                <td colSpan={2} className=" px-2  font-"><span></span></td>
                                <td className="text-end ">  <span>লেবার- </span></td>
                                <td className="text-center ">  <span>{sale?.labour} </span></td>
                            </tr>
                            <tr className="text-[7px] border-t border-gray-700 bg-blue-100 text-black">
                                <td colSpan={2} className=" px-2  font-"><span></span></td>
                                <td className="text-end ">  <span>কমিশন- </span></td>
                                <td className="text-center ">  <span>{sale?.customerCommission + (sale?.grandTotal) - (sale?.subtotal + sale?.others + sale?.labour + sale?.customerCommission)} </span></td>
                            </tr>
                            <tr className="text-[7px] border-t border-gray-700 bg-blue-100 text-black">
                                <td colSpan={2} className=" px-2  font-"><span></span></td>
                                <td className="text-end ">  <span>অন্যান্য-</span></td>
                                <td className="text-center ">  <span>{sale?.others} </span></td>
                            </tr>

                            <tr className=" text-[7px] border-t border-gray-700 bg-blue-100 text-black">
                                <td colSpan={2} className=" px-2  font-"><span></span></td>
                                <td className="text-end ">  <span>সর্বমোট- </span></td>
                                <td className=" text-center">  <span className=''>{sale?.grandTotal} </span></td>
                            </tr>
                            <tr className=" text-[7px] border-t border-gray-700 bg-blue-100 text-black">
                                <td colSpan={2} className=" px-2  font-"><span></span></td>
                                <td className="text-end ">  <span>জমা- </span></td>
                                <td className=" text-center">  <span className='bg-red-50 border-red-600 text-black rounded px-1 border-2'>{sale?.paidAmount} </span></td>
                            </tr>

                            <tr className="text-[8px] border-t border-gray-400 bg-blue-900 text-white">
                                <td colSpan={2} className="  text-start px-2 py-1 font-"><span>কথায়ঃ {engNumberToBanglaWords(sale?.grandTotal)}</span></td>
                                <td className=" text-end p-1 ">  <span>বাকি-</span></td>
                                <td className=" text-center p-1 ">  <span className='bg-red-600 border-red-600 text-white rounded px-1 border-2'>{sale?.grandTotal - sale?.paidAmount} </span></td>
                            </tr>
                        </tfoot>
                    </table>
                    {
                        dueShow && <p className='pl-1 py-[2px] text-sm'>সাবেক সহ বর্তমানে সর্বমোট: {`${customerDue}/- টাকা ${customerDue < 0 ? 'দিব' : 'পাবো'} `}</p>
                    }
                    {
                        sale.status === 'unpaid' || 'partial' ? <div className="text-sm text-start text-red-700 leading-tight">
                            <p className='pl-1 py-[2px] text-sm'>মন্তব্যঃ {sale?.comments}</p>
                        </div> : ''
                    }

                    {/* Footer Section */}
                    <div className="">

                        {/* Bottom Contact Info */}
                        <div className="bg-white text-blue-900 px-3 py-1 flex items-center justify-between rounded-b-lg border-t border-blue-700">

                            {/* Contact Info */}

                            <p className="text-[12px] mt-6 border-t-2">ক্রেতার স্বাক্ষর</p>

                            <div className="flex justify-center items-end text-[10px] mb-1">
                                <div className="  p-1 text-blue-900 leading-tight">
                                    <p className='pb-1'>■ ক্রয়কৃত মাল যাচাই বাচাই করে বুঝ স্লিপ দিবেন। <br /> <span className='ml-[10px]'>বুঝ স্লিপ দেওয়ার পর অভিযোগ গ্রহনযোগ্য নয়।</span></p>
                                    <p>■ বিক্রিত মাল ফেরত নেওয়া হয় না।</p>
                                </div>

                            </div>

                            <div>
                                <p className="text-[12px] ">{sale?.createdBy?.name}</p>
                                <p className="text-[12px]  border-t-2">চৌথাকারীর স্বাক্ষর </p>
                            </div>


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