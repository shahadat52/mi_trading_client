/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Modal from "../../components/Modal";
import { useGetAllCustomersQuery } from "../../redux/features/customer/customerApi";
import CustomerDataUpdateEntry from "./CustomerDataUpdateEntry";
import TableSkeleton from "../../components/table/TableSkeleton";
import { GrUpdate } from "react-icons/gr";

const CustomersPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [id, setId] = useState('')

    const { data, isLoading, isError, error } = useGetAllCustomersQuery(undefined)
    const customers = data?.data;
    console.log(customers)
    return (
        <div>
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
                                    <div className=" font-bold ">{idx + 1}) {" "} {customer?.name} <span className="px-4">{customer?.phone}</span></div>
                                    <button
                                        onClick={() => { setId(customer._id); setIsOpen(true) }}
                                        className="text-green-600 text-2xl font-bold" ><GrUpdate /></button>
                                </div>
                            </div>
                        ))
                    )
            }

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <CustomerDataUpdateEntry id={id} onClose={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
};

export default CustomersPage;