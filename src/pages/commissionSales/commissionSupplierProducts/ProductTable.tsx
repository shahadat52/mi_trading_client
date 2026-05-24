import { MdDelete } from "react-icons/md";

const ProductTable = ({ data, onDelete, onCoutha }: any) => {

    const heads = ["Product", "Lot", "Quantity", "Date", "Rate", "Action"];

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        {heads.map((h: string) => (
                            <th key={h} className="px-4 py-3 text-left">{h}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((item: any) => (
                        <tr key={item._id} className="border-t hover:bg-gray-50">

                            <td className="px-4 py-2">{item.name}</td>
                            <td className="px-4 py-2">{item.lot}</td>
                            <td className="px-4 py-2">{item.quantity}</td>

                            <td className="px-4 py-2">
                                {new Date(item.createdAt).toLocaleDateString("en-GB")}
                            </td>

                            <td className="px-4 py-2">{item.commissionRate}%</td>

                            <td className="px-4 py-2 flex gap-2">
                                <button
                                    onClick={() => onCoutha(item)}
                                    className="bg-blue-600 text-white text-xs px-2 py-1 rounded"
                                >
                                    চৌথা
                                </button>

                                <button
                                    onClick={() => onDelete(item._id)}
                                    className="text-red-600 text-lg"
                                >
                                    <MdDelete />
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;