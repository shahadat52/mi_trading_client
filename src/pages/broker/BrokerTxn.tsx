/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { useBrokerDeleteMutation, useBrokerTxnEntryMutation, useGetBrokerByIdQuery } from "../../redux/features/broker/brokerApi";
import SelectField from "../../components/form/SelectField";
import { customerTxnType } from "../../utils/transactionType";
import InputField from "../../components/form/InputFields";
import { useAppSelector } from "../../redux/hook";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import BrokerTxnTable from "./BrokerTxnTable";
import Modal from "../../components/Modal";
import EditBroker from "./EditBroker";
import { BROKERY_PAYMENT_METHOD_OPTIONS } from "../../utils/options";
import Profile from "../../components/profile/Profile";
import { AiOutlineDownload } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

const BrokerTxn = () => {
    const [makeTxn, setMakeTxn] = useState(false)
    // const [startDate, setStartDate] = useState<string>(format(startOfDay(new Date()), "yyyy-MM-dd"));
    // const [endDate, setEndDate] = useState<string>(format(endOfDay(new Date()), "yyyy-MM-dd"));
    const [selectedBroker, setSelectedBroker] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, reset } = useForm()
    const user = useAppSelector((state: any) => state?.auth?.auth?.user)
    const [txnEntry] = useBrokerTxnEntryMutation();
    const [deleteBroker] = useBrokerDeleteMutation()
    const { data } = useGetBrokerByIdQuery(id)

    const brokerData = data?.data || {};

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Processing...");
        data.broker = id
        try {
            setLoading(true);

            const result: any = await txnEntry(data)
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });

                reset();

            } else {
                toast.update(toastId, { render: `${(result as any)?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });
            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.data?.message || "Something went wronggg!", type: "error", isLoading: false, autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const isConfirm = confirm("ডিলিট করেই দিবেন?")
        if (!isConfirm) {
            return
        }
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await deleteBroker(id);
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                navigate('/dashboard/brokers')
            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });
                setLoading(false);
            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });

        } finally {
            /* empty */
        }

    };
    return (
        <div className='mx-auto'>
            <div className="flex  items-center" >
                <Profile person={brokerData} />
                <div className="dropdown dropdown-left mr-5">
                    <div tabIndex={0} role="button" className="text-2xl cursor-pointer mr-4">
                        <BsThreeDotsVertical />
                    </div>

                    <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box w-44 p-2 shadow">

                        <li
                            onClick={() => navigate(`/report/broker/${id}`)}
                            className="bg-white text-black rounded m-1"
                        >
                            <p className='text-gray-800 text-xl'>
                                <AiOutlineDownload /><span className='text-xs'> Report Download</span>
                            </p>

                        </li>

                        <li
                            // onClick={() => navigate(`/report/broker/${id}`)}
                            className="bg-white text-black rounded m-1"
                        >
                            <p className='text-gray-800 text-xl'>
                                {
                                    user?.role === 'admin' ?
                                        <p
                                            onClick={() => handleDelete((id as string))}
                                            className='text-sm text-red-600'
                                        >
                                            <span className="flex items-center">
                                                <MdDelete /> Broker Delete
                                            </span>
                                        </p> : <></>
                                }
                            </p>
                        </li>

                        <li
                            // onClick={() => navigate(`/report/broker/${id}`)}
                            className="bg-white text-black rounded m-1"
                        >
                            <p className='text-gray-800 text-xl'>
                                {
                                    user?.role === 'admin' ?
                                        <p
                                            onClick={() => {
                                                setSelectedBroker((id as any));
                                                setIsOpen(true)
                                            }
                                            }
                                            className='text-sm text-red-600'
                                        >
                                            <span className="flex items-center">
                                                <MdEdit /> Broker Edit
                                            </span>
                                        </p> : <></>
                                }
                            </p>

                        </li>
                    </ul>
                </div>


            </div>
            {/*Transaction entry section */}
            <button
                onClick={() => setMakeTxn(!makeTxn)} className='p-1 m-1 text-white bg-blue-600 rounded-xl'>Make Txn
            </button>
            {
                makeTxn && <div className="flex flex-col lg:flex-row gap-2 mb-2 p-1 ">
                    <form onSubmit={handleSubmit(onSubmit)} className="">

                        <div className='flex items-center gap-2'>
                            <SelectField
                                name="type"
                                label="no"
                                placeholder='লেনদেনের ধরণ'
                                options={customerTxnType}
                                control={control}
                                rules={{ required: "লেনদেনের ধরন নাই" }}
                            />

                            <div className='mt-[14px]'>
                                <InputField

                                    name="amount"
                                    label=""
                                    placeholder='কত টাকা *'
                                    type='number'
                                    control={control}
                                    rules={{ required: "টাকার পরিমান নাই" }}
                                />
                            </div>


                        </div>
                        <InputField
                            name="description"
                            label=""
                            placeholder='বিবরণ'
                            type='text'
                            control={control}
                        />

                        <SelectField
                            name="paymentMethod"
                            label=""
                            placeholder="পেমেন্ট মেথড"
                            control={control}
                            options={BROKERY_PAYMENT_METHOD_OPTIONS}
                            rules={{ required: "পেমেন্ট মেথড নাই" }}
                        />




                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full mt-2"
                        >
                            {loading ? (
                                <span className="loading loading-dots loading-lg"></span>
                            ) : (
                                "লেনদেন করুন"
                            )}
                        </button>
                    </form>
                </div>
            }
            {/* <div>
                <div>
                    <p>Start Date</p>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded px-3 py-2 text-sm no-print"
                    />
                </div>

                <div>
                    <p>End Date</p>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded px-3 py-2 text-sm"
                    />
                </div>
            </div> */}
            {/* Table Section */}
            < BrokerTxnTable id={id} />


            {
                selectedBroker && <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <EditBroker onClose={() => setIsOpen(false)} id={selectedBroker} />
                </Modal>
            }

        </div >
    );
};

export default BrokerTxn;