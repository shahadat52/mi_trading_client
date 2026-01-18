/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useParams } from "react-router";
import TableSkeleton from "../../components/table/TableSkeleton";
import ErrorBoundary from "../../components/ErrorBoundary";
import { useGetCommissionProductsQuery } from "../../redux/features/commissionProduct/commissionProductApi";
import Profile from "../../components/profile/Profile";
import Modal from "../../components/Modal";
import CouthaEntry from "./CouthaEntry";
import { useState } from "react";

const SupplierWisePurchasePage = () => {
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const tableHeads = ["Product", "Lot", "Quantity", "Date", "Rate", "Action"];
    console.log({ selectedItem })
    const { data, isLoading, isError } = useGetCommissionProductsQuery(id);
    const commissionProducts = data?.data;
    console.log({ commissionProducts })

    // ---- Loading ----
    if (isLoading) {
        return (
            <div className="p-5 bg-white shadow rounded-xl border">
                <h2 className="text-lg font-semibold mb-4">Loading...</h2>
                <TableSkeleton row={6} />
            </div>
        );
    }

    // ---- Error ----
    if (isError) {
        return (
            <div className="p-5 bg-white shadow rounded-xl border text-center">
                <ErrorBoundary message="ডেটা লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।" />
            </div>
        );
    }

    // ---- Empty ----
    if (!commissionProducts || commissionProducts?.length === 0) {
        return (
            <div className="p-5 bg-white shadow rounded-xl border text-center py-16">
                <p className="text-gray-500 text-lg">কোনো পারচেজ ডেটা পাওয়া যায়নি।</p>
            </div>
        );
    }

    return (
        <div>
            <div>
                <Profile person={commissionProducts[0]?.supplier} />
            </div>
            <NavLink to={`/coutha/${id}`} className=" m-2 p-6">
                <button
                    className="bg-blue-600 text-white px-4 py-2 my-2 rounded"
                >
                    চৌথা প্রিন্ট করুন
                </button>
            </NavLink>
            <div className="p-5 bg-white shadow rounded-t-4xl border">

                {/* Desktop Table */}
                <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                {tableHeads?.map((head, i) => (
                                    <th key={i} className="px-4 py-3 text-left font-medium">
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {commissionProducts?.map((item: any) => (
                                <tr key={item._id} className="border-t hover:bg-gray-50 transition">
                                    <td className="px-4 py-2">{item?.name}</td>
                                    <td className="px-4 py-2">{item?.lot}</td>
                                    <td className="px-4 py-2">{item?.quantity}</td>
                                    <td className="px-4 py-2">
                                        {new Date(item?.createdAt).toLocaleDateString("en-GB")}
                                    </td>
                                    <td className="px-4 py-2">{item?.commissionRate}%</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => {
                                                setSelectedItem(item);
                                                setIsOpen(true);
                                            }}
                                            className="bg-blue-600 text-white text-xs  p-1 rounded"
                                        >
                                            চৌথা করুন
                                        </button>

                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

                {/* Mobile Card View */}
                <div className="sm:hidden space-y-4">
                    {commissionProducts?.map((item: any) => (
                        <div key={item._id} className="border rounded-lg p-1 shadow-sm bg-gray-50">
                            <div className="block">
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-500">Product</span>
                                    <span className="font-medium">{item?.name}</span>
                                </div>

                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-500">Quantity</span>
                                    <span>{item?.quantity} {item?.unit}</span>
                                </div>

                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-500">Commission rate %</span>
                                    <span>{item?.commissionRate}%</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">Date</span>
                                    <span>
                                        {new Date(item.createdAt).toLocaleDateString("en-GB")}
                                    </span>
                                </div>

                                <div className=" flex  justify-end">
                                    <button

                                        onClick={() => {
                                            setSelectedItem(item);
                                            setIsOpen(true);
                                        }}
                                        className="bg-blue-600 text-white text-xs  p-1 rounded"
                                    >
                                        চৌথা করুন
                                    </button>


                                </div>

                            </div>

                        </div>
                    ))}
                </div>


            </div>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <CouthaEntry lot={selectedItem} supplier={id} onClose={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
};

export default SupplierWisePurchasePage;
