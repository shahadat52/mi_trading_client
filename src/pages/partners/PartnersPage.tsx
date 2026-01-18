import { useState } from "react";
import CustomersPage from "./CustomersPage";
import SuppliersPages from "./SuppliersPages";

const PartnersPage = () => {
    const [action, setAction] = useState('customer')

    return (
        <div className="p-2">
            <div className="relative flex gap-6 border-b-2 border-gray-300">
                {/* Animated underline */}
                <span
                    className={`absolute bottom-0 left-0 h-[2px] w-[90px] bg-blue-600
      transition-transform duration-300 ease-in-out 
      ${action === 'customer' ? 'translate-x-0' : 'translate-x-[108px]'}
    `}
                />

                <button
                    onClick={() => setAction('customer')}
                    className={`px-1 py-2 text-sm font-medium uppercase
      transition-all duration-200 ease-out active:scale-[0.97]
      ${action === 'customer'
                            ? 'text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Customers
                </button>

                <button
                    onClick={() => setAction('supplier')}
                    className={`px-1 py-2 text-sm font-medium uppercase
      transition-all duration-200 ease-out active:scale-[0.97]
      ${action === 'supplier'
                            ? 'text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Suppliers
                </button>
            </div>

            {/* main contain */}
            <div>
                {
                    action === 'customer' ? <CustomersPage /> : <SuppliersPages />
                }
            </div>
        </div>
    );
};

export default PartnersPage;