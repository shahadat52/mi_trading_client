/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Modal from "../../components/Modal";
import { useDeleteCustomerMutation, useGetAllCustomersQuery } from "../../redux/features/customer/customerApi";
import CustomerDataUpdateEntry from "./CustomerDataUpdateEntry";
import TableSkeleton from "../../components/table/TableSkeleton";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FiSearch } from "react-icons/fi";
import { LIMIT_OPTIONS } from "../../utils/options";
import { useDebounce } from "../../utils/useDebounce";

const CustomersPage = () => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const [limit, setLimit] = useState(10)
    const [isOpen, setIsOpen] = useState(false)
    const [id, setId] = useState('')

    const { data, isLoading, isError, error } = useGetAllCustomersQuery({ searchTerm: useDebounce(searchTerm), limit })
    const customers = data?.data;



    const [deleteCustomer] = useDeleteCustomerMutation();

    const handleDelete = async (id: string) => {
        const isConfirm = confirm("ডিলিট করেই দেবেন?")
        if (!isConfirm) {
            return
        }
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {

            const result = await deleteCustomer(id)
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                navigate('/partners')
            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });
            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });

        } finally {
        }

    }

    return (
        <div>
            <div className="grid grid-cols-4 gap-2 mt-2">
                <div className="relative w-full col-span-3 ">
                    <FiSearch
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                    />
                    <input
                        type="text"
                        placeholder="নাম / মোবাইল দিয়ে খুঁজুন..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-2xl border border-slate-400 bg-white py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>
                <select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="w-full col-span-1 select rounded-xl ml-1"
                >
                    {LIMIT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-20">
                {
                    isLoading ? (<TableSkeleton row={5} />)
                        : isError ? (
                            <div className="p-4 text-red-600">{(error as any)?.data?.message || 'Error loading customers'}</div>
                        ) : customers?.length === 0 ? (
                            <p className="text-center text-gray-500 py-4">No customers found.</p>
                        ) : (
                            customers?.map((customer: any, idx: number) => (
                                <div key={customer?._id}>
                                    <div className="border-b-1 flex justify-between items-center p-2 " >
                                        <div className="font-semiBold ">
                                            <p className="">{idx + 1}) {" "} {customer?.name}</p>
                                            <p className="">{customer?.phone}</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => { setId(customer._id); setIsOpen(true) }}
                                                className="text-green-600 text-2xl font-bold" ><GrUpdate />
                                            </button>
                                            <div>
                                                <button onClick={() => handleDelete(customer?._id)} className="text-4xl  text-red-600 ">
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            ))
                        )
                }
            </div>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <CustomerDataUpdateEntry id={id} onClose={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
};

export default CustomersPage;