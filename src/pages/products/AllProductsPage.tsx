import { useState } from 'react';
import NormalProductPage from './NormalProductPage';
import CommissionProdPage from './CommissionProdPage';

type ApprovalType = 'normal' | 'commission';
const AllProductsPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState<'normal' | 'commission'>('normal');
    return (
        <div className='mb-12'>
            <input
                type="text"
                placeholder="নাম/SKU/সাপ্লাইয়ার দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-2 ml-2  w-[95%] rounded-2xl border border-slate-400 bg-white py-3 pl-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <div className=" flex gap-3 border-b">
                {["normal", "commission"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as ApprovalType)}
                        className={`px-1 py-2 text-sm font-medium border-b-2 transition
              ${activeTab === tab
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className='mb-16'>
                {
                    activeTab === 'normal' ? <NormalProductPage searchTerm={searchTerm} /> : <CommissionProdPage searchTerm={searchTerm} />
                }
            </div>
        </div>
    );
};

export default AllProductsPage;