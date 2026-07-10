/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from 'react-router';
import TableSkeleton from '../../components/table/TableSkeleton';
import { useGetAllBrokersQuery } from '../../redux/features/broker/brokerApi';
import { BsPersonCircle } from 'react-icons/bs';
import { FaChevronRight } from 'react-icons/fa6';
import { useState } from 'react';
import { AddBrokerModal } from './AddBrokerModal';
import { LIMIT_OPTIONS } from '../../utils/options';

const BrokersPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [limit, setLimit] = useState(10)
    const [addBrokerController, setAddBrokerController] = useState(false)
    const { data, isLoading, error, isError } = useGetAllBrokersQuery({ limit, searchTerm });
    const brokers = data?.data || [];
    return (
        <div>
            <div className='flex justify-between'>
                <div className="m-2">
                    <input
                        type="text"
                        placeholder="নাম/নাম্বার দিয়ে খুজুন..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded border border-slate-200 bg-white py-2 h-10 pl-3 pr-8  text-xs outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>
                <select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="w-1/2 select m-2"
                >
                    {
                        LIMIT_OPTIONS?.map((opt) => (
                            <option key={opt.value} value={opt.value} className="border m-1 text-xs">
                                {opt.label}
                            </option>
                        ))
                    }
                </select>

            </div>
            <div className='flex justify-end mr-2'>
                <button
                    onClick={() => setAddBrokerController(true)}
                    className="inline-flex text-xs h-10 px-4 items-center justify-center rounded-md bg-neutral-950 font-medium text-neutral-50 transition active:scale-110 ">
                    নতুন ব্রোকার
                </button>
            </div>
            <div className="flex flex-col gap-4 mb-18">

                {isLoading ? (<TableSkeleton row={5} />)
                    : isError ? (
                        <div className="p-4 text-red-600">{(error as any)?.data?.message || 'Error loading customers'}</div>
                    ) : brokers?.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">No brokers found.</p>
                    ) : (
                        brokers?.map((broker: any, idx: number) => (
                            <NavLink to={`/brokerTxn/${broker._id}`} key={broker._id} className="p-2 shadow m-1 rounded">
                                <div className="flex justify-between items-center">

                                    <div className="flex items-center">
                                        <div className="flex gap-1 items-center">
                                            <p className="text-[20px] mr-3 text-blue-600">{idx + 1}</p>
                                            <p className="text-[30px] mr-3 text-blue-700"><BsPersonCircle /></p>
                                        </div>
                                        <div>
                                            <p className="text-[18px] font-semibold">{broker?.name}</p>

                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <span><FaChevronRight /></span>
                                    </div>
                                </div>
                            </NavLink>
                        )))
                }
            </div>

            {
                addBrokerController && <AddBrokerModal setAddBrokerController={setAddBrokerController} />
            }
        </div>
    );
};

export default BrokersPage;