/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsPersonCircle } from 'react-icons/bs';
import { IoPersonAddSharp } from 'react-icons/io5';
import { NavLink } from 'react-router';
import { useGetAllCustomersQuery } from '../../redux/features/customer/customerApi';
import { useDebounce } from '../../utils/useDebounce';
import { FaChevronRight } from 'react-icons/fa6';
import { useState } from 'react';
import Modal from '../../components/Modal';
import AddCustomer from './AddCustomer';
import TableSkeleton from '../../components/table/TableSkeleton';

const Customers = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const debounceSearch = useDebounce(search.trim(), 1000);
    const { data, isLoading, isError, error } = useGetAllCustomersQuery({ search: debounceSearch });
    const customers = data?.data || [];

    return (
        <div className=" ">
            <div className=" rounded-2xl border border-white/20  bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] p-2 relative lg:hidden md:hidden sm:flex  items-center justify-between  rounded-t-4xl  mt-[-180px]  ">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="কাস্টমার খুঁজুন..."
                    className=" input input-md max-w-[80%] bg-white ml-1 rounded-full mt-8  "
                />
                <p className="sticky ml-1 px-1 mt-2 text-xl font-semibold">কাস্টমার <span className="px-4">{customers?.length}</span> জন</p>
                <div className="">

                    <div className="flex items-center justify-end w-full">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="  text-4xl flex  px-4 rounded"
                        >
                            <p className="   bg-red-600 text-white   rounded-full w-auto p-3"> <IoPersonAddSharp /></p>
                        </button>
                    </div>


                </div>
                <div>
                    <p>Customers: {customers?.length}</p>
                </div>
                <div className="flex flex-col gap-4 mb-18">

                    {isLoading ? (<TableSkeleton row={5} />)
                        : isError ? (
                            <div className="p-4 text-red-600">{(error as any)?.data?.message || 'Error loading customers'}</div>
                        ) : customers?.length === 0 ? (
                            <p className="text-center text-gray-500 py-4">No customers found.</p>
                        ) : (
                            customers?.map((customer: any, idx: number) => (
                                <NavLink to={`/customerTxn/${customer._id}`} key={customer._id} className="p-2 shadow m-1 rounded">
                                    <div className="flex justify-between items-center">

                                        <div className="flex items-center">
                                            <div className="flex gap-1 items-center">
                                                <p className="text-[20px] mr-3 text-orange-500">{idx + 1}</p>
                                                <p className="text-[30px] mr-3 text-orange-500"><BsPersonCircle /></p>
                                            </div>
                                            <div>
                                                <p className="text-[18px] font-semibold">{customer.name}</p>

                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <p>কাস্টমার</p>
                                            <span><FaChevronRight /></span>
                                        </div>
                                    </div>
                                </NavLink>
                            )))
                    }
                </div>

            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <AddCustomer onClose={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
};

export default Customers;