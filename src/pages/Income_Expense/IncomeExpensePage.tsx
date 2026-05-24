import { useState } from "react";
import ExpansesPage from "./expense/ExpansesPage";
import IncomePage from "./income/IncomePage";
import TxnSectorsPage from "./TxnSectors/TxnSectorsPage";

const IncomeExpensePage = () => {
    const [action, setAction] = useState('sectors')
    const tabs = ['expense', 'income', 'sectors'];
    return (
        <div className="p-2">

            <div className="relative flex justify-start gap-10 border-b-2 border-gray-300">
                {/* Animated underline */}
                <span
                    className="absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-300 ease-in-out"
                    style={{
                        width: '90px',
                        transform: `translateX(${tabs.indexOf(action) * 108}px)`
                    }}
                />

                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setAction(tab)}
                        className={`px-1 py-2 text-sm font-medium uppercase
        transition-all duration-200 ease-out active:scale-[0.97]
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
                    action === 'expense' && <ExpansesPage />
                }

                {
                    action === 'income' && <IncomePage />
                }

                {
                    action === 'sectors' && <TxnSectorsPage />
                }
            </div>
        </div>
    );
};

export default IncomeExpensePage;