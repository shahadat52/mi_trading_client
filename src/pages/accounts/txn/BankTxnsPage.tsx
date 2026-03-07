import Loading from "../../../components/Loading";
import { useGetAllTransactionQuery } from "../../../redux/features/transaction/transactionApi";
import { formatDateTime } from "../../../utils/formatDateTime";

const BankTxnsPage = () => {
    const { data, isLoading, isError } = useGetAllTransactionQuery(undefined);
    const outstandingTxns = data?.data;
    console.log(outstandingTxns)
    return (
        <div className="grid lg:grid-cols-3  sm:grid-cols-1 gap-4 font-semibold p-2 mb-18">
            {
                isLoading ? <Loading /> : isError ? <div className="py-10 text-center text-gray-950 text-sm">
                    কোন লেনদেন হয়নি.
                </div> : outstandingTxns?.map((txn: any, idx: number) => (
                    <div key={idx} className="w-full max-w-sm rounded-md border border-gray-300 bg-white px-3 py-3 shadow-sm">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b pb-1">
                            <div>
                                <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-900">
                                    {idx + 1}) {txn?.bankName}
                                </h2>
                                <p className="text-[10px] text-gray-700">
                                    চেক পোস্টিং: {formatDateTime(txn?.postingDate).split(",").slice(0, 2).join(", ")}
                                </p>
                            </div>
                            <span className={`${txn.type === 'debit' ? "text-red-700 border-red-300 bg-red-50 " : "text-green-700 border-green-300 bg-green-50 "} rounded border  px-1.5 py-[1px] text-[10px] font-medium `}>
                                {txn.type}
                            </span>
                        </div>

                        {/* Customer Details */}
                        <div className="mt-2 space-y-0.5 text-xs text-gray-800">
                            <span className={`${txn.type === 'debit' ? "text-red-700 border-red-300 bg-red-50 " : "text-green-700 border-green-300 bg-green-50 "} rounded border  px-1.5 py-[1px] text-[10px] font-medium `}>
                                {txn.partyModel}
                            </span>
                            <p>
                                <span className="font-medium">নাম:</span> {txn?.party?.name}
                            </p>
                            <p>
                                <span className="font-medium"> ফোন নং:</span> {txn?.party?.phone}
                            </p>
                        </div>

                        {/* Amount & Transaction Type */}
                        <div className="mt-2 rounded border bg-gray-50 px-2 py-1.5 text-xs">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-800">পরিমাণ:  <span className={`font-semibold ${txn?.type === "credit" ? "text-green-700" : "text-red-700"}`}>
                                    ৳ {txn?.amount}
                                </span></span>

                            </div>
                            <p className="mt-0.5">
                                লেনদেন: <span className={`font-medium ${txn?.type === "credit" ? "text-green-700" : "text-red-700"}`}>
                                    {txn?.type === "credit" ? "জমা" : "প্রদান"}
                                </span>
                            </p>
                        </div>

                        {/* Note / Remarks */}
                        {txn?.note && (
                            <div className="mt-2 border-t pt-1 text-[10px] text-gray-600">
                                মন্তব্য: <span className="italic">{txn?.note}</span>
                            </div>
                        )}

                        {/* Footer Hint */}
                        <p className="mt-2 text-[10px] text-gray-400">
                            * চেক ইস্যু হয়েছে, ব্যাংকে এখনও ক্লিয়ার হয়নি।
                        </p>
                    </div>
                ))
            }

        </div >
    );
};

export default BankTxnsPage;