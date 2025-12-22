import { useState } from "react";
import Modal from "../../components/Modal";
import AccountEntry from "./AccountEntry";
import AccountTable from "./AccountTable";

const AccountsPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <div className="p-6">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    ➕ নতুন একাউন্ট যোগ করুন
                </button>

                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <AccountEntry onClose={() => setIsOpen(false)} />
                </Modal>
            </div>
            <AccountTable />
        </div>
    );
};

export default AccountsPage;