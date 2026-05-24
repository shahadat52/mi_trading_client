import { format } from 'date-fns';

const StatusModal = ({ handleSelect, activeDate, setActiveDate }: any) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/5">
                <div className="mb-4">
                    <h2 className="text-base font-semibold text-slate-800">
                        Select Status
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        {format(new Date(activeDate.date), "dd MMM yyyy")}
                    </p>
                </div>

                <div className="space-y-2">
                    {[
                        { label: "Present", value: "present", color: "hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700" },
                        { label: "Absent", value: "absent", color: "hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700" },
                        { label: "Unpaid Leave", value: "unpaid_leave", color: "hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700" },
                        { label: "Paid Leave", value: "paid_leave", color: "hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700" },
                    ].map((item) => (
                        <button
                            key={item.value}
                            onClick={() => handleSelect(item.value)}
                            className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${item.color}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setActiveDate(null)}
                    className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default StatusModal;