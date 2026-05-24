import { useEffect, useState } from "react";
import { useGetAllSectorsQuery, useGetAllTxnQuery } from "../../../redux/features/inExTxn/inExTxnApi";
import TableSkeleton from "../../../components/table/TableSkeleton";
import ErrorBoundary from "../../../components/ErrorBoundary";
import { format } from "date-fns";
import { LIMIT_OPTIONS } from "../../../utils/options";
import { useGetFieldWiseDataQuery } from "../../../redux/features/coutha/couthaApi";
import AddSectorModal from "./AddSectorModal";

const TxnSectorsPage = () => {
    const [sector, setSector] = useState('')
    const [sectorModalController, setSectorModalController] = useState(false)
    const [limit, setLimit] = useState(10)
    const [field, setField] = useState('')

    useEffect(() => {
        if (sector === 'গদি') setField('godi');
        else setField('');
    }, [sector]);

    const { data: fieldWiseData } = useGetFieldWiseDataQuery(field)
    const totalGodi = fieldWiseData?.data

    const { data: sectorData } = useGetAllSectorsQuery({});
    const sectors = sectorData?.data;
    const expenseSectors = sectors?.filter((sector: any) => sector.head === 'expense')
    const incomeSectors = sectors?.filter((sector: any) => sector.head === 'income')

    const { data, isLoading, isError } = useGetAllTxnQuery({ category: sector, limit })
    const transactions = data?.data?.data

    return (
        <div>
            <div className="flex justify-end m-2">
                <button onClick={() => setSectorModalController(true)} className="btn">Add sector</button>
            </div>
            <div className=" flex items-center justify-around mt-1">
                <label className="text-xs">আয়ের খাত</label>
                <label className="text-xs">ব্যয়ের খাত</label>

            </div>
            <section className="flex ">

                <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-1/2 select m-1"
                >
                    {incomeSectors?.map((opt: any) => (
                        <option key={opt.value} value={opt.value} className="border m-1 text-xs">
                            {opt.label}
                        </option>
                    ))}
                </select>

                <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-1/2 select m-1"
                >
                    {expenseSectors?.map((opt: any) => (
                        <option key={opt.value} value={opt.value} className="border m-1 text-xs">
                            {opt.label}
                        </option>
                    ))}
                </select>
            </section>

            <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="w-1/2 select m-2"
            >
                {
                    LIMIT_OPTIONS?.map((opt) => (
                        <option key={opt.value} value={opt.value} className="border m-1 text-xs">
                            {opt.label}
                        </option>
                    ))
                }
            </select>

            <section>
                <div className="relative  bg-white rounded-xl shadow overflow-hidden mb-40">
                    {/* Loading State */}
                    {isLoading && <TableSkeleton row={8} />}

                    {/* Error State */}
                    {isError && !isLoading && (
                        <ErrorBoundary message="Failed to load transactions. Please try again." />
                    )}

                    {/* Empty State */}
                    {!isLoading && !isError && transactions?.length === 0 && (
                        <div className="py-10 text-center text-gray-500 text-sm">
                            {sector} খাতে কোন লেনদেন হয়নি .
                        </div>
                    )}

                    {/* Data Table */}
                    {!isLoading && !isError && transactions?.length > 0 && (
                        <div className="overflow-x-auto h-[520px] ">
                            <table className="w-full text-xs">
                                <thead className="sticky top-0 bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Date</th>
                                        <th className="px-4 py-2 text-left">Category</th>
                                        <th className="px-4 py-2 text-right">Debit</th>
                                        <th className="px-4 py-2 text-right">Credit</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {transactions?.map((txn: any) => {
                                        return (
                                            <tr
                                                // onClick={() => handleSelectedTxn(tx._id)}
                                                key={txn._id}
                                                className="border-t hover:bg-gray-50 transition"
                                            >
                                                <td className="px-4 py-2">
                                                    {format(txn?.createdAt, "dd/MM/yyyy hh:mm a")}
                                                </td>

                                                <td className="px-4 py-2">
                                                    <p className="font-medium">
                                                        {txn.category || txn.referenceType}
                                                    </p>
                                                    <span className="text-xs text-gray-400">
                                                        {txn.referenceType}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-2 text-right text-red-600">
                                                    {txn.type === 'debit' ? `৳ ${txn.amount}` : "-"}
                                                </td>

                                                <td className="px-4 py-2 text-right text-green-600">
                                                    {
                                                        sector === 'গদি'
                                                            ? totalGodi
                                                            : (txn.type === 'credit' ? `৳ ${txn.amount}` : '-')
                                                    }
                                                </td>


                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* ================= Fixed Total ================= */}
                {/*   const totalDebit = transactions?.filter((txn: any) => (txn.type === 'debit'))?.reduce((sum: number, txn: { amount: number }) => sum + (txn.amount || 0), 0)
    const totalCredit =
        sector === 'গদি'
            ? (totalGodi ?? 0)
            : (transactions ?? [])
                .filter((txn: any) => txn.type === 'credit')
                .reduce((sum: number, txn: any) => sum + (txn.amount || 0), 0);


                 <div className="fixed bottom-[60px] left-0 w-full  px-3">
                    <div className="mx-auto  bg-[#e5efd5]   py-4 text-sm px-2">
                        <div className="grid  grid-cols-3 justify-between">
                            <span className="col-span-2 text-red-600 font-medium">
                                মোট
                            </span>
                            <div className='col-span-1 flex justify-between'>
                                <span className="font-semibold text-red-600">  ৳ {totalDebit}</span>
                                <span className="font-semibold text-green-600"> ৳ {totalCredit}</span>
                            </div>
                        </div>
                    </div>
                </div> */}
            </section>

            {
                sectorModalController && <AddSectorModal setSectorModalController={setSectorModalController} />
            }

        </div>
    );
};

export default TxnSectorsPage;