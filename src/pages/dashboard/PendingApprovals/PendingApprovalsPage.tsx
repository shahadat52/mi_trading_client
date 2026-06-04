import { useState } from "react";
import CustomerTxnApprovalPage from "./CustomerTxnApprovalPage";
import SupplierTxnApprovalPage from "./SupplierTxnApprovalPage";

type ApprovalType = "customer" | "supplier";




const PendingApprovalsPage = () => {
  const [activeTab, setActiveTab] = useState<ApprovalType>("customer");

  return (
    <div className="p-1 space-y-6 ">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Pending Approvals</h1>
        <p className="text-sm text-gray-500">
          Verify and approve customer and supplier transactions
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 border-b">
        {["customer", "supplier"].map((tab) => (
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

      {
        activeTab === 'customer' && <CustomerTxnApprovalPage />
      }

      {
        activeTab === 'supplier' && <SupplierTxnApprovalPage />
      }

    </div>
  );
};

export default PendingApprovalsPage;
