import { format } from "date-fns";

const CashInPage = ({ transactions }: any) => {
    return (
        <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Transactions</h2>
            <table className="w-full table-auto text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 text-gray-600 uppercase text-sm">
                        <th className="py-3 px-4 border-b">Date</th>
                        <th className="py-3 px-4 border-b">Description</th>
                        <th className="py-3 px-4 border-b">Type</th>
                        <th className="py-3 px-4 border-b text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions?.map((txn: any, idx: number) =>
                            <tr key={idx} className="hover:bg-gray-50 text-xs lg:text-sm  md:text-sm ">
                                <td className="py-3 px-4 border-b">
                                    {format(new Date(txn?.date), "hh:mm a")}
                                </td>
                                <td className="py-3 px-4 border-b">{txn?.source} <span className="text-xs">({txn?.note})</span></td>
                                <td className="py-3 px-4 border-b text-green-600">Cash In</td>
                                <td className="py-3 px-4 border-b text-right text-green-600"> {txn?.amount}</td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </section>
    );
};

export default CashInPage;