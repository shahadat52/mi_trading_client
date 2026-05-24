import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Loading from '../../components/Loading';
import { useGetAllPayableTxnQuery, useGetAllReceivableTxnQuery } from '../../redux/features/partyledger/partyLedgerApi';
import Customers from './Customers';
import Suppliers from './Suppliers';
import Beparis from './Beparis';

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
    const [activeTab, setActiveTab] = useState<PartyType>('Customer');
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

    // const currentSummary = useMemo(() => {
    //     switch (activeTab) {
    //         case 'Customer':
    //             return {
    //                 title: 'মোট পাবো',
    //                 ...summaryData.customer,
    //             };
    //         case 'Supplier':
    //             return {
    //                 title: 'মোট সাপ্লাইয়ারদের  দিবো',
    //                 ...summaryData.supplier,
    //             };
    //         case 'Bepari':
    //             return {
    //                 title: 'মোট বেপারীদের দিবো',
    //                 ...summaryData.bepari,
    //             };
    //         default:
    //             return {
    //                 title: 'মোট ব্যালেন্স',
    //                 totalParty: 0,
    //                 totalAmount: 0,
    //             };
    //     }
    // }, [activeTab, summaryData.customer, summaryData.supplier, summaryData.bepari]);


    if (isLoading) {
        return <div className="min-h-screen flex justify-center items-center">
            <Loading />
        </div>
    }
    return (
        <div className="max-w-screen bg-gray-300 rounded-lg p-1 md:p-6">
            {/* Summary Cards */}
            {/* <div className="mb-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                <SummaryCard
                    title={currentSummary.title}
                    value={`৳ ${currentSummary.totalAmount.toLocaleString()}`}
                    icon={<FaWallet size={20} />}
                />
            </div> */}

            <div className="mb-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">


                {/* Search */}
                <div className='grid grid-cols-4'>
                    <div className="relative w-full col-span-3 ">
                        <FiSearch
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                        />
                        <input
                            type="text"
                            placeholder="নাম / মোবাইল দিয়ে খুঁজুন..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-2xl border border-slate-400 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                </div>
            </div>

            {/* Main Card */}
            <div className="max-w-scroverflow-y-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {/* Tabs */}
                <div className=" border-b border-slate-200 px-1 pt-1 md:px-6 md:pt-4">
                    <div className="flex gap-2 rounded-xl bg-slate-100 p-1">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.value;

                            const count =
                                tab.value === 'Customer'
                                    ? summaryData.customer.totalParty
                                    : tab.value === 'Supplier'
                                        ? summaryData.supplier.totalParty
                                        : summaryData.bepari.totalParty;

                            return (
                                <button
                                    key={tab.value}
                                    onClick={() => setActiveTab(tab.value)}
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
                    {activeTab === 'Customer' && (
                        <Customers searchTerm={searchTerm} />
                    )}

                    {activeTab === 'Supplier' && (
                        <Suppliers searchTerm={searchTerm} />
                    )}

                    {activeTab === 'Bepari' && (
                        <Beparis searchTerm={searchTerm} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PartyLedgerPage;

/* -----------------------------
   Reusable Summary Card
------------------------------ */
// type SummaryCardProps = {
//     title: string;
//     value: string;
//     icon: React.ReactNode;
// };

// const SummaryCard = ({ title, value, icon }: SummaryCardProps) => {
//     return (
//         <div className={`rounded-3xl border border-slate-200 ${title === 'মোট পাবো' ? 'bg-blue-700 text-white' : 'bg-red-700 text-white '} p-5 shadow-sm transition hover:shadow-md`}>
//             <div className="mb-2 flex items-center justify-between">
//                 <p className="text-sm font-medium ">{title}</p>
//                 <div className="rounded-2xl bg-blue-50 p-2 text-blue-600">
//                     {icon}
//                 </div>
//             </div>
//             <h3 className="text-2xl font-bold">{value}</h3>
//         </div>
//     );
// };