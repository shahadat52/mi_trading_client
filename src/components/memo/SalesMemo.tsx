
const SalesMemo = () => {

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
            {/* Main Memo Card */}
            <div className="w-[500px] bg-white border border-gray-300 shadow-lg print:shadow-none print:border-none">

                {/* Header Section */}
                <div className="bg-[#f08c1d] p-4 text-center text-white relative">
                    <div className="absolute top-2 left-2 border-2 border-white rounded-full p-2 h-12 w-12 flex items-center justify-center font-bold">
                        M.I
                    </div>
                    <p className="text-xs italic">বিসমিল্লাহির রাহমানির রাহিম</p>
                    <h1 className="text-2xl font-bold">মেসার্স এম.আই ট্রেডিং</h1>
                    <h2 className="text-xl font-serif">M/S. M.I TRADING</h2>
                    <p className="text-sm">জেনারেল মার্চেন্ট এন্ড কমিশন এজেন্ট</p>
                    <p className="text-xs">হলুদ, মরিচ, ধনিয়া, ডাল, মশলা ও যাবতীয় ভুসি মালের আড়ৎ</p>
                    <p className="text-[10px] mt-1">২০২ নং খাতুনগঞ্জ, কোতোয়ালী, চট্টগ্রাম। ফোন: ০২৩-৩৩৩৫৮৯৯</p>
                    <div className="absolute top-2 right-2 bg-blue-800 text-white text-xs px-2 py-1 rounded-full">
                        ক্যাশ মেমো
                    </div>
                </div>

                {/* Info Section */}
                <div className="p-4 text-sm">
                    <div className="flex justify-between mb-2">
                        <div>নং: <span className="border-b border-dotted border-gray-600 px-4">৪৪৫০</span></div>
                        <div className="flex">
                            তারিখ:
                            <div className="flex border border-gray-400 ml-2">
                                <div className="w-6 h-6 border-r border-gray-400"></div>
                                <div className="w-6 h-6 border-r border-gray-400"></div>
                                <div className="w-6 h-6"></div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-2">নাম: <span className="border-b border-dotted border-gray-600 w-full inline-block min-w-[300px]"></span></div>
                    <div className="flex justify-between">
                        <div className="w-2/3">ঠিকানা: <span className="border-b border-dotted border-gray-600 w-3/4 inline-block"></span></div>
                        <div className="w-1/3 text-right">মোবা: <span className="border-b border-dotted border-gray-600 w-2/3 inline-block"></span></div>
                    </div>
                </div>

                {/* Table Section */}
                <table className=" w-full border-collapse border-y border-gray-400">
                    <thead>
                        <tr className="bg-blue-900 text-white text-xs">
                            <th className="border-r border-gray-200 p-1 w-12">সংখ্যা</th>
                            <th className="border-r border-gray-200 p-1">পরিমাণ</th>
                            <th className="border-r border-gray-200 p-1 w-20">দর</th>
                            <th className="p-1 w-24">টাকা</th>
                        </tr>
                    </thead>
                    <tbody className=" my-section h-64 align-top">
                        {/* Empty rows for layout */}
                        <tr className="border-b border-gray-100">
                            <td className="border-r border-gray-300 p-2"></td>
                            <td className="border-r border-gray-300 p-2 relative">
                                {/* <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                    <h1 className="text-6xl font-bold border-4 border-red-500 rounded-full p-4">M.I</h1>
                                </div> */}
                            </td>
                            <td className="border-r border-gray-300 p-2 bg-blue-50"></td>
                            <td className="p-2"></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr className="border-t border-gray-400 bg-blue-900 text-white">
                            <td colSpan={3} className="text-right px-2 py-1 font-bold">মোট</td>
                            <td className="p-1"></td>
                        </tr>
                    </tfoot>
                </table>

                {/* Footer Section */}
                <div className="p-4">
                    <div className="flex justify-between items-end text-[10px] mb-8">
                        <div className="text-center">
                            <div className="border-t border-dashed border-gray-400 pt-1">ক্রেতার স্বাক্ষর</div>
                        </div>
                        <div className="border border-red-600 p-1 text-red-600 leading-tight">
                            <p>■ বিক্রিত মাল ফেরত নেওয়া হয় না।</p>
                            <p>■ ডেলিভারী মাল না পাইলে ফোন করুন।</p>
                        </div>
                        <div className="text-center">
                            <div className="border-t border-dashed border-gray-400 pt-1">পৌঁছকারীর স্বাক্ষর</div>
                        </div>
                    </div>

                    {/* Bottom Contact Info */}
                    <div className="bg-blue-950 text-white p-2 flex justify-between items-center rounded-b-lg">
                        <div className="text-[10px]">
                            <p>📞 01842-753607, 01707-753607</p>
                            <p>✉ mitrading.202ktg@gmail.com</p>
                        </div>
                        <div className="bg-white p-1">
                            {/* Simplified QR Placeholder */}
                            <div className="w-8 h-8 bg-black"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesMemo;