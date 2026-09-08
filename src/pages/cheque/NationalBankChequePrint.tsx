// import React, { useState, useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';

// const NationalBankChequePrint = () => {
//     // চেকের ইনপুট ডেটা স্টেট
//     const [formData, setFormData] = useState({
//         payeeName: 'Md. Rahim Uddin',
//         amount: '1,50,000.00',
//         amountInWords: 'One Lakh Fifty Thousand Taka Only',
//         date: '08092026', // DDMMYYYY format (8 digits for the 8 boxes)
//         accountPayeeOnly: true,
//     });

//     const componentRef = useRef();

//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value,
//         });
//     };

//     // react-to-print হুক
//     const handlePrint = useReactToPrint({
//         contentRef: componentRef,
//         documentTitle: 'National-Bank-Cheque-Print',
//     });

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-slate-50 min-h-screen font-sans">
//             <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">
//                 National Bank Limited (Khatungonj) Cheque Print System
//             </h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* ফর্ম ইনপুট সেকশন (প্রিন্ট করার সময় হাইড থাকবে) */}
//                 <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 print:hidden">
//                     <h2 className="text-lg font-semibold text-slate-700 mb-4">Cheque Input Details</h2>

//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-slate-600 mb-1">Payee Name (Pay To)</label>
//                             <input
//                                 type="text"
//                                 name="payeeName"
//                                 value={formData.payeeName}
//                                 onChange={handleInputChange}
//                                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-slate-600 mb-1">Amount (Figure)</label>
//                             <input
//                                 type="text"
//                                 name="amount"
//                                 value={formData.amount}
//                                 onChange={handleInputChange}
//                                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-slate-600 mb-1">Amount in Words</label>
//                             <input
//                                 type="text"
//                                 name="amountInWords"
//                                 value={formData.amountInWords}
//                                 onChange={handleInputChange}
//                                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-slate-600 mb-1">Date (DDMMYYYY - 8 Digits)</label>
//                             <input
//                                 type="text"
//                                 name="date"
//                                 maxLength="8"
//                                 value={formData.date}
//                                 onChange={handleInputChange}
//                                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tracking-widest"
//                             />
//                         </div>

//                         <div className="flex items-center gap-2">
//                             <input
//                                 type="checkbox"
//                                 name="accountPayeeOnly"
//                                 id="accountPayeeOnly"
//                                 checked={formData.accountPayeeOnly}
//                                 onChange={handleInputChange}
//                                 className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
//                             />
//                             <label htmlFor="accountPayeeOnly" className="text-sm font-medium text-slate-700">
//                                 A/C Payee Only (Top-Left Crossing)
//                             </label>
//                         </div>

//                         <button
//                             onClick={handlePrint}
//                             className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2.5 rounded-lg transition duration-200 shadow-md"
//                         >
//                             Print Cheque
//                         </button>
//                     </div>
//                 </div>

//                 {/* প্রিভিউ ও প্রিন্ট লেআউট সেকশন */}
//                 <div className="flex flex-col items-center justify-center">
//                     <p className="text-xs text-slate-500 mb-2 print:hidden">National Bank Cheque Overlay Preview</p>

//                     {/*
//             National Bank এর স্ট্যান্ডার্ড চেকের মাপ অনুযায়ী সাইজ: Width = 195mm, Height = 88mm
//             প্রিন্ট করার সময় চেকের বর্ডার দেখা যাবে না, শুধুমাত্র টেক্সটগুলো প্রিন্ট হবে।
//           */}
//                     <div
//                         ref={componentRef}
//                         className="relative bg-white border border-dashed border-slate-400 shadow-lg overflow-hidden print:border-none print:shadow-none print:bg-transparent"
//                         style={{ width: '195mm', height: '88mm', boxSizing: 'border-box' }}
//                     >
//                         {/* 1. A/C Payee Only Cross Lines & Text (Top-Left Corner) */}
//                         {formData.accountPayeeOnly && (
//                             <div className="absolute top-3 left-4 flex flex-col gap-0.5 transform -rotate-12 pointer-events-none">
//                                 <span className="w-20 border-t-2 border-slate-900"></span>
//                                 <span className="w-20 border-t-2 border-slate-900"></span>
//                                 <span className="text-[9px] font-bold tracking-tighter text-slate-900 px-1">A/C PAYEE ONLY</span>
//                             </div>
//                         )}

//                         {/* 2. Date Boxes (Top Right Grid Format: 8 Separate Boxes for DDMMYYYY) */}
//                         <div className="absolute top-[16mm] right-[10mm] flex gap-[3.2mm] font-mono font-bold text-sm text-slate-900">
//                             {formData.date.padEnd(8, ' ').split('').map((char, index) => (
//                                 <div key={index} className="w-[5.2mm] text-center flex items-center justify-center">
//                                     {char}
//                                 </div>
//                             ))}
//                         </div>

//                         {/* 3. Payee Name Line (Pay To ... Or Bearer) */}
//                         <div className="absolute top-[36.5mm] left-[20mm] right-[35mm] text-sm font-bold text-slate-900 tracking-wide">
//                             ** {formData.payeeName} **
//                         </div>

//                         {/* 4. Amount in Words Line 1 */}
//                         <div className="absolute top-[47mm] left-[32mm] right-[55mm] text-xs font-semibold text-slate-900 capitalize leading-none">
//                             ** {formData.amountInWords} **
//                         </div>

//                         {/* 5. Amount in Figures Box (Tk Box on Right) */}
//                         <div className="absolute top-[45mm] right-[10mm] w-[50mm] h-[10mm] flex items-center justify-center font-bold font-mono text-sm text-slate-900">
//                             ** {formData.amount} **
//                         </div>
//                     </div>

//                     <span className="text-xs text-slate-400 mt-2 print:hidden text-center">
//                         * প্রিন্ট করার সময় প্রিন্টার প্রপার্টিজে পেপার সাইজ চেকের মাপ অনুযায়ী (Custom / 195x88mm) সিলেক্ট করুন এবং স্কেল ১০০% (Actual Size) রাখুন।
//                     </span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NationalBankChequePrint;