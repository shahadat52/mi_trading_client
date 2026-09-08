import { format } from 'date-fns';
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const ChequePage = () => {
    // ইনপুট ফর্মের স্টেট
    const [formData, setFormData] = useState({
        payeeName: 'Arif Mohammad Forkan',
        amount: '1,50,000',
        amountInWords: 'One Lakh Fifty Thousand Taka Only',
        date: format(new Date(Date.now()), 'dd MM yyyy'),
        accountPayeeOnly: true,
    });


    const handleInputChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: 'Bank-Cheque-Print',
    });


    return (
        <div className="max-w-4xl mx-auto p-6 bg-slate-50 min-h-screen">
            <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Bank Cheque Overlay Print System
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ফর্ম ইনপুট সেকশন (প্রিন্ট করার সময় হাইড থাকবে) */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 print:hidden">
                    <h2 className="text-lg font-semibold text-slate-700 mb-4">Cheque Input Details</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Payee Name</label>
                            <input
                                type="text"
                                name="payeeName"
                                value={formData.payeeName}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Amount (Figure)</label>
                            <input
                                type="text"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Amount in Words</label>
                            <input
                                type="text"
                                name="amountInWords"
                                value={formData.amountInWords}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Date (DD MM YYYY)</label>
                            <input
                                type="text"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="accountPayeeOnly"
                                id="accountPayeeOnly"
                                checked={formData.accountPayeeOnly}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="accountPayeeOnly" className="text-sm font-medium text-slate-700">
                                A/C Payee Only (Parallel Lines)
                            </label>
                        </div>

                        <button
                            onClick={handlePrint}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition duration-200 shadow-md"
                        >
                            Print Cheque
                        </button>
                    </div>
                </div>

                {/* প্রিভিউ ও প্রিন্ট লেআউট সেকশন */}
                <div className="flex flex-col items-center justify-center">
                    <p className="text-xs text-slate-500 mb-2 print:hidden">Live Cheque Overlay Preview</p>
                    <div
                        ref={printRef}
                        className="relative bg-white border border-dashed border-slate-400 shadow-lg overflow-hidden print:border-none print:shadow-none"
                        style={{ width: '190mm', height: '85mm', boxSizing: 'border-box' }}
                    >

                        {/* A/C Payee Only Parallel Lines */}
                        {formData.accountPayeeOnly && (
                            <div className="absolute top-4 left-6 flex flex-col gap-1 transform -rotate-12">
                                <span className="w-24 border-t-2 border-slate-900"></span>
                                <span className="w-24 border-t-2 border-slate-900"></span>
                                <span className="text-[10px] font-bold tracking-widest text-slate-900">A/C PAYEE ONLY</span>
                            </div>
                        )}

                        {/* Date Box (Top Right Corner) */}
                        <div className="absolute top-4 right-6 flex gap-1 tracking-[6px] font-mono font-bold text-sm text-slate-900 bg-transparent">
                            {formData.date.split('').map((char, index) => (
                                <span key={index} className="w-4 text-center">{char}</span>
                            ))}
                        </div>

                        {/* Payee Name Line */}
                        <div className="absolute top-[32mm] left-[25mm] right-12 text-sm font-semibold text-slate-900 border-b border-transparent">
                            {formData.payeeName}
                        </div>

                        {/* Amount in Words */}
                        <div className="absolute top-[41mm] left-[25mm] right-20 text-xs font-medium text-slate-900 capitalize leading-tight">
                            {formData.amountInWords}
                        </div>

                        {/* Amount in Figures (Boxed Area) */}
                        <div className="absolute top-[48mm] right-6 border border-slate-800 px-3 py-1 text-sm font-bold font-mono text-slate-900 bg-transparent">
                            ৳ {formData.amount} /=
                        </div>
                    </div>

                    <span className="text-xs text-slate-400 mt-2 print:hidden">
                        * প্রিন্ট করার আগে প্রিন্টার পেপার সাইজ চেকের মাপ অনুযায়ী (Custom Paper Size) সেট করে নিন।
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChequePage