import { endOfDay, format, startOfDay } from "date-fns";
import { useEffect, useRef, useState } from "react";
import SalesActivity from "./SalesActivity";
import PurchaseActivity from "./PurchaseActivity";
import CustomerTxnActivity from "./CustomerTxnActivity";
import SupplierTxnActivity from "./SupplierTxnActivity";
import BankTxnActivity from "./BankTxnActivity";
import MfsTxnActivity from "./MfsTxnActivity";
import OthersActivity from "./OthersActivity";
import BrokerTxnActivity from "./BrokerTxnActivity";
import { LIMIT_OPTIONS } from "../../utils/options";

const ActivityPage = () => {
    const [limit, setLimit] = useState(10)

    const [action, setAction] = useState("Sales");

    const [startDate, setStartDate] = useState<string>(
        format(startOfDay(new Date()), "yyyy-MM-dd")
    );

    const [toDate, setToDate] = useState<string>(
        format(endOfDay(new Date()), "yyyy-MM-dd")
    );

    const tabs = ["Sales", "Purchase", "CustomerTxn", "SupplierTxn", "BankTxn", "MFSTxn", "BrokerTxns", "Others"];

    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const [underlineStyle, setUnderlineStyle] = useState({
        left: 0,
        width: 0,
    });

    useEffect(() => {
        const activeIndex = tabs.indexOf(action);
        const activeTab = tabRefs.current[activeIndex];

        if (activeTab) {
            setUnderlineStyle({
                left: activeTab.offsetLeft,
                width: activeTab.offsetWidth,
            });
        }
    }, [action]);
    return (
        <div>
            <div className="flex justify-evenly gap-10 mx-auto w-full">
                <div>
                    <p>Start Date</p>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <p>End Date</p>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="border rounded px-3 py-2 text-sm"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <label
                        htmlFor="limit"
                        className="whitespace-nowrap text-sm font-medium text-gray-700"
                    >
                        Show
                    </label>

                    <select
                        id="limit"
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className="select select-bordered select-sm w-24"
                    >
                        {LIMIT_OPTIONS.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>

                    <span className="text-sm text-gray-500">entries</span>
                </div>
            </div>

            <div className="p-2">
                <div className="relative flex gap-10 border-b border-gray-300">
                    {/* Animated Underline */}
                    <span
                        className="absolute bottom-0 h-[3px] rounded-full bg-blue-600"
                        style={{
                            left: underlineStyle.left,
                            width: underlineStyle.width,
                            transition:
                                "left 350ms cubic-bezier(0.34, 1.56, 0.64, 1), width 250ms ease",
                        }}
                    />

                    {tabs.map((tab, index) => (
                        <button
                            key={tab}
                            ref={(el) => {
                                tabRefs.current[index] = el;
                            }}
                            onClick={() => setAction(tab)}
                            className={`px-1 py-3 text-sm font-medium uppercase transition-all duration-200 active:scale-95 ${action === tab
                                ? "text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Main Content */}
                <div>
                    {action === "Sales" && (
                        <SalesActivity
                            startDate={startDate}
                            endDate={toDate}
                        />
                    )}

                    {action === "Purchase" && (
                        <PurchaseActivity
                            startDate={startDate}
                            endDate={toDate}
                        />
                    )}

                    {action === "CustomerTxn" && (
                        <CustomerTxnActivity
                            startDate={startDate}
                            endDate={toDate}
                        />
                    )}

                    {action === "SupplierTxn" && (
                        <SupplierTxnActivity
                            startDate={startDate}
                            endDate={toDate}
                        />
                    )}

                    {action === "BankTxn" && (
                        <BankTxnActivity
                            limit={limit}
                            startDate={startDate}
                            endDate={toDate}
                        />
                    )}
                    {action === "MFSTxn" && (
                        <MfsTxnActivity
                            startDate={startDate}
                            endDate={toDate}
                        />
                    )}

                    {action === "BrokerTxns" && (
                        <BrokerTxnActivity
                            limit={limit}
                            startDate={startDate}
                            endDate={toDate}
                        />
                    )}

                    {action === "Others" && (
                        <OthersActivity
                            startDate={startDate}
                            endDate={toDate}
                        />
                    )}


                </div>
            </div>
        </div>
    );
};

export default ActivityPage;