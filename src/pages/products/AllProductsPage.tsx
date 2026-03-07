import { useState } from 'react';
import NormalProductPage from './NormalProductPage';
import CommissionProdPage from './CommissionProdPage';

type ApprovalType = 'normal' | 'commission';
const AllProductsPage = () => {
    const [activeTab, setActiveTab] = useState<'normal' | 'commission'>('normal');
    return (
        <div className='mb-12'>
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

            <div className=''>
                {
                    activeTab === 'normal' ? <NormalProductPage /> : <CommissionProdPage />
                }
            </div>
        </div>
    );
};

export default AllProductsPage;