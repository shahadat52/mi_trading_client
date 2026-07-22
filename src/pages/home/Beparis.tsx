import { useNavigate } from "react-router";
import { useGetAllPayableTxnQuery } from "../../redux/features/partyledger/partyLedgerApi";
import Loading from "../../components/Loading";
import { useState } from "react";
import { useGetTotalPayableToSupplierQuery } from "../../redux/features/supplierTxn/supplierTxnApi";
import { customRound } from "../../utils/customRound";

type Props = {
    searchTerm: string;
};

const Beparis = ({ searchTerm }: Props) => {
    const [limit, setLimit] = useState(10)
    const { data: payable, isLoading } = useGetAllPayableTxnQuery({ search: searchTerm, type: 'commission', limit })
    const payableData = payable?.data

    const { data: total } = useGetTotalPayableToSupplierQuery({ supplierType: 'commission' })
    const navigate = useNavigate()
    const totalPayable = total?.data
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <div className="mb-4 ">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">↗️দেনা: {customRound(totalPayable?.totalPayable).toLocaleString() || 0} ৳</h2>
                    <div className=''>
                        <select
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="w-full select rounded-xl ml-1"
                        >
                            <option value={10}>Limit</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={1000}>all</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-100 text-left text-slate-600">
                        <tr>
                            <th className="px-4 py-3 font-semibold">নাম</th>
                            <th className="px-4 py-3 font-semibold text-right">দেনা</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payableData?.length > 0 ? (
                            payableData?.map((item: any, idx: number) => (
                                <tr
                                    onClick={() => navigate(`/supplierTxn/${item.party._id}`)}
                                    key={item.party._id}
                                    className="border-t border-slate-200 hover:bg-slate-50"
                                >

                                    <td className=" px-4 py-3 text-slate-800"><p>{idx + 1}) {item.party.name}</p> <p>{item.party.phone.split(',')[0]}</p></td>
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

export default Beparis;