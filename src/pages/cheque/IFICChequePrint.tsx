import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Bank_OPTIONS } from '../../utils/options';
import { format } from 'date-fns';


const IFICChequePrint = () => {
    const [bank, setBank] = useState('NATIONAL')
    const [formData, setFormData] = useState({
        payeeName: 'Arif Mohammad Forkan',
        amount: '1,50,000.00',
        amountInWords: 'One Lakh Fifty Thousand Taka Only',
        date: format(new Date(Date.now()), 'ddMMyyyy'), // DDMMYYYY format (8 digits for the 8 boxes)
        accountPayeeOnly: true,
    });


    const handleInputChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // react-to-print হুক
    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: 'Bank-Cheque-Print',
    });

    return (
        <div className="max-w-4xl mx-auto p-6 bg-slate-50 min-h-screen">
            <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                IFIC Bank Cheque Overlay Print System
            </h1>
            <div>
                <select
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-30 select rounded-xl ml-1"
                >
                    {Bank_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ফর্ম ইনপুট সেকশন (প্রিন্ট করার সময় হাইড থাকবে) */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 print:hidden">
                    <h2 className="text-lg font-semibold text-slate-700 mb-4">Cheque Input Details</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Payee Name (Pay To)</label>
                            <input
                                type="text"
                                name="payeeName"
                                value={formData.payeeName}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Amount (Figure)</label>
                            <input
                                type="text"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Amount in Words</label>
                            <input
                                type="text"
                                name="amountInWords"
                                value={formData.amountInWords}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Date (DDMMYYYY - 8 Digits)</label>
                            <input
                                type="text"
                                name="date"
                                maxLength={8}
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-mono tracking-widest"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="accountPayeeOnly"
                                id="accountPayeeOnly"
                                checked={formData.accountPayeeOnly}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                            />
                            <label htmlFor="accountPayeeOnly" className="text-sm font-medium text-slate-700">
                                A/C Payee Only (Top-Left Crossing)
                            </label>
                        </div>

                        <button
                            onClick={handlePrint}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition duration-200 shadow-md"
                        >
                            Print Cheque
                        </button>
                    </div>
                </div>

                {/* প্রিভিউ ও প্রিন্ট লেআউট সেকশন */}


                {
                    bank === 'NATIONAL' &&
                    <div
                        ref={printRef}
                        className="relative bg-white border border-dashed border-slate-400 shadow-lg overflow-hidden print:border-none print:shadow-none print:bg-transparent"
                        style={{ width: '195mm', height: '90mm', boxSizing: 'border-box' }}
                    >
                        {/* 1. A/C Payee Only Cross Lines & Text (Top-Left Corner) */}
                        {formData.accountPayeeOnly && (
                            <div className="absolute top-7  flex flex-col gap-0.5 transform -rotate-45 pointer-events-none">
                                <span className="w-20 border-t-2 border-slate-900"></span>
                                <span className="w-20 border-t-2 border-slate-900"></span>
                                <span className="text-[12px] font-bold tracking-tighter text-slate-900 ">A/C PAYEE ONLY</span>
                            </div>
                        )}

                        {/* 2. Date Boxes (Top Right Grid Format: 8 Separate Boxes for DDMMYYYY) */}
                        <div className="absolute  top-[12mm] left-[135mm] right-[3mm]  flex gap-[2mm]  font-bold text-[16px] text-slate-900">
                            {formData.date.padEnd(8, ' ').split('').map((char, index) => (
                                <div key={index} className=" w-[7mm] text-center flex items-center justify-center">
                                    {char}
                                </div>
                            ))}
                        </div>

                        {/* 3. Payee Name Line (Pay To ... Or Bearer) */}
                        <div className="absolute top-[27mm] left-[20mm] right-[80mm] text-[18px] font-bold text-slate-900 tracking-wide">
                            {formData.payeeName}
                        </div>

                        {/* 4. Amount in Words Line 1 */}
                        <div className="absolute top-[40mm] left-[32mm] right-[65mm]   text-[16px] font-semibold text-slate-900 capitalize leading-none">
                            {formData.amountInWords}
                        </div>

                        {/* 5. Amount in Figures Box (Tk Box on Right) */}
                        <div className=" absolute top-[38mm] left-[135mm] pt-2 text-left pl-2 w-[50mm] h-[10mm]  font-bold  text-[20px] text-slate-900">
                            {formData.amount}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default IFICChequePrint;