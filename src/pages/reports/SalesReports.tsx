import { useState, useMemo } from "react";
import QuickDateFilters from "./QuickDateFilters";
import { useSalesReportsQuery } from "../../redux/features/reports/reportsApi";
import CouthaSkeleton from "../../components/loadingErrorEmpty/LoadingState";
import ErrorState from "../../components/loadingErrorEmpty/ErrorState";


const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        minimumFractionDigits: 0,
    }).format(amount);

const calculatePercentage = (value: number, total: number) => {
    if (!total) return 0;
    return (value / total) * 100;
};

const SalesReports = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useSalesReportsQuery({ startDate, endDate });

    const report = data?.data;

    const handleQuickChange = (range: {
        startDate: Date;
        endDate: Date;
    }) => {
        setStartDate(range.startDate.toISOString().split("T")[0]);
        setEndDate(range.endDate.toISOString().split("T")[0]);
    };


    const stats = useMemo(() => {
        if (!report) return [];

        return [
            {
                title: "মোট লেবার",
                value: report.totalLabour || 0,
            },
            {
                title: "মোট কমিশন",
                value: report.totalCommission || 0,
            },
            {
                title: "মোট পণ্য বিক্রি",
                value: report.totalItemsSubTotal || 0,
            },
            {
                title: "গ্র্যান্ড টোটাল",
                value: report.totalGrandTotal || 0,
                highlight: true,
            },
        ];
    }, [report]);


    if (isLoading) return <CouthaSkeleton />;

    if (isError) {
        return (
            <ErrorState
                message={(error as any)?.data?.message || "Something went wrong"}
                onRetry={refetch}
            />
        );
    }



    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 bg-white p-4 rounded-xl shadow-sm border">
                <div className="flex gap-3">
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                            Start date
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                            End date
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                </div>

                <QuickDateFilters onChange={handleQuickChange} />
            </div>


            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((item, idx) => {
                    const percentage = calculatePercentage(
                        item.value,
                        report.totalGrandTotal
                    );

                    return (
                        <div
                            key={idx}
                            className={`rounded-2xl p-5 border shadow-sm transition hover:shadow-md ${item.highlight
                                ? "bg-primary text-white"
                                : "bg-white"
                                }`}
                        >
                            <p
                                className={`text-xs mb-2 ${item.highlight
                                    ? "text-white/80"
                                    : "text-gray-500"
                                    }`}
                            >
                                {item.title}
                            </p>

                            <h2 className="text-xl font-semibold tracking-tight">
                                {formatCurrency(item.value)}
                            </h2>


                            <div className="mt-4 h-1.5 w-full bg-gray-200 rounded overflow-hidden">
                                <div
                                    className={`h-full ${item.highlight ? "bg-white" : "bg-primary"
                                        }`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SalesReports;