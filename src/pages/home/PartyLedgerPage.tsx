import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Loading from '../../components/Loading';
import { useGetAllPayableTxnQuery, useGetAllReceivableTxnQuery } from '../../redux/features/partyledger/partyLedgerApi';
import Customers from './Customers';
import Suppliers from './Suppliers';
import Beparis from './Beparis';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { setPartyLimit, setPartyState } from '../../redux/features/common/commonSlice';
import { LIMIT_OPTIONS } from '../../utils/options';

// Pages

// Hooks (আপনার API অনুযায়ী adjust করবেন)

type PartyType = 'Customer' | 'Supplier' | 'Bepari';

type LedgerItem = {
    _id: string;
    name?: string;
    phone?: string;
    balance?: number | string;
};

const tabs: { value: PartyType; label: string }[] = [
    { value: 'Customer', label: 'কাস্টমার' },
    { value: 'Supplier', label: 'সাপ্লায়ার' },
    { value: 'Bepari', label: 'বেপারী' },
];

const PartyLedgerPage = () => {
    const partyState = useAppSelector((state) => state.common.partyState)
    const partyLimit = useAppSelector((state) => state.common.partyLimit)
    const [searchTerm, setSearchTerm] = useState('');
    const [limit] = useState()
    // Customer Data
    const {
        data: customerResponse,
        isLoading: customerLoading,
    } = useGetAllReceivableTxnQuery({ search: '', limit: limit });

    // Supplier Data
    const {
        data: supplierResponse,
        isLoading: supplierLoading,
    } = useGetAllPayableTxnQuery({ search: '', type: 'regular', limit: limit });

    // Bepari Data
    const {
        data: bepariResponse,
        isLoading: bepariLoading,
    } = useGetAllPayableTxnQuery({ search: '', type: 'commission', limit: limit });


    const customerData: LedgerItem[] = customerResponse?.data || [];
    const supplierData: LedgerItem[] = supplierResponse?.data || [];
    const bepariData: LedgerItem[] = bepariResponse?.data || [];
    const isLoading = customerLoading || supplierLoading || bepariLoading;

    const calculateTotal = (data: LedgerItem[] = []) =>
        data.reduce((total, item) => total + Number(item.balance || 0), 0);

    const summaryData = {
        customer: {
            totalParty: customerData.length,
            totalAmount: calculateTotal(customerData),
        },
        supplier: {
            totalParty: supplierData.length,
            totalAmount: calculateTotal(supplierData),
        },
        bepari: {
            totalParty: bepariData.length,
            totalAmount: calculateTotal(bepariData),
        },
    };

    const dispatch = useAppDispatch()
    if (isLoading) {
        return <div className="min-h-screen flex justify-center items-center">
            <Loading />
        </div>
    }
    return (
        <div className="max-w-screen bg-gray-300 rounded-lg p-1 md:p-6">
            <div className='mb-2' >
                {/* Search */}
                <div className='flex justify-between items-center'>
                    <div className="relative w-full max-w-xl ">
                        <FiSearch
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                        />
                        <input
                            type="text"
                            placeholder="নাম / মোবাইল দিয়ে খুঁজুন..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-xl border border-slate-400 bg-white py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    {/* Limit */}
                    <div>
                        <select
                            value={limit}
                            onChange={(e) => dispatch(setPartyLimit(Number(e.target.value)))}
                            className="w-30 select rounded-xl ml-1"
                        >
                            {LIMIT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Main Card */}
            <div className="max-w-scroverflow-y-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {/* Tabs */}
                <div className=" border-b border-slate-200 px-1 pt-1 md:px-6 md:pt-4">
                    <div className="flex gap-2 rounded-xl bg-slate-100 p-1">
                        {tabs.map((tab) => {
                            const isActive = partyState === tab.value;

                            const count =
                                tab.value === 'Customer'
                                    ? summaryData.customer.totalParty
                                    : tab.value === 'Supplier'
                                        ? summaryData.supplier.totalParty
                                        : summaryData.bepari.totalParty;

                            return (
                                <button
                                    key={tab.value}
                                    onClick={() => dispatch(setPartyState(tab.value))}
                                    className={`max-w-screen flex flex-1 items-center justify-center gap-1 rounded-xl px-1 py-3 text-sm font-semibold transition-all duration-200 md:text-base
                                    ${isActive
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    <span>{tab.label}</span>
                                    <span
                                        className={`rounded-full px-1 py-0.5 text-xs font-bold
                                        ${isActive
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-slate-200 text-slate-600'
                                            }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="p-3 md:p-6">
                    {partyState === 'Customer' && (
                        <Customers searchTerm={searchTerm} limit={partyLimit} />
                    )}

                    {partyState === 'Supplier' && (
                        <Suppliers searchTerm={searchTerm} limit={partyLimit} />
                    )}

                    {partyState === 'Bepari' && (
                        <Beparis searchTerm={searchTerm} limit={partyLimit} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PartyLedgerPage;
