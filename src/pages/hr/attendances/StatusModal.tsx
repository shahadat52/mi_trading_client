import { format } from "date-fns";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUpdateAttendanceStatusMutation } from "../../../redux/features/attendance/attendanceApi";
import { STATUS_OPTIONS } from "../../../utils/options";

interface StatusModalProps {
    activeDate: {
        _id: string;
        date: string;
    };
    setActiveDate: React.Dispatch<React.SetStateAction<any>>;
    refetch: () => void;
}

export type AttendanceStatus =
    | "present"
    | "absent"
    | "unpaid_leave"
    | "paid_leave";


const StatusModal = ({
    activeDate,
    setActiveDate,
    refetch,
}: StatusModalProps) => {
    const [loading, setLoading] = useState(false);
    const [score, setScore] = useState<number>(0);
    const [status, setStatus] = useState<AttendanceStatus | "">("");

    const [updateStatus] = useUpdateAttendanceStatusMutation();

    const handleUpdate = async () => {
        if (!status) {
            toast.error("Please select a status.");
            return;
        }

        const toastId = toast.loading("Updating attendance...");

        try {
            setLoading(true);

            await updateStatus({
                id: activeDate._id,
                date: activeDate.date,
                score,
                status,
            }).unwrap();

            toast.update(toastId, {
                render: "Attendance updated successfully.",
                type: "success",
                isLoading: false,
                autoClose: 1500,
            });

            setActiveDate(null);
            refetch();
        } catch (error: any) {
            toast.update(toastId, {
                render:
                    error?.data?.message ||
                    error?.error?.data?.message ||
                    "Failed to update attendance.",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-slate-800">
                        Update Attendance Status
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        {format(new Date(activeDate.date), "dd MMM yyyy")}
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Performance Score
                        </label>

                        <div className="flex items-center gap-2">
                            {[1, 2, 3].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setScore(star)}
                                    className="transition-transform hover:scale-110"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill={score >= star ? "currentColor" : "none"}
                                        stroke="currentColor"
                                        className={`h-8 w-8 ${score >= star
                                            ? "text-yellow-500"
                                            : "text-slate-300"
                                            }`}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.364 1.118l1.519 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.077 10.1c-.784-.57-.38-1.81.588-1.81H7.58a1 1 0 00.95-.69l1.519-4.674z"
                                        />
                                    </svg>
                                </button>
                            ))}

                            <button
                                type="button"
                                onClick={() => setScore(0)}
                                className="text-sm text-red-500 hover:text-red-700"
                            >
                                Clear
                            </button>
                        </div>

                        {score > 0 && (
                            <p className="mt-2 text-sm text-slate-500">
                                Selected Score: {score} Star{score > 1 ? "s" : ""}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Attendance Status
                        </label>

                        <div className="space-y-2">
                            {STATUS_OPTIONS.map((item) => (
                                <button
                                    key={item.value}
                                    type="button"
                                    onClick={() => setStatus(item.value)}
                                    className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200
                                    
                                    ${status === item.value
                                            ? "border-primary bg-primary/10 text-primary"
                                            : `border-slate-200 bg-slate-50 text-slate-700 ${item.color}`
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <button
                        type="button"
                        onClick={() => setActiveDate(null)}
                        disabled={loading}
                        className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleUpdate}
                        disabled={loading || !status}
                        className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatusModal;