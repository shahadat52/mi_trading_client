/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { QRCodeSVG } from 'qrcode.react';
import { FaWhatsapp } from 'react-icons/fa';
import { FaSquareFacebook } from "react-icons/fa6";
import { useParams } from 'react-router';
import { useGetBothSaleByInvoiceQuery } from '../../../redux/features/cart/cartApi';
import { useAppSelector } from '../../../redux/hook';
import { useGetCustomerDueQuery } from '../../../redux/features/customer/customerApi';
import { toCurrency } from 'to-words/bn-BD';
import { format } from 'date-fns';
import mi_logo from "../../../assets/icons/mi_logo.png";


const UnpaidMemo = ({ sale: saleData, copyLabel, onClose }: any) => {
    const dueShow = useAppSelector((state) => state.sales.dueShow)
    const { id } = useParams()
    const { data } = useGetBothSaleByInvoiceQuery(id)
    const sale = data?.data || saleData || {}
    const customerId = saleData.customer._id
    const { data: customerTxns } = useGetCustomerDueQuery({ id: customerId })
    const customerDue = customerTxns?.data?.balance
    return (
        <div className=" border max-w-3xl rounded overflow-auto print-area bg-white border-[#444444] shadow-lg print:shadow-none">
            <div className="flex items-start justify-center overflow-auto     ">

                <div className=" border max-w-3xl rounded  overflow-auto print-area  bg-white  border-[#444444] shadow-lg ">

                    {/* Header Section bg-[#f08c1d]  */}
                    <div className='shadow-lg '>
                        <div className="grid grid-cols-12  text-center text-[#222222] ">
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
                                <h1 className="text-[#A61C1C] text-xl font-bold">মেসার্স এম.আই ট্রেডিং</h1>
                                <h2 className="text-[#1a4771]  text-xl font-serif italic">M/S. M.I TRADING</h2>
                                <p className="text-sm bg-[#317cc2] rounded-xl text-white ">জেনারেল মার্চেন্ট এন্ড কমিশন এজেন্ট</p>
                                <p className="text-[8px] ">হলুদ, মরিচ, ধনিয়া, ডাল, মশলা ও যাবতীয় ভূষা মালের আড়ৎ</p>

                            </div>
                            <div className="vertical-text pl-4 col-span-1 text-[10px] h-24 border rounded-bl-full font-bold   bg-[#8b1e1e] text-white    ">
                                {sale?.status === "paid" ? '' : <span className=''>{copyLabel}</span>}
                            </div>
                        </div>
                        <div className='bg-[#8B1E1E]'>
                            <p className="text-[10px] font-bold  text-center text-white">২০২ নং খাতুনগঞ্জ, কোতোয়ালী, চট্টগ্রাম। </p>
                        </div>

                        <div className=''>
                            <div className="text-[8px]  text-center text-[#222222]">
                                <span className='flex justify-center'> <span className='mt-[-1px] text-green-600 text-sm'><FaWhatsapp /></span>
                                    <span className='text-[8px]'>
                                        <span className='flex'>
                                            01842753607,<img src="/bkash_nogod_logo.png" alt="My Logo" className='w-4 h-2 pl-1  mr-1' /> 01707753607, 01841753607(দিপু)
                                        </span>
                                    </span>
                                </span>

                            </div>
                            <div className="flex justify-center items-center text-[8px] mt-[-7px]  text-center text-[#222222]">
                                <span className='flex justify-center items-center  my-1'>
                                    <span className='my-auto text-[8px]'>
                                    </span>
                                    <span className='ml-2'> <p className="flex flex-row gap-1">
                                        <img src="/communication.png" alt="My Logo" className='w-4 h-[13px] pl-1 my-1' /> mitrading.202ktg@gmail.com
                                    </p></span> <span className=' text-blue-600 text-xs'> <FaSquareFacebook /> </span> M/S.M.I Trading
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Info Section */}
                    <div className="p-2 text-[10px]">
                        <div className="grid grid-cols-3 text-start mb-1 ">
                            <div className='text-start'>মেমো নং: <span className="">{sale.invoice}</span></div>
                            <div>
                                <div className="w-full text-start"><p className='mb-2'>{sale?.broker === '' ? '' : ` ব্রোকার:${sale?.broker}`}</p></div>
                            </div>
                            <div className="text-start">
                                তারিখ: {format(sale.date, 'dd/MM/yyyy')} <br /> সময়: {format(sale.date, 'hh:mm a')}
                            </div>
                        </div>
                        <div className='grid grid-cols-3  text-start'>
                            <div className=" flex justify-between text-start ">
                                <div className='text-start' > নাম: <span className=" ">{sale?.customer?.name}</span> </div>
                            </div>

                            <div>
                                <div className="w-full text-start">মোবাইল:  <span className=" mb-2">{sale?.customer?.phone}</span></div>
                            </div>
                            <div className='text-start' >ঠিকানা: <span className="">{sale?.customer?.address}</span></div>
                        </div>

                    </div>

                    {/* Table Section */}
                    <table className="w-full h-auto  min-h-[250px] border-collapse border-y border-gray-400">
                        <thead>
                            <tr className="bg-[#1F4E79] text-white text-xs">
                                <th className="border-r border-gray-200 p-1 w-10">সংখ্যা</th>
                                <th className="border-r border-gray-200 p-1">পণ্য ও পরিমাণ</th>
                                <th className="border-r border-gray-200 p-1 w-16">দর</th>
                                <th className="p-1 w-20">মোট</th>
                            </tr>
                        </thead>
                        <tbody className="relative  h-auto align-top  overflow-hidden">
                            <tr>
                                <td>
                                    <img
                                        src={mi_logo}
                                        alt="watermark"
                                        className="absolute mt-8 top-1/2 left-1/2 w-40 -translate-x-1/2 -translate-y-1/2 opacity-25"
                                    />
                                </td>
                            </tr>
                            {/* Actual table rows */}
                            {sale.items?.map((p: any, idx: number) => (
                                <tr key={idx} className="text-[10px] relative border-b text-start  border-gray-100">
                                    <td className="border-r border-gray-300 text-center ">{idx + 1}</td>
                                    <td className="border-r pl-3 border-gray-300 ">
                                        {p.name} {" "} {p?.bosta}| {p.quantity} {p?.unit === 'কেজি' ? 'kg' : p.unit}
                                    </td>
                                    <td className="border-r text-center border-gray-300  ">{p.salePrice} </td>
                                    <td className=" text-center">{p?.salePrice * p?.quantity} </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="text-[10px] border-t border-gray-700  bg-[#dbeefa] text-[#222222]">
                                <td colSpan={2} className="px-2  font-"><span></span></td>
                                <td className="text-end text-[7px]">  <span>সাব টোটাল- </span></td>
                                <td className="text-center ">  <span>{sale?.subtotal} </span></td>
                            </tr>
                            <tr className="text-[10px] border-t border-gray-700  bg-[#dbeefa] text-[#222222]">
                                <td colSpan={2} className=" px-2  font-"><span></span></td>
                                <td className="text-end ">  <span>লেবার- </span></td>
                                <td className="text-center ">  <span>{sale?.labour} </span></td>
                            </tr>
                            <tr className="text-[10px] border-t border-gray-700  bg-[#dbeefa] text-[#222222]">
                                <td colSpan={2} className=" px-2  font-"><span></span></td>
                                <td className="text-end ">  <span>কমিশন- </span></td>
                                <td className="text-center ">  <span>{sale?.customerCommission + (sale?.grandTotal) - (sale?.subtotal + sale?.others + sale?.labour + sale?.customerCommission)} </span></td>
                            </tr>
                            <tr className="text-[10px] border-t border-gray-700  bg-[#dbeefa] text-[#222222]">
                                <td colSpan={2} className=" px-2  font-"><span></span></td>
                                <td className="text-end ">  <span>অন্যান্য-</span></td>
                                <td className="text-center ">  <span>{sale?.others} </span></td>
                            </tr>

                            <tr className=" text-[10px] border-t border-gray-700  bg-[#dbeefa] text-[#222222]">
                                <td colSpan={2} className=" px-2  font-"><span></span></td>
                                <td className="text-end ">  <span>সর্বমোট- </span></td>
                                <td className=" text-center">  <span className=''>{sale?.grandTotal} </span></td>
                            </tr>
                            <tr className=" text-[10px] border-t border-gray-700  bg-[#dbeefa] text-[#222222]">
                                <td colSpan={2} className=" px-2  font-"><span></span></td>
                                <td className="text-end ">  <span>জমা- </span></td>
                                <td className=" text-center">  <span className='bg-red-50 border-red-600 text-[#222222] rounded px-1 border-2'>{sale?.paidAmount} </span></td>
                            </tr>

                            <tr className="text-[10px] border-t border-gray-400 bg-blue-900 text-white">
                                <td colSpan={2} className="  text-start px-2 py-1 font-"><span>কথায়ঃ {toCurrency(sale?.grandTotal - sale?.paidAmount)}</span></td>
                                <td className=" text-end p-1 ">  <span>বাকি-</span></td>
                                <td className=" text-center p-1 ">  <span className='bg-[#B22222] border-red-600 text-white rounded px-1 border-2'>{sale?.grandTotal - sale?.paidAmount} </span></td>
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
                        <div className="grid grid-cols-12 items-end bg-white text-[#1F4E79] px-3 py-2 rounded-b-lg border-t border-[#2F5D8A]">

                            <div className="col-span-2">
                                <div className="h-6"></div>
                                <p className="text-[10px] border-t-2 text-center">
                                    ক্রেতার স্বাক্ষর
                                </p>
                            </div>

                            <div className="flex justify-center items-center col-span-7 px-3">
                                <div className="text-[8px] leading-relaxed text-start">
                                    <p>■ ক্রয়কৃত মাল যাচাই-বাছাই করে বুঝে স্লিপ দিবেন। <br /> বুঝ স্লিপ দেওয়ার পর অভিযোগ গ্রহণযোগ্য নয়।</p>
                                    <p>■ বিক্রিত মাল ফেরত নেওয়া হয় না।</p>
                                </div>
                            </div>

                            <div className="col-span-3 text-right">
                                <p className="text-[10px] text-center">{sale?.createdBy?.name}</p>
                                <p className="text-[10px] border-t-2 text-center">
                                    চৌথাকারীর স্বাক্ষর
                                </p>
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