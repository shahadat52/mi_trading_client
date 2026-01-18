import { useState } from "react";
import { FaDollarSign } from 'react-icons/fa';
import QuickDateFilters from "./QuickDateFilters";
import { useGetPurchaseReportsQuery } from "../../redux/features/purchase/purchaseApi";
// import { FaChartLine, FaUsers, FaShoppingCart, FaDollarSign } from 'react-icons/fa';


const TransactionReports = () => {
    const [startDate, setStartDate] = useState(' ')
    const [endDate, setEndDate] = useState(' ')
    const { data } = useGetPurchaseReportsQuery({ startDate, endDate })
    const totalPurchases = data?.data || '';

    const stats = [
        {
            title: 'Total Transaction',
            value: totalPurchases,
            icon: FaDollarSign,
        }
    ];

    const handleQuickChange = (range: { startDate: Date; endDate: Date }) => {
        setStartDate(range.startDate.toISOString());
        setEndDate(range.endDate.toISOString());
    }


    return (
        <div>
            <div className="flex ml-4  ">
                <div className="flex flex-col gap-3">

                    <div className="flex gap-3">
                        <div className="flex flex-col">
                            <label>
                                Start date
                            </label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border rounded px-3 py-2 text-[12px] w-[116px] " />
                        </div>

                        <div className="flex flex-col">
                            <label>
                                End date
                            </label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border rounded px-3 py-2 text-[12px] w-[116px]" />
                        </div>
                    </div>
                    <QuickDateFilters onChange={handleQuickChange} />

                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 m-4 ">
                {stats.map((item) => (
                    <div
                        key={item.title}
                        className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between"
                    >
                        <div>
                            <p className="text-sm text-gray-500 mb-2">{item.title}</p>
                            <h2 className="text-xl font-bold text-gray-800">৳ {item.value}</h2>
                        </div>
                        <item.icon className="h-8 w-8 text-gray-400" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionReports;