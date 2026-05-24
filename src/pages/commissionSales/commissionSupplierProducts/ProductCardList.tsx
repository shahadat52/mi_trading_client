import { MdDelete } from "react-icons/md";

const ProductCardList = ({ data, onDelete, onCoutha }: any) => {
    return (
        <div className="space-y-4">
            {data.map((item: any) => (
                <div key={item._id} className="border rounded-lg p-3 bg-gray-50 shadow-sm">

                    <div className="flex justify-between">
                        <h3 className="font-semibold">{item.name}</h3>
                        <button onClick={() => onDelete(item._id)}>
                            <MdDelete className="text-red-600 text-xl" />
                        </button>
                    </div>

                    <p>Qty: {item.quantity} {item.unit}</p>
                    <p>Lot: {item.lot}</p>
                    <p>Rate: {item.commissionRate}%</p>

                    <p className="text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString("en-GB")}
                    </p>

                    <div className="flex justify-end mt-2">
                        <button
                            onClick={() => onCoutha(item)}
                            className="bg-blue-600 text-white text-xs px-3 py-1 rounded"
                        >
                            চৌথা করুন
                        </button>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default ProductCardList;