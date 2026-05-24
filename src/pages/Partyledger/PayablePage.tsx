import { useNavigate } from "react-router";
import { useGetAllReceivableTxnQuery } from "../../redux/features/partyledger/partyLedgerApi";
import Loading from "../../components/Loading";



type Props = {
    searchTerm: string;
};



const PayablePage = ({ searchTerm }: Props) => {
    const { data: receivable, isLoading } = useGetAllReceivableTxnQuery({ search: searchTerm, type: '' })
    const payableData = receivable?.data
    const navigate = useNavigate()

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">দেনাদার তালিকা</h2>
                    <p className="text-sm text-slate-500">
                        যাদের কাছে টাকা পরিশোধ করতে হবে
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-100 text-left text-slate-600">
                        <tr>
                            <th className="px-4 py-3 font-semibold">নাম</th>
                            <th className="px-4 py-3 font-semibold">মোবাইল</th>
                            <th className="px-4 py-3 font-semibold">ঠিকানা</th>
                            <th className="px-4 py-3 font-semibold text-right">দেনা</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payableData?.length > 0 ? (
                            payableData?.map((item: any) => (
                                <tr
                                    onClick={() => navigate(`/supplierTxn/${item.party._id}`)}
                                    key={item.party._id}
                                    className="border-t border-slate-200 hover:bg-slate-50"
                                >

                                    <td className="px-4 py-3 text-slate-800">{item.party.name}</td>
                                    <td className="px-4 py-3 text-slate-600">{item.party.phone.split(',')[0]}</td>
                                    <td className="px-4 py-3 text-slate-600">{item.party.address}</td>
                                    <td className="px-4 py-3 text-right font-bold text-rose-600">
                                        ৳ {item.balance.toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-10 text-center text-slate-500"
                                >
                                    কোনো দেনাদার পাওয়া যায়নি
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PayablePage;