/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { useBrokerDeleteMutation, useBrokerTxnEntryMutation } from "../../redux/features/broker/brokerApi";
import SelectField from "../../components/form/SelectField";
import { customerTxnType } from "../../utils/transactionType";
import InputField from "../../components/form/InputFields";
import { useAppSelector } from "../../redux/hook";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import BrokerTxnTable from "./BrokerTxnTable";
import Modal from "../../components/Modal";
import EditBroker from "./EditBroker";

const BrokerTxn = () => {
    const [selectedBroker, setSelectedBroker] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, reset } = useForm()
    const user = useAppSelector((state: any) => state?.auth?.auth?.user)
    const [txnEntry] = useBrokerTxnEntryMutation();
    const [deleteBroker] = useBrokerDeleteMutation()


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
            {/*Transaction entry section */}
            <div className="sticky flex flex-col lg:flex-row gap-2 mb-2 p-1 ">
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


                    {/* Edit and delete */}
                    <div className='flex justify-between mx-4 mt-2 items-center'>
                        <div>
                            {
                                user?.role === 'admin' ?
                                    <p
                                        onClick={() => handleDelete((id as string))}
                                        className='text-4xl text-red-600'
                                    >
                                        <MdDelete />
                                    </p> : <></>
                            }
                        </div>

                        <div>
                            {
                                user?.role === 'admin' ?
                                    <p
                                        onClick={() => {
                                            setSelectedBroker((id as any));
                                            setIsOpen(true)
                                        }
                                        }
                                        className='text-4xl text-red-600'
                                    >
                                        <MdEdit />
                                    </p> : <></>
                            }
                        </div>

                    </div>
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
            </div >

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