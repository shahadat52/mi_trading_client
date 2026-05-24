import { toast } from "react-toastify";
import { useState } from "react";
import { useCreateSectorMutation } from "../../../redux/features/inExTxn/inExTxnApi";

const AddSectorModal = ({ setSectorModalController }: any) => {
    const [category, setCategory] = useState('');
    const [head, setHead] = useState('');

    const [addSector] = useCreateSectorMutation();

    const handleAddSector = async ({ head, category }: { head: string, category: string }) => {
        const toastId = toast.loading("Updating...");

        try {
            const res = await addSector({ head, category, }).unwrap();
            toast.update(toastId, {
                render: res.message,
                type: "success",
                isLoading: false,
                autoClose: 1500,
            });

            setSectorModalController(false);

        } catch (err: any) {
            toast.update(toastId, {
                render: err?.data?.message || "Update failed!",
                type: "error",
                isLoading: false,
                autoClose: 1500,
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-xl w-[320px]">

                <h2 className="text-lg font-semibold mb-4">
                    Add Sector
                </h2>

                {/* Category Input */}
                <input
                    type="text"
                    placeholder="আয় বা ব্যয়ের খাতের নাম লিখুন"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border p-2 rounded mb-4 outline-none"
                />

                {/* Head Select */}

                <select
                    value={head}
                    onChange={(e) => setHead(e.target.value)}
                    className="w-full select m-2"
                >
                    {
                        ['Select Sector', 'expense', 'income']?.map((opt) => (
                            <option key={opt} value={opt} className="border m-1 text-xs">
                                {opt}
                            </option>
                        ))
                    }
                </select>


                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setSectorModalController(false)}
                        className="px-3 py-1 text-sm bg-gray-200 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => handleAddSector({ head, category })}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                    >
                        +ADD
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddSectorModal;