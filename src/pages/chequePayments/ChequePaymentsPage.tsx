
import { FiFileText, FiMessageSquare, FiUser } from "react-icons/fi";
import { useGetAllPayableChequeQuery } from "../../redux/features/cheque/chequeApi";
import ChequeList, { type Cheque } from "./ChequeList";
import { ActivityIcon } from "lucide-react";

const ChequePaymentsPage = () => {
    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useGetAllPayableChequeQuery(undefined);

    const cheques: Cheque[] = data?.data ?? [];
    return (
        <section className="w-full space-y-5">
            {/* Page Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
                        Payable Cheques
                    </h1>
                </div>

                <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-2">
                    <p className="text-xs font-medium text-blue-600">
                        Total Cheques {cheques.length}
                    </p>

                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex min-h-40 items-center justify-center rounded-xl border border-gray-200 bg-white">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                        চেকের তথ্য লোড হচ্ছে...
                    </div>
                </div>
            )}

            {/* Error State */}
            {!isLoading && isError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                    <p className="font-semibold text-red-700">
                        চেকের তথ্য লোড করা যায়নি।
                    </p>
                    <p className="mt-1 text-sm text-red-600">
                        অনুগ্রহ করে আবার চেষ্টা করুন।
                    </p>

                    <button
                        type="button"
                        onClick={() => void refetch()}
                        className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                        আবার চেষ্টা করুন
                    </button>
                </div>
            )}

            {/* Cheque Table */}
            {!isLoading && !isError && (
                <div className="mb-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px] table-fixed text-left">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="w-[7%] px-4 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        #
                                    </th>

                                    <th className="w-[28%] px-4 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        <span className="flex items-center gap-2">
                                            <FiUser size={16} />
                                            Customer
                                        </span>
                                    </th>

                                    <th className="w-[30%] px-4 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        <span className="flex items-center gap-2">
                                            <FiFileText size={16} />
                                            Invoice
                                        </span>
                                    </th>

                                    <th className="w-[43%] px-4 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        <span className="flex items-center gap-2">
                                            <FiMessageSquare size={16} />
                                            Comments
                                        </span>
                                    </th>

                                    <th className="w-[36%] px-4 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        <span className="flex items-center justify-center gap-2">
                                            <ActivityIcon size={16} />
                                            Action
                                        </span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {cheques.length > 0 ? (
                                    cheques.map((cheque, index) => (
                                        <ChequeList
                                            key={
                                                cheque._id ??
                                                cheque.id ??
                                                `${cheque.invoice ?? "cheque"}-${index}`
                                            }
                                            head={'payable'}
                                            cheque={cheque}
                                            index={index + 1}
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-4 py-12 text-center"
                                        >
                                            <FiFileText
                                                size={32}
                                                className="mx-auto text-gray-300"
                                            />
                                            <p className="mt-3 text-sm font-medium text-gray-600">
                                                কোনো প্রাপ্য চেক পাওয়া যায়নি।
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    {cheques.length > 0 && (
                        <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                            <p className="text-sm text-gray-500">
                                মোট{" "}
                                <span className="font-semibold text-gray-800">
                                    {cheques.length}
                                </span>{" "}
                                টি চেক পাওয়া গেছে।
                            </p>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default ChequePaymentsPage;
