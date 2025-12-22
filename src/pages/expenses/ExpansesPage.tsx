import { useState } from "react";
import Modal from "../../components/Modal";
import ExpenseEntry from "./ExpenseEntry";
import ExpensesTable from "./ExpensesTable";

const Expanses = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className="p-6">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    ➕ ব্যয় এন্ট্রি করুন
                </button>

                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <ExpenseEntry onClose={() => setIsOpen(false)} />
                </Modal>
            </div>

            <ExpensesTable />

        </div>
    );
};

export default Expanses;