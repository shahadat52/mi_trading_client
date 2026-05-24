// import { useMemo, useState } from 'react';
// import { FiSearch } from 'react-icons/fi';
// import { FaWallet } from 'react-icons/fa';
// import PayablePage from './PayablePage';
// import { useGetAllPayableTxnQuery, useGetAllReceivableTxnQuery } from '../../redux/features/partyledger/partyLedgerApi';
// import ReceivablePage from './ReceivablePage';
// import Loading from '../../components/Loading';

// type PartyType = 'Receivable' | 'Payable';

// const tabs: { value: PartyType; label: string }[] = [
//     { value: 'Receivable', label: 'পাওনাদার' },
//     { value: 'Payable', label: 'দেনাদার' },
// ];

// const PartyLedgerPage = () => {
//     const [activeTab, setActiveTab] = useState<PartyType>('Receivable');
//     const [searchTerm, setSearchTerm] = useState('');

//     const { data } = useGetAllPayableTxnQuery({ search: '' });
//     const receivableData = data?.data;

//     const { data: receivable, isLoading } = useGetAllReceivableTxnQuery({ search: '', type: '' })
//     const payableData = receivable?.data



//     const calculateTotal = (data: any[] = []) =>
//         data.reduce((total, item) => total + Number(item.balance || 0), 0);

//     const receivableTotalAmount = calculateTotal(receivableData);
//     const payableTotalAmount = calculateTotal(payableData);

//     const summaryData = {
//         receivable: {
//             totalParty: receivableData?.length,
//             totalAmount: receivableTotalAmount,
//         },
//         payable: {
//             totalParty: payableData?.length,
//             totalAmount: payableTotalAmount,
//         },
//     };

//     const currentSummary = useMemo(() => {
//         return activeTab === 'Receivable'
//             ? summaryData.receivable
//             : summaryData.payable;
//     }, [activeTab]);

//     if (isLoading) {
//         return <Loading />
//     }
//     return (
//         <div className="min-h-screen bg-slate-50 p-3 md:p-6">
//             {/* Header */}
//             <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//                 <div>
//                     <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
//                         পাওনাদার ও দেনাদারদের হিসাব
//                     </h1>
//                 </div>

//                 {/* Search */}
//                 <div className="relative w-full md:w-[320px]">
//                     <FiSearch
//                         size={18}
//                         className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                     />
//                     <input
//                         type="text"
//                         placeholder="নাম / মোবাইল দিয়ে খুঁজুন..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     />
//                 </div>
//             </div>

//             {/* Summary Cards */}
//             <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
//                 <SummaryCard
//                     title={activeTab === 'Receivable' ? 'মোট পাওনা' : 'মোট দেনা'}
//                     value={`৳ ${currentSummary?.totalAmount}`}
//                     icon={<FaWallet size={20} />}
//                 />
//             </div>

//             {/* Main Card */}
//             <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
//                 {/* Tabs */}
//                 <div className="border-b border-slate-200 px-3 pt-3 md:px-6 md:pt-4">
//                     <div className="flex w-full gap-2 rounded-2xl bg-slate-100 p-1">
//                         {tabs.map((tab) => {
//                             const isActive = activeTab === tab.value;
//                             const count =
//                                 tab.value === 'Receivable'
//                                     ? summaryData.receivable.totalParty
//                                     : summaryData.payable.totalParty;

//                             return (
//                                 <button
//                                     key={tab.value}
//                                     onClick={() => setActiveTab(tab.value)}
//                                     className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 md:text-base
//                                     ${isActive
//                                             ? 'bg-white text-blue-600 shadow-sm'
//                                             : 'text-slate-500 hover:text-slate-700'
//                                         }`}
//                                 >
//                                     <span>{tab.label}</span>
//                                     <span
//                                         className={`rounded-full px-2.5 py-0.5 text-xs font-bold
//                                         ${isActive
//                                                 ? 'bg-blue-100 text-blue-700'
//                                                 : 'bg-slate-200 text-slate-600'
//                                             }`}
//                                     >
//                                         {count}
//                                     </span>
//                                 </button>
//                             );
//                         })}
//                     </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-3 md:p-6">
//                     {activeTab === 'Receivable' ? (
//                         <ReceivablePage searchTerm={searchTerm} />
//                     ) : (
//                         <PayablePage searchTerm={searchTerm} />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PartyLedgerPage;

// /* -----------------------------
//    Reusable Summary Card
// ------------------------------ */
// type SummaryCardProps = {
//     title: string;
//     value: string;
//     icon: React.ReactNode;
// };

// const SummaryCard = ({ title, value, icon }: SummaryCardProps) => {
//     return (
//         <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
//             <div className="mb-2 flex items-center justify-between">
//                 <p className="text-sm font-medium text-slate-500">{title}</p>
//                 <div className="rounded-2xl bg-blue-50 p-2 text-blue-600">{icon}</div>
//             </div>
//             <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
//         </div>
//     );
// };