import { useState } from "react";
import { useGetCashInQuery, useGetCashOutQuery, useGetClosingBalanceQuery, useGetOpeningBalQuery } from "../../redux/features/cashbox/cashboxApi";
import CashOutPage from "./cash_out/CashOutPage";
import CashInPage from "./cash_in/CashInPage";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AddOpeningBalModal } from "./AddOpeningBalModal";
import { useAppSelector } from "../../redux/hook";

const CashboxPage = () => {
    const [action, setAction] = useState('cash_out')
    const tabs = ['cash_out', 'cash_in'];
    const [modalController, setModalController] = useState(false)
    const user = useAppSelector((state) => state.auth.auth.user)

    const { data } = useGetOpeningBalQuery(undefined);
    const openingBalance = data?.data;

    const { data: cashIn } = useGetCashInQuery(undefined);
    const cashInHistories = cashIn?.data;

    const { data: cashOut } = useGetCashOutQuery(undefined)
    const cashOutHistories = cashOut?.data

    const { data: closingBal } = useGetClosingBalanceQuery(undefined)
    const closingBalance = closingBal?.data?.closingBalance;
    console.log(closingBalance)


    const cash = ((openingBalance?.openingBalance || 0) + (cashInHistories?.totalCashIn || 0) - (cashOutHistories?.totalCashOut || 0))

    return (
        <div className="min-h-screen min-w-screen bg-gray-100 p-1">
            {/* Page Header */}
            <header className="flex justify-between  items-center mb-8 p-5">
                <h1 className="text-xl font-semibold uppercase text-gray-800">Cashbox <span className="text-xs">({openingBalance?.openingBalance || 0})</span> </h1>

                <div className="dropdown dropdown-left">
                    <div tabIndex={0} role="button" className="text-2xl">
                        <BsThreeDotsVertical />
                    </div>
                    <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li><button onClick={() => setModalController(true)}>+ Opening Balance</button></li>
                    </ul>
                </div>
            </header>

            {/* Summary Section */}
            <section className="grid grid-cols-3 sm:grid-cols-3 gap-6 mb-5">
                <div className=" bg-white shadow-md rounded-lg p-2 text-center mt-5">
                    <p className="text-sm font-semibold text-gray-600">Cash In</p>
                    <p className="text-sm font-bold text-green-600 mt-2">৳ {user?.role === 'manager' ? 0 : cashInHistories?.totalCashIn}</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-2 text-center">
                    <p className="text-sm font-semibold text-gray-600">Cash</p>
                    <p className="text-sm font-bold text-blue-600 mt-2">৳ {user?.role === 'manager' ? 0 : cash}</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-2 text-center mt-5">
                    <p className="text-sm font-semibold text-gray-600">Cash Out</p>
                    <p className="text-sm font-bold text-red-600 mt-2">৳ {user?.role === 'manager' ? 0 : cashOutHistories?.totalCashOut}</p>
                </div>
            </section>



            {/* Transactions Section */}
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
                            className={`px-1 py-2 text-sm font-medium uppercase transition-all duration-200 ease-out active:scale-[0.97] ${action === tab
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
                        cashOutHistories?.transactions && action === 'cash_out' && <CashOutPage transactions={cashOutHistories?.transactions} />
                    }

                    {
                        cashInHistories?.transactions && action === 'cash_in' && <CashInPage transactions={cashInHistories?.transactions} />
                    }
                </div>

                {
                    modalController && <AddOpeningBalModal setModalController={setModalController} />
                }
            </div>
        </div>
    );
};

export default CashboxPage;
