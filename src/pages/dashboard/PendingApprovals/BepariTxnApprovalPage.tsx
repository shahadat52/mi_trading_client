import { format } from "date-fns";
import { useGetUnapprovedSupplierTxnQuery, useMakeApproveSupplierTxnMutation } from "../../../redux/features/supplierTxn/supplierTxnApi";;
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router";

const BepariTxnApprovalPage = () => {
    const navigate = useNavigate()
    const { data } = useGetUnapprovedSupplierTxnQuery(undefined);
    const supplierTxns = data?.data;

    const handleOpenMemo = (no: string) => {
        if (no.includes("MI(P)")) {
            navigate(`/invoice/${no}`)
        } else {
            return
        }
    };

    const [approveTxn] = useMakeApproveSupplierTxnMutation()
    const handleApprove = async (id: string) => {
        const isConfirm = confirm("আপনি কি নিশ্চিত! APPROVE করবেন?")
        if (!isConfirm) {
            return
        }
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await approveTxn(id)
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });

            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });
            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });


        } finally {
        }
    };

    return (
        <div>
            <div className="bg-white rounded-lg shadow w-full">
                <table className="w-full text-xm">
                    <thead className="bg-gray-100 text-gray-600 text-[10px] md:text-[12px] lg:text-[16px] uppercase font-semibold">
                        <tr>
                            <th className="px-1 py-1 text-center">Name</th>
                            <th className="px-1 py-1 text-center">Invoice</th>
                            <th className="px-1 py-1 text-center">Amount</th>
                            <th className="px-1 py-1 text-center">Date</th>
                            <th className="px-1 py-1 text-center">Type</th>
                            <th className="px-1 py-1 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {supplierTxns?.map((item: any, idx: number) => (
                            <tr
                                key={item._id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="px-1 py-1 border-r text-[10px] md:text-[12px] lg:text-[16px]">{idx + 1}) {item?.party?.name}</td>
                                <td
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenMemo(item?.description);
                                    }}
                                    className="px-1 py-1 border-r text-[10px] md:text-[12px] lg:text-[16px]">
                                    {item?.description}
                                </td>
                                <td className="px-1 py-1 text-right text-[10px] md:text-[12px] lg:text-[16px] border-r">
                                    ৳ {item.amount.toLocaleString()}
                                </td>
                                <td className="px-1 text-center py-1 border-r text-[10px] md:text-[12px] lg:text-[16px]">{format(new Date(item?.date), "dd/MM/yy")}</td>
                                <td className="px-1 py-1 text-center border-r text-[10px] md:text-[12px] lg:text-[16px]">
                                    {item?.type}
                                </td>
                                <td className="px-1 py-1 text-[10px] md:text-[12px] lg:text-[16px]">
                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() => handleApprove(item._id)}
                                            className="p-2 rounded bg-green-100 text-green-700 hover:bg-green-200"
                                            title="Approve"
                                        >
                                            <FaCheck />
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}

                        {supplierTxns?.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-8 text-center text-gray-400 border-t"
                                >
                                    No pending approvals found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default BepariTxnApprovalPage
