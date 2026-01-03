
const PrintableInvoice = () => {
    return (
        <div>

        </div>
    );
};

export default PrintableInvoice


// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { useLoaderData } from "react-router";

// type SaleProduct = {
//     product: {
//         name: string;
//     };
//     qty: number;
//     unitPrice: number;
//     total: number;
// };

// export type Sale = {
//     [x: string]: string | number | Date;
//     items: any;
//     _id: string;
//     customer: {
//         name: string;
//         phone: string;
//         address: string
//     };
//     phone: string;
//     invoice: string;
//     date: string;
//     address?: string;
//     salesProducts: SaleProduct[];
//     subTotal: number;
//     discount?: number;
//     grandTotal: number;
//     paidAmount?: number;
//     dueAmount?: number;
//     status: string;
// };

// const PrintableInvoice: React.FC = () => {


//     const { data } = useLoaderData() as { data: Sale };
//     console.log(data)
//     const onClose = () => {
//         window.close();
//     };

//     return (
//         <div className="overflow-auto">

//             <div className="fixed inset-0 z-50 flex  items-start justify-center overflow-auto  bg-black/40 min-h-screen  p-4 ">

//                 <div className="  max-w-3xl rounded  overflow-auto print-area w-[500px] bg-white border border-gray-300 shadow-lg print:shadow-none print:border-none">

//                     {/* Header Section */}
//                     <div className="bg-[#f08c1d] p-4 text-center text-white relative">
//                         <div className="absolute top-2 left-2 border-2 border-white rounded-full p-2 h-12 w-12 flex items-center justify-center font-bold">
//                             M.I
//                         </div>
//                         <p className="text-xs italic">বিসমিল্লাহির রাহমানির রাহিম</p>
//                         <h1 className="text-red-600 text-2xl font-bold">মেসার্স এম.আই ট্রেডিং</h1>
//                         <h2 className="text-blue-950  text-xl font-serif">M/S. M.I TRADING</h2>
//                         <p className="text-sm">জেনারেল মার্চেন্ট এন্ড কমিশন এজেন্ট</p>
//                         <p className="text-xs">হলুদ, মরিচ, ধনিয়া, ডাল, মশলা ও যাবতীয় ভুসি মালের আড়ৎ</p>
//                         <p className="text-[10px] mt-1">২০২ নং খাতুনগঞ্জ, কোতোয়ালী, চট্টগ্রাম। ফোন: ০২৩-৩৩৩৫৮৯৯</p>
//                         <div className="absolute top-2 right-2 bg-blue-800 text-white text-xs px-2 py-1 rounded-full">
//                             ক্যাশ মেমো
//                         </div>
//                     </div>

//                     {/* Info Section */}
//                     <div className="p-4 text-sm">
//                         <div className="flex justify-between mb-2">
//                             <div>নং: <span className="border-b border-dotted border-gray-600 px-4">{data?.invoice}</span></div>
//                             <div className="">
//                                 তারিখ:{new Date(data?.date).toLocaleDateString()}

//                             </div>
//                         </div>
//                         <div className="mb-2">নাম:{data?.customer?.name} <span className="border border-gray-600 w-full inline-block min-w-[300px]"></span></div>
//                         <div className="flex justify-between">
//                             <div className="w-2/3">ঠিকানা:{data?.customer?.address} <span className="border-b border-dotted border-gray-600 w-3/4 inline-block"></span></div>
//                             <div className="w-1/3 text-right">মোবা: {data?.customer?.phone} <span className="border-b border-dotted border-gray-600 w-2/3 inline-block"></span></div>
//                         </div>
//                     </div>

//                     {/* Table Section */}
//                     <table className="w-full border-collapse border-y border-gray-400">
//                         <thead>
//                             <tr className="bg-blue-900 text-white text-xs">
//                                 <th className="border-r border-gray-200 p-1 w-12">সংখ্যা</th>
//                                 <th className="border-r border-gray-200 p-1">পরিমাণ</th>
//                                 <th className="border-r border-gray-200 p-1 w-20">দর</th>
//                                 <th className="p-1 w-24">টাকা</th>
//                             </tr>
//                         </thead>
//                         <tbody className="relative h-64 align-top overflow-hidden">

//                             {/* Background watermark row */}
//                             <tr className="absolute inset-0 pointer-events-none">
//                                 <td colSpan={4} className="h-full">
//                                     <div className="flex items-center justify-center h-full opacity-10">
//                                         <h1 className="text-6xl font-bold border-4 border-red-500 rounded-full p-4">
//                                             M.I
//                                         </h1>
//                                     </div>
//                                 </td>
//                             </tr>

//                             {/* Actual table rows */}
//                             {data?.items?.map((p: any, idx: number) => (
//                                 <tr key={idx} className="relative border-b border-gray-100">
//                                     <td className="border-r border-gray-300 p-2">{idx + 1}</td>
//                                     <td className="border-r border-gray-300 p-2">
//                                         {p?.product?.name} {" "}  {p?.quantity} {p?.product?.unit}
//                                     </td>
//                                     <td className="border-r border-gray-300 p-2 bg-blue-50">{p?.product?.salesPrice}</td>
//                                     <td className="p-2">{p?.totalPrice} </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                         <tfoot>
//                             <tr className=" border-t border-gray-400 bg-blue-900 text-white">
//                                 <td colSpan={3} className="text-right px-2 py-1 font-bold">মোট</td>
//                                 <td className="p-1 pl-3">{data?.grandTotal}</td>
//                             </tr>
//                         </tfoot>
//                     </table>

//                     {/* Footer Section */}
//                     <div className="p-4">
//                         <div className="flex justify-between items-end text-[10px] mb-8">
//                             <div className="text-center">
//                                 <div className="border-t border-dashed border-gray-400 pt-1">ক্রেতার স্বাক্ষর</div>
//                             </div>
//                             <div className="border border-red-600 p-1 text-red-600 leading-tight">
//                                 <p>■ বিক্রিত মাল ফেরত নেওয়া হয় না।</p>
//                                 <p>■ ডেলিভারী মাল না পাইলে ফোন করুন।</p>
//                             </div>
//                             <div className="text-center">
//                                 <div className="border-t border-dashed border-gray-400 pt-1">চৌথাকারীর স্বাক্ষর</div>
//                             </div>
//                         </div>

//                         {/* Bottom Contact Info */}
//                         <div className="bg-blue-950 text-white p-2 flex justify-between items-center rounded-b-lg">
//                             <div className="text-[10px]">
//                                 <p>📞 01842-753607, 01707-753607</p>
//                                 <p>✉ mitrading.202ktg@gmail.com</p>
//                             </div>
//                             <div className="bg-white p-1">
//                                 {/* Simplified QR Placeholder */}
//                                 <div className="w-8 h-8 bg-black"></div>
//                             </div>
//                         </div>
//                     </div>


//                 </div>
//                 <div className="flex justify-between items-center mt-8 pb-6">
//                     <div className="flex gap-2">
//                         <button
//                             className="px-4 py-2 border rounded hover:bg-gray-50"
//                             onClick={() => window.print()}
//                         >
//                             Print
//                         </button>
//                         <button
//                             className="px-4 py-2 bg-red-50 text-red-700 rounded"
//                             onClick={onClose}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             </div>









//             <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50 print:bg-white print:p-0">
//                 <div className="bg-white w-[800px] p-8 shadow-xl rounded print:shadow-none print:w-full print:h-full">

//                     {/* HEADER */}
//                     <div className="text-center mb-6 border-b pb-4">
//                         <h2 className="text-2xl font-bold">মেসার্স এম আই ট্রেডিং</h2>
//                         <p className="text-sm">সকল প্রকার ডাল, বুট, মসলার পাইকারি ও কমিশন সেলের আড়ৎ  </p>
//                         <p className="text-xs mt-1 text-gray-600">Phone:  01842753607  mitrading.202ktg@gmail.com</p>
//                     </div>

//                     {/* CUSTOMER INFO */}
//                     <div className="flex justify-between text-sm mb-6">
//                         <div>
//                             <p><strong>Customer:</strong> {data?.customer.name}</p>
//                             <p><strong>Phone:</strong> {data?.customer.phone}</p>
//                             {data?.address && <p><strong>Address:</strong> {data?.address}</p>}
//                         </div>
//                         <div className="text-right">
//                             <p><strong>Invoice ID:</strong> {data?.invoice}</p>
//                             <p><strong>Date:</strong> {new Date(data?.date).toLocaleDateString()}</p>
//                         </div>
//                     </div>

//                     {/* PRODUCT TABLE */}
//                     <table className="w-full border-collapse text-sm">
//                         <thead>
//                             <tr className="bg-gray-100 border">
//                                 <th className="border p-2 text-left">Product</th>
//                                 <th className="border p-2 text-center">Qty</th>
//                                 <th className="border p-2 text-right">Price</th>
//                                 <th className="border p-2 text-right">Total</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {data?.salesProducts?.map((item, idx) => (
//                                 <tr key={idx} className="border">
//                                     <td className="border p-2">{item?.product?.name}</td>
//                                     <td className="border p-2 text-center">{item?.qty}</td>
//                                     <td className="border p-2 text-right">{item?.unitPrice}</td>
//                                     <td className="border p-2 text-right font-semibold">{item?.total}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                     {/* SUMMARY */}
//                     <div className="flex justify-end mt-6">
//                         <div className="w-64 text-sm">
//                             <div className="flex justify-between py-1">
//                                 <span>Subtotal</span>
//                                 <span>{data?.subTotal}</span>
//                             </div>
//                             <div className="flex justify-between py-1">
//                                 <span>Discount</span>
//                                 <span>{data?.discount || 0}</span>
//                             </div>
//                             <div className="flex justify-between py-1 font-semibold">
//                                 <span>Grand Total</span>
//                                 <span>{data?.grandTotal}</span>
//                             </div>
//                             <div className="flex justify-between py-1">
//                                 <span>Paid</span>
//                                 <span>{data?.paidAmount || 0}</span>
//                             </div>
//                             <div className="flex justify-between py-1">
//                                 <span>Due</span>
//                                 <span>{data?.dueAmount || 0}</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* FOOTER */}
//                     <div className="flex justify-between items-center mt-10 print:hidden">
//                         <div className="text-xs text-gray-600">Generated by Hydro Tech</div>
//                         <div className="flex gap-2">
//                             <button
//                                 className="px-4 py-2 border rounded hover:bg-gray-100"
//                                 onClick={() => window.print()}
//                             >
//                                 Print
//                             </button>
//                             <button
//                                 className="px-4 py-2 bg-red-100 text-red-700 rounded"
//                                 onClick={onClose}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>

//                 </div>
//             </div></div>
//     );
// };

// export default PrintableInvoice;
