
import { NavLink } from "react-router";
import type { TAccount } from "../../interfaces/account";
import { useGetAllAccountQuery } from "../../redux/features/account/accountApi";
import { useState } from "react";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import TransactionEntry from "./TransactionEntry";

const AccountTable = () => {
    const { data, isLoading, isError } = useGetAllAccountQuery(undefined)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState<TAccount | null>(null);

    const accounts = data?.data;
    return (
        <div className="grid grid-cols-1 gap-4 font-semibold">
            {
                isLoading ? <Loading /> : isError ? <div className="py-10 text-center text-gray-500 text-sm">
                    No account found.
                </div> : accounts?.map((account: TAccount) => (

                    <div key={account._id} className="flex justify-between items-center p-4 rounded bg-[#a4d1ec] shadow-sm shadow-[#4daeea] " >
                        <NavLink to={`/transaction/${account?._id}`}>
                            <h2>{account?.bankName}</h2>
                            <p className="">Account Number:{" "} <span className="text-[12px] ">{account?.accountNumber}</span></p>
                            <p>Account Name:{" "}<span className="text-[12px]">{account?.accountName}</span></p>
                            <p>Current Balance:{" "}******</p>
                        </NavLink>
                        <div>
                            <button
                                onClick={() => {
                                    setSelectedAccount(account);
                                    setIsOpen(true);
                                }}
                                className="btn btn-accent"
                            >
                                Make Transaction
                            </button>
                            {isOpen && selectedAccount && (
                                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                                    <TransactionEntry
                                        account={selectedAccount}
                                        onClose={() => setIsOpen(false)}
                                    />
                                </Modal>
                            )}
                        </div>

                    </div>
                ))
            }

        </div >
    );
};

export default AccountTable;