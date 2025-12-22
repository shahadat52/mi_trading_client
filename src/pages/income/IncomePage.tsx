import { useState } from "react";
import Modal from "../../components/Modal";
import IncomeEntry from "./IncomeEntry";
import IncomeTable from "./IncomeTable";


const IncomePage = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <div>
                <div className="p-6">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        ➕ আয় এন্ট্রি করুন
                    </button>

                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <IncomeEntry onClose={() => setIsOpen(false)} />
                    </Modal>
                </div>

                <IncomeTable />

            </div>


        </div>
    );
};

export default IncomePage;