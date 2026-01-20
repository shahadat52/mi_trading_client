/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router";
import TableSkeleton from "../../components/table/TableSkeleton";
import { useGetAllSuppliersQuery } from "../../redux/features/supplier/supplierApi";

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

                <div className="overflow-y-auto mb-8">
                    {
                        isLoading ? (<TableSkeleton row={5} />)
                            : isError ? (
                                <div className="p-4 text-red-600">{(error as any)?.data?.message || 'Error loading supplier'}</div>
                            ) : suppliers?.length === 0 ? (
                                <p className="text-center text-gray-500 py-4">No suppliers found.</p>
                            ) : (
                                suppliers?.map((supplier: any, idx: number) => (
                                    <NavLink to={`/supplierTxn/${supplier._id}`} key={supplier._id} className='mb-50' >
                                        <div className="border-b-1 flex justify-between items-center p-2 " >
                                            <div className=" font-bold ">{idx + 1}) {" "} {supplier?.name} <span className="px-4">{supplier?.phone}</span></div>
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