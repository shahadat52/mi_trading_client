/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useParams } from 'react-router';
import { useState } from 'react';
import { GrUpdate } from 'react-icons/gr';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'react-toastify';
import Modal from '../../../components/Modal';
import BepariCouthaUpdateEntry from './BepariCouthaUpdateEntry';
import { useDeleteBepariCouthaMutation, useGetAllCouthasOfSupplierQuery } from '../../../redux/features/coutha/couthaApi';
import { useBepariTxnEntryMutation } from '../../../redux/features/supplierTxn/supplierTxnApi';
import EmptyState from '../../../components/loadingErrorEmpty/EmptyState';
import ErrorState from '../../../components/loadingErrorEmpty/ErrorState';
import CouthaSkeleton from '../../../components/loadingErrorEmpty/LoadingState';


const CouthaPage = () => {
    const { id } = useParams();
    const {
        data,
        isLoading,
        isError,
        error,
        refetch
    } = useGetAllCouthasOfSupplierQuery(id);

    const [deleteCoutha, { isLoading: deleteLoading }] = useDeleteBepariCouthaMutation();

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<any>(null);

    const settlements = data?.data || [];

    // ✅ Add Transaction
    const [addBepariTxn, { isLoading: txnLoading }] = useBepariTxnEntryMutation();
    const handleAddTxn = async (item: any) => {
        if (!confirm("এক্ষুনি যুক্ত করবেন সবকিছু ঠিক আছে?")) return;
        // return
        const toastId = toast.loading("Processing...");

        try {
            const txnCData = {
                party: item?.supplier?._id,
                type: "credit",
                amount: Number(Number(item?.grandTotal) - Number(item?.subTotal)),
                description: `${item?.invoice}`,
            };
            const transfarData = {
                _id: item._id,
                godi: item.godi,
                tohori: item.tohori
            }
            const txnData = {
                txnCData,
                transfarData
            }

            const res = await addBepariTxn(txnData).unwrap();

            toast.update(toastId, {
                render: res.message,
                type: "success",
                isLoading: false,
                autoClose: 1500,
            });

        } catch (err: any) {
            toast.update(toastId, {
                render: err?.data?.message || "Transaction failed!",
                type: "error",
                isLoading: false,
            });
        }
    };

    // ✅ Delete
    const handleDelete = async (id: string) => {

        if (!confirm("ডিলিট করলে হিসেব থেকে বাদ দিবেন")) return;

        const toastId = toast.loading("Deleting...");

        try {
            const res = await deleteCoutha(id).unwrap();

            toast.update(toastId, {
                render: res.message,
                type: "success",
                isLoading: false,
                autoClose: 1500,
            });

        } catch (err: any) {
            toast.update(toastId, {
                render: err?.data?.message || "Delete failed!",
                type: "error",
                isLoading: false,
            });
        }
    };


    // 🔄 Loading
    if (isLoading) return <CouthaSkeleton />;


    if (isError) {
        return (
            <ErrorState
                message={(error as any)?.data?.message}
                onRetry={refetch}
            />
        );
    }

    // 📭 Empty
    if (!settlements.length) {
        return <EmptyState message="কোনো Coutha পাওয়া যায়নি" />;
    }

    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-3'>
                {settlements.map((item: any, idx: number) => (
                    <div
                        key={item?._id}
                        className='text-xs flex items-center m-3 rounded-2xl border bg-green-50 py-3 px-6 justify-between gap-4'
                    >
                        <p>{idx + 1}.</p>
                        <p>Invoice: <span className='font-semibold'>{item?.invoice}</span></p>
                        <p>Lot: <span className='font-semibold'>{item?.lot}</span></p>

                        <div className='flex flex-col items-end'>
                            <p>{item?.grandTotal} টাকা</p>
                        </div>

                        {/* Update */}
                        <button
                            onClick={() => {
                                setSelected(item);
                                setIsOpen(true);
                            }}
                            className="text-green-600 text-2xl"
                        >
                            <GrUpdate />
                        </button>

                        {/* Print */}
                        <NavLink to={`/print/coutha/${item._id}`}

                            className="bg-blue-600 text-white px-2 py-1 rounded"
                        >
                            Print
                        </NavLink>

                        {/* Dropdown */}
                        <div className="dropdown dropdown-left">
                            <div tabIndex={0} role="button" className="text-2xl cursor-pointer">
                                <BsThreeDotsVertical />
                            </div>

                            <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box w-44 p-2 shadow">
                                <li
                                    onClick={() => handleAddTxn(item)}
                                    className="bg-blue-600 text-white rounded m-1"
                                >
                                    <p>
                                        {txnLoading ? "Processing..." : "হিসেবে যুক্ত করুন"}
                                    </p>
                                </li>

                                <li
                                    onClick={() => handleDelete(item?._id)}
                                    className="bg-red-600 text-white rounded m-1"
                                >
                                    <p>
                                        {deleteLoading ? "Deleting..." : "ডিলিট করুন"}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>



            {/* Update Modal */}
            {
                selected && <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <BepariCouthaUpdateEntry
                        item={selected}
                        onClose={() => setIsOpen(false)}
                    />
                </Modal>
            }
        </div>
    );
};

export default CouthaPage;