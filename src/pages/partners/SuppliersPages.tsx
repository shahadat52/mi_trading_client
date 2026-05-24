/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Modal from "../../components/Modal";
import { GrUpdate } from "react-icons/gr";
import { useDeleteSupplierMutation, useGetAllSuppliersQuery } from "../../redux/features/supplier/supplierApi";
import SupplierDataUpdateEntry from "./SupplierDataUpdateEntry";
import TableSkeleton from "../../components/table/TableSkeleton";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const SuppliersPage = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [id, setId] = useState('')

    const { data, isLoading, isError, error } = useGetAllSuppliersQuery({ type: 'regular' })
    const suppliers = data?.data;




    const [deleteSupplier] = useDeleteSupplierMutation();

    const handleDelete = async (id: string) => {
        const isConfirm = confirm("ডিলিট করেই দেবেন?")
        if (!isConfirm) {
            return
        }
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {

            const result = await deleteSupplier(id)
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
            {
                isLoading ? (<TableSkeleton row={5} />)
                    : isError ? (
                        <div className="p-4 text-red-600">{(error as any)?.data?.message || 'Error loading supplier'}</div>
                    ) : suppliers?.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">No suppliers found.</p>
                    ) : (
                        suppliers?.map((customer: any, idx: number) => (
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
                                        <button onClick={() => handleDelete(customer?._id)} className="text-4xl  text-red-600 ">
                                            <MdDelete />
                                        </button>
                                    </div>


                                </div>
                            </div>
                        ))
                    )
            }

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <SupplierDataUpdateEntry id={id} onClose={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
};

export default SuppliersPage;