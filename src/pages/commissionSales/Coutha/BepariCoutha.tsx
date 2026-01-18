import { QRCodeSVG } from "qrcode.react";
import { DateTime } from "../../../utils/formatDateTime";
import './coutha.css'
import { useGetCommissionSalesSupplierLotWiseQuery } from "../../../redux/features/commissionSales/commissionSalesApi";
import { FaWhatsapp } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaSquareFacebook } from "react-icons/fa6";


/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
    settlement: any;
    onClose: () => void;
};

const BepariCoutha = ({ settlement, onClose }: Props) => {
    const { data } = useGetCommissionSalesSupplierLotWiseQuery({ supplier: settlement.supplier._id, lot: settlement.lot })
    const sales = data?.data || []
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-auto "
            onClick={onClose}
        >
            {/* Stop propagation so clicking modal doesn't close */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-lg rounded-xl  relative"
            >


                <div className="border-1">   {/*Coutha end */}

                    <div className="className={` flex items-center  rounded-bl-4xl border  border-white/20  bg-green-50 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] py-3  justify-between gap-4`} grid grid-cols-12 pb-4 text-center text-black ">
                        <div className=" col-span-2 p-2 h-32 w-36 flex  justify-center font-bold ">
                            <img src="/mi_logo.png" alt="Logo" className='h-32 w-36 mt-[-80px] overflow-auto' />
                        </div>
                        <button
                            onClick={onClose}
                            className="relative print:hidden top-3 right-3 text-gray-500 hover:text-red-500"
                        >
                            ✕
                        </button>
                        <div className='col-span-9 mx-auto '>
                            <p className="text-xs italic my-2">বিসমিল্লাহির রাহমানির রাহিম</p>
                            <h1 className="text-red-700 text-3xl font-bold ml-4">মেসার্স এম.আই ট্রেডিং</h1>
                            <h2 className="text-blue-950  text-3xl font-serif italic">M/S. M.I TRADING</h2>
                            <p className='text-red-700'>পরিচালকঃ আরিফ মোহাম্মাদ ফোরকান</p>
                            <p className="border rounded-full border-red-400 bg-red-50 text-sm">জেনারেল মার্চেন্ট এন্ড কমিশন এজেন্ট</p>
                            <p className="text-sm">হলুদ, মরিচ, ধনিয়া, ডাল, মশলা ও যাবতীয় ভূষা মালের আড়ৎ</p>
                            <p className="text-xs  flex items-center justify-center"> <IoLocationSharp /> ২০২ নং খাতুনগঞ্জ, কোতোয়ালী, চট্টগ্রাম। </p>

                            <p className="text-sm"> <span className='flex justify-center'> <span className='my-auto text-green-600 text-xl'><FaWhatsapp /></span>
                                <span className='text-[14px]'>
                                    <span className='flex'>
                                        01842-753607,<img src="/bkash_nogod_logo.png" alt="My Logo" className='w-8 h-4 pl-1 my-auto mr-1' />01707-753607, 01841-753607(দিপু)
                                    </span>
                                </span>
                            </span></p>
                            <p className="text-sm"> </p>

                            <p className="flex flex-row justify-center gap-2">
                                <img src="/communication.png" alt="My Logo" className='w-6 h-[22px] pl-1 my-auto' /> mitrading.202ktg@gmail.com
                            </p>
                            <p className="text-sm flex justify-center items-center gap-1"><span className="text-blue-600 text-lg "><FaSquareFacebook /></span> M/S.M.I Trading </p>
                        </div>

                        <div className="absolute  w-16 h-16  top-2 right-3">
                            <span className="   font-semibold text-center text-blue-900">  বেপারী <br /> চৌথা</span>
                        </div>

                        <div className=" absolute  bottom-1 right-1 flex flex-col items-center  p-1 shadow-sm">
                            <QRCodeSVG
                                value="https://wa.me/8801842753607"
                                size={48}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="H"
                            />
                        </div>

                    </div>

                    <div className="flex justify-between m-3">
                        <p>নং: {settlement?.invoice}</p>
                        <p>তারিখ: {DateTime(settlement?.createdAt)}</p>
                    </div>

                    <div className="flex flex-col justify-between m-2 gap-2">
                        <p className="border p-1 rounded-xl border-red-500 ">নাম: {settlement?.supplier?.name} </p>
                        <p className="border p-1 rounded-xl border-red-500">ঠিকানা:{settlement?.supplier?.address} </p>
                    </div>

                    <div className="grid grid-cols-3 min-h-[550px] print-bg">
                        <div className="col-span-2 border-r-2 border-gray-700 bg-green-100">
                            <p className="print-bg border-1 border-black text-black font-bold text-center">জমা</p>

                            <p className="text-center underline text-sm font-semibold">{sales[0]?.items?.product} </p>
                            {
                                sales?.map((sale: any, idx: number) =>
                                (<div key={idx} className="sale-bg flex border-b p-1  gap-2">
                                    <p className="w-[10%]"></p>
                                    <p>{sale?.items?.quantity} X</p>
                                    <p>{sale?.items?.salesPrice} = </p>
                                    <p>{sale?.items?.total} </p>
                                </div>)
                                )
                            }
                        </div>
                        <div className="col-span-1 bg-red-100">
                            <p className="print-bg border-1  border-black text-black font-bold text-center">খরচ</p>
                            <p className="border-b-1 border-gray-700 p-1 text-black"> তারিখঃ {DateTime(settlement?.importDate)}</p>
                            <p className="border-b-1 border-gray-700 p-1 text-black"> আমদানীঃ {settlement?.import}</p>
                            <p className="border-b-1 border-gray-700 p-1 text-black mb-10"> বাঃ {settlement?.description}</p>
                            <p className="border-b-1 border-gray-700 p-1 text-black"> ব্রোকারীঃ {settlement?.brokary} </p>
                            <p className="border-b-1 border-gray-700 p-1 text-black"> কুলিঃ {settlement?.kuli} </p>
                            <p className="border-b-1 border-gray-700 p-1 text-black"> ট্রাক ভাড়াঃ {settlement?.truck_rent}</p>
                            <p className="border-b-1 border-gray-700 p-1 text-black"> নগদ/ট্রান্সপোর্টঃ  {settlement?.transport_rent} </p>
                            <p className="border-b-1 border-gray-700 p-1 text-black">হাওলাতঃ  {settlement?.haolat} </p>
                            <p className="border-b-1 border-gray-700 p-1 text-black"> আড়ৎঃ {settlement?.arot}</p>
                            <p className="border-b-1 border-gray-700 p-1 text-black"> গদিঃ {settlement?.godi}</p>
                            <p className="border-b-1 border-gray-700 p-1 text-black"> তহরীঃ {settlement?.tohori} </p>
                            <p className="border-b-1 border-gray-700 p-1 text-black">মোটঃ  {settlement?.subTotal} </p>
                            <p className="border-b-1 border-gray-700 p-1 text-black">জমাঃ <span className="border-b-2 border-b-blue-700 px-2 ">  {settlement?.joma}</span></p>
                            <p className="border-b-1 border-gray-700 p-1 text-black">সর্বমোটঃ {settlement?.grandTotal} </p>

                        </div>
                    </div>
                    <div>
                        <p className="border-b-1 border-gray-700 pt-6 text-end pr-12 text-[10px]  text-black">চৌথাকারীর স্বাক্ষর </p>
                    </div>




                </div>  {/*Coutha end */}
                {/* Footer */}

                <div className="mt-6 flex print:hidden justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-md hover:bg-gray-100"
                    >
                        Close
                    </button>

                    <button
                        onClick={() => window.print()}
                        className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                    >
                        Print
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BepariCoutha;
