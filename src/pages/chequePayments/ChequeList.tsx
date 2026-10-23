
import type { FC } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { useUpdatePurchaseNoteMutation } from "../../redux/features/purchase/purchaseApi";
import { useUpdateSalesCommentsMutation } from "../../redux/features/product/productApi";

export interface Customer {
    name?: string;
    address?: string;
}

export interface Cheque {
    _id?: string;
    id?: string;
    customer?: Customer | null;
    supplier?: Customer | null;
    invoice?: string;
    comments?: string;
    note?: string;
}

interface ChequeListProps {
    head: string
    cheque: Cheque;
    index: number;
}

const ChequeList: FC<ChequeListProps> = ({ head, cheque, index, }) => {
    const customerName = cheque.customer?.name?.trim() || cheque.supplier?.name?.trim() || "Unknown";
    const customerAddress = cheque.customer?.address?.trim() || cheque.supplier?.address?.trim();
    const invoice = cheque.invoice?.trim() || "N/A";
    const comments = cheque.comments?.trim() || cheque.note?.trim() || "কোনো মন্তব্য নেই";

    const note = comments
        .split(":")
        .map((item) => item.trim())
        .find((item) => /^\d{2}\/\d{2}\/\d{4}$/.test(item));

    let isFutureDate = false;

    if (note) {
        const [day, month, year] = note.split("/").map(Number);

        // dd/mm/yy → Date
        const fullYear = year;

        const givenDate = new Date(fullYear, month - 1, day);
        const today = new Date();

        // সময় বাদ দিয়ে শুধু তারিখ তুলনা
        today.setHours(0, 0, 0, 0);

        // অবৈধ তারিখ যাচাই
        const isValidDate =
            givenDate.getFullYear() === fullYear &&
            givenDate.getMonth() === month - 1 &&
            givenDate.getDate() === day;

        isFutureDate = isValidDate && givenDate < today;
    }
    const [updateNote] = useUpdatePurchaseNoteMutation()
    const handleUpdateNote = async (data: any) => {
        const isConfirm = confirm("পরিশোধ হয়ে থাকলে OK চাপুন?")

        if (!isConfirm) {
            return
        }
        await updateNote(data)
    }

    const [updateComments] = useUpdateSalesCommentsMutation()
    const handleUpdateComments = async (data: any) => {
        const isConfirm = confirm("পরিশোধ হয়ে থাকলে OK চাপুন?")

        if (!isConfirm) {
            return
        }
        await updateComments(data)
    }

    return (
        <tr className={`align-top transition-colors hover:bg-blue-50/40 ${isFutureDate ? 'text-red-600' : ''}`}>
            {/* Serial Number */}
            <td className="border-b border-gray-100 px-4 py-1 text-xs ">
                {index}
            </td>

            {/* Customer Details */}
            <td className="border-b border-gray-100 px-4 py-1">
                <p className="break-words text-xs font-semibold ">
                    {customerName}
                </p>

                {customerAddress && (
                    <p className="mt-1 break-words text-xs  ">
                        {customerAddress}
                    </p>
                )}
            </td>

            {/* Invoice Number */}
            <td className="border-b border-gray-100 px-4 py-1">
                <span className="inline-block max-w-full break-all rounded-md bg-indigo-50 px-2.5 py-1.5 text-xs font-medium ">
                    {invoice}
                </span>
            </td>

            {/* Comments */}
            <td className="border-b border-gray-100 px-4 py-1">
                <div className="min-w-0">
                    <div className="tooltip tooltip-bottom " data-tip={comments}>
                        <button className="">{comments.slice(0, 30)}</button>
                    </div>
                </div>
            </td>
            <td className="border-b border-gray-100 px-4 py-1">
                {
                    head === 'receivable' ? <div onClick={() => handleUpdateComments(comments)} className="text-green-600 flex justify-center  font-bold text-xl min-w-0 pointer-coarse: ">
                        <FaCheckSquare /> S
                    </div> :
                        <div onClick={() => handleUpdateNote(comments)} className="text-green-600 flex justify-center  font-bold text-xl min-w-0 pointer-coarse: ">
                            <FaCheckSquare /> P
                        </div>
                }
            </td>
        </tr>
    );
};

export default ChequeList;
