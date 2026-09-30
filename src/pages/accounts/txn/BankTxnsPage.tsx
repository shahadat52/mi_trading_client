import { useNavigate } from "react-router";
import { useGetAllBankTxnQuery } from "../../../redux/features/bankTransaction/bankTransactionApi";
import { useAppSelector } from "../../../redux/hook";

type Transaction = {
    _id: string;
    amount: number;
    type: "debit" | "credit";
    issueDate: string;
    postingDate: string;
    status: string;
};

type BankGroup = {
    bankName: string;
    allTransactions: Transaction[];
    totalDebit: number;
    totalCredit: number;
    currentBalance: number;
};



const BankTxnsPage = () => {
    const user = useAppSelector((state: any) => state?.auth?.auth?.user);
    const navigate = useNavigate()
    const { data } = useGetAllBankTxnQuery(undefined);
    const transactions = data?.data;
    return (
        <div className="p-6 mb-16">
            {

                transactions?.map(
                    (txn: BankGroup, idx: any) =>
                        <div
                            onClick={() => navigate(`/bank_wise/${txn.bankName}`)}
                            key={idx}
                            className="border border-gray-700 mb-2 rounded p-2"
                        >
                            <p className="font-bold">{txn.bankName} Bank</p>
                            {user?.role === "admin" && (
                                <p>
                                    Balance: {txn.currentBalance || 0}
                                </p>
                            )}
                        </div>
                )
            }        </div>
    );
};

export default BankTxnsPage;