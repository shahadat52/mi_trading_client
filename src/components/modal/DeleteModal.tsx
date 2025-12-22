import type { TAddProduct } from "../../interfaces/products";

const DeleteModal = ({
    open,
    onClose,
    onConfirm,
    item,
}: {
    open: boolean;
    onClose: () => void;
    onConfirm: (id: string) => void;
    item: TAddProduct;
}) => {

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                <h2 className="text-lg font-semibold text-gray-800">
                    Confirm Delete
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                    Are you sure you want to delete
                    <span className="font-bold text-red-600"> {item?.name}</span>?
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-md hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onConfirm(item._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;