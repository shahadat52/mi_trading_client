import { toast } from "react-toastify";
import { useUpdateBasicSalaryMutation } from "../../../redux/features/attendance/attendanceApi";


const BasicSalaryUpdateModal = ({ id, basicSalary, setBasicSalary, setIsBasicModalOpen }: any) => {
    const [updateBasicSalary] = useUpdateBasicSalaryMutation();

    const handleSalaryBasicUpdate = async ({ id, basicSalary }: any) => {
        const toastId = toast.loading("Updating...");

        try {
            const res = await updateBasicSalary({ id, basicSalary, }).unwrap();

            toast.update(toastId, {
                render: res.message,
                type: "success",
                isLoading: false,
                autoClose: 1500,
            });

        } catch (err: any) {
            toast.update(toastId, {
                render: err?.data?.message || "Update failed!",
                type: "error",
                isLoading: false,
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-xl w-[320px]">

                <h2 className="text-lg font-semibold mb-3">
                    Update Basic Salary
                </h2>

                <input
                    type="number"
                    value={basicSalary}
                    onChange={(e) =>
                        setBasicSalary(Number(e.target.value))
                    }
                    className="w-full border p-2 rounded mb-4"
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() =>
                            setIsBasicModalOpen(false)
                        }
                        className="px-3 py-1 text-sm bg-gray-200 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => handleSalaryBasicUpdate({ id, basicSalary })}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BasicSalaryUpdateModal;