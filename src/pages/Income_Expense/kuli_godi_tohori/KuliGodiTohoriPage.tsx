import { useState } from "react";
import GodiPage from "./GodiPage";
import LabourPage from "./LabourPage";
import TohoriPage from "./TohoriPage";
import { endOfDay, format, startOfDay } from "date-fns";

const KuliGodiTohoriPage = () => {
    const [action, setAction] = useState('kuli')
    const [startDate, setStartDate] = useState<string>(format(startOfDay(new Date()), "yyyy-MM-dd"));
    const [toDate, setToDate] = useState<string>(format(endOfDay(new Date()), "yyyy-MM-dd"));
    const tabs = ['godi', 'kuli', 'tohori'];
    return (
        <div>
            <div className="flex flex-row gap-2 w-full lg:w-auto">
                <div>
                    <label htmlFor="">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded px-3 py-2 [95%] text-sm"
                    />


                </div>
                <div>
                    <label htmlFor="">End Date</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="border rounded px-3 py-2 w-[95%] text-sm"
                    />
                </div>
            </div>

            <div className="p-2">

                <div className="relative flex justify-start gap-10 border-b-2 border-gray-300">
                    {/* Animated underline */}
                    <span
                        className="absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-300 ease-in-out"
                        style={{
                            width: '70px',
                            transform: `translateX(${tabs.indexOf(action) * 85}px)`
                        }}
                    />

                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setAction(tab)}
                            className={`px-1 py-2 text-sm font-medium uppercase
        transition-all duration-200 ease-out active:scale-[0.80]
        ${action === tab
                                    ? 'text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* main contain */}
                <div>
                    {
                        action === 'godi' && <GodiPage action={action} startDate={startDate} endDate={toDate} />
                    }

                    {
                        action === 'kuli' && <LabourPage action={action} startDate={startDate} endDate={toDate} />
                    }

                    {
                        action === 'tohori' && <TohoriPage action={action} startDate={startDate} endDate={toDate} />
                    }
                </div>
            </div>
        </div>
    );
};

export default KuliGodiTohoriPage;