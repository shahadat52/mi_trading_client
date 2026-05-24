import { useNavigate } from "react-router";
import { useGetAllReceivableTxnQuery } from "../../redux/features/partyledger/partyLedgerApi";
import Loading from "../../components/Loading";
import { useState } from "react";
import { CATEGORY_OPTIONS, LIMIT_OPTIONS } from "../../utils/options";



type Props = {
    searchTerm: string;
};

const Customers = ({ searchTerm }: Props) => {
    const [limit, setLimit] = useState(10)
    const [category, setCategory] = useState('')

    const { data, isLoading } = useGetAllReceivableTxnQuery({ search: searchTerm, limit: limit, category: category });
    const receivableData = data?.data;
    const navigate = useNavigate()

    if (isLoading) {
        return <div className="min-h-screen">
            <Loading />
        </div>
    }
    return (
        <div>
            <div className="mb-4 ">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">দেনাদারদের তালিকা</h2>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full select rounded-xl"
                        >
                            {CATEGORY_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className=''>
                        <select
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="w-full select rounded-xl ml-1"
                        >
                            {LIMIT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-full text-sm">
                    <thead className=" bg-slate-100 text-left text-slate-600">
                        <tr >
                            <th className="px-4 py-3 font-semibold">নাম</th>
                            <th className="px-4 py-3 font-semibold text-right">পাওনা</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receivableData?.length > 0 ? (
                            receivableData?.map((item: any, idx: number) => (
                                <tr
                                    onClick={() => navigate(`/customerTxn/${item.party._id}`)}
                                    key={idx}
                                    className="border-t border-slate-200 hover:bg-slate-50"
                                >

                                    <td className=" px-4 py-3 text-slate-800"><p>{idx + 1}) {item.party.name}</p> <p>{item?.party?.phone?.split(',')[0]}</p></td>
                                    <td className="px-4 py-3 text-right font-bold text-emerald-600">
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
                                    কোনো পাওনাদার পাওয়া যায়নি
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Customers;