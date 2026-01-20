/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Modal from "../../components/Modal";
import { GrUpdate } from "react-icons/gr";
import { useGetAllSuppliersQuery } from "../../redux/features/supplier/supplierApi";
import SupplierDataUpdateEntry from "./SupplierDataUpdateEntry";
import TableSkeleton from "../../components/table/TableSkeleton";

const SuppliersPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [id, setId] = useState('')

    const { data, isLoading, isError, error } = useGetAllSuppliersQuery(undefined)
    const suppliers = data?.data;
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
                                    <div className=" font-bold ">{idx + 1}) {" "} {customer?.name} <span className="px-4">{customer?.phone}</span></div>
                                    <button
                                        onClick={() => { setId(customer._id); setIsOpen(true) }}
                                        className="text-green-700 text-2xl font-bold" ><GrUpdate /></button>
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