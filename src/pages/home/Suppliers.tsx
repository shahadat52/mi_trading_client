/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router";
import TableSkeleton from "../../components/table/TableSkeleton";
import { useGetAllSuppliersQuery } from "../../redux/features/supplier/supplierApi";
import { BsPersonCircle } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";

const Suppliers = () => {
    const { data, isLoading, isError, error } = useGetAllSuppliersQuery(undefined)
    const suppliers = data?.data;
    return (
        <div className="mb-10" >
            <div className=" rounded-2xl border border-white/20  bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] p-2 relative lg:hidden md:hidden sm:flex  items-center justify-between  rounded-t-4xl  mt-[-180px] ">
                <input
                    type="text"
                    placeholder="সাপ্লায়ার খুঁজুন..."
                    className=" input input-md max-w-[80%] bg-white ml-1 rounded-full mt-8  "
                />
                <p className="sticky ml-1 px-1 my-2 text-xl font-semibold">সাপ্লায়ার <span className="px-4">{suppliers?.length || 0}</span> জন</p>

                <div className="flex flex-col gap-4 mb-4">
                    {
                        isLoading ? (<TableSkeleton row={5} />)
                            : isError ? (
                                <div className="p-4 text-red-600">{(error as any)?.data?.message || 'Error loading supplier'}</div>
                            ) : suppliers?.length === 0 ? (
                                <p className="text-center text-gray-500 py-4">No suppliers found.</p>
                            ) : (
                                suppliers?.map((supplier: any, idx: number) => (
                                    <NavLink to={`/supplierTxn/${supplier._id}`} key={supplier._id} className='p-2 shadow m-1 rounded' >
                                        <div className="flex justify-between items-center">

                                            <div className="flex items-center">
                                                <div className="flex gap-1 items-center">
                                                    <p className="text-[20px] mr-3 text-orange-500">{idx + 1}</p>
                                                    <p className="text-[30px] mr-3 text-orange-500"><BsPersonCircle /></p>
                                                </div>
                                                <div>
                                                    <p className="text-[18px] font-semibold">{supplier?.name}</p>

                                                </div>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <p>সাপ্লাইয়ার</p>
                                                <span><FaChevronRight /></span>
                                            </div>
                                        </div>
                                    </NavLink>
                                ))
                            )
                    }
                </div>
            </div>


        </div>
    );
};

export default Suppliers;