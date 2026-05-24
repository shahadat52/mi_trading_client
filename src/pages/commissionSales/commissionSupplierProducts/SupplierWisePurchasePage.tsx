/* eslint-disable @typescript-eslint/no-explicit-any */

import { NavLink, useParams } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";

import Profile from "../../../components/profile/Profile";
import Modal from "../../../components/Modal";
import TableSkeleton from "../../../components/table/TableSkeleton";
import CouthaEntry from "../Coutha/CouthaEntry";

import {
    useDeleteCommissionProdMutation,
    useGetCommissionProductsBySupplierQuery
} from "../../../redux/features/commissionProduct/commissionProductApi";
import ErrorState from "../../../components/loadingErrorEmpty/ErrorState";
import EmptyState from "../../../components/loadingErrorEmpty/EmptyState";
import ProductTable from "./ProductTable";
import ProductCardList from "./ProductCardList";

const SupplierWisePurchasePage = () => {
    const { id } = useParams();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const {
        data,
        isLoading,
        isError,
        error,
        refetch
    } = useGetCommissionProductsBySupplierQuery(id);

    const [deleteProduct] = useDeleteCommissionProdMutation();

    const commissionProducts = data?.data || [];

    if (isLoading) {
        return (
            <div className="p-5 bg-white shadow rounded-xl border">
                <TableSkeleton row={6} />
            </div>
        );
    }

    if (isError) {
        return (
            <ErrorState
                message={(error as any)?.data?.message || "লোড করতে সমস্যা হয়েছে"}
                onRetry={refetch}
            />
        );
    }

    if (!commissionProducts.length) {
        return <EmptyState message="কোনো পণ্য নাই" />;
    }

    const handleDeleteInvoice = async (id: string) => {
        if (!confirm("ডিলিট করলে লেনদেন আপডেট করতে হবে—নিশ্চিত?")) return;

        const toastId = toast.loading("Deleting...");

        try {
            const res = await deleteProduct(id).unwrap();

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

    const handleOpenModal = (item: any) => {
        setSelectedItem(item);
        setIsOpen(true);
    };

    return (
        <div>
            <Profile person={commissionProducts[0]?.supplier} />

            <NavLink to={`/coutha/${id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 my-3 rounded">
                    চৌথা প্রিন্ট করুন
                </button>
            </NavLink>

            <div className="p-5 mb-12 bg-white shadow rounded-2xl border">

                {/* Desktop */}
                <div className="hidden sm:block">
                    <ProductTable
                        data={commissionProducts}
                        onDelete={handleDeleteInvoice}
                        onCoutha={handleOpenModal}
                    />
                </div>

                {/* Mobile */}
                <div className="sm:hidden">
                    <ProductCardList
                        data={commissionProducts}
                        onDelete={handleDeleteInvoice}
                        onCoutha={handleOpenModal}
                    />
                </div>

            </div>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <CouthaEntry
                    selectedItem={selectedItem}
                    supplier={id}
                    onClose={() => setIsOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default SupplierWisePurchasePage;