import { useState } from "react";
import { AddProductModal } from "../../components/modal/AddProductModal";
import { AddSupplierModal } from "../../components/modal/AddSupplierModal";
import PurchaseEntryForm from "./PurchaseEntryForm";

const PurchasePage = () => {
    const [addProductModalCont, setAddProductModalCont] = useState(false);
    const [addSupplierModalCont, setAddSupplierModalCont] = useState(false);
    return (
        <div>
            <div className="flex justify-end my-4 gap-2">
                <button
                    onClick={() => setAddProductModalCont(true)}
                    className="inline-flex h-10 px-4 items-center justify-center rounded-md bg-neutral-950 font-medium text-neutral-50 transition active:scale-110 ">
                    Add Product
                </button>
                <button
                    onClick={() => setAddSupplierModalCont(true)}
                    className="inline-flex h-10 px-4 items-center justify-center rounded-md bg-neutral-950 font-medium text-neutral-50 transition active:scale-110 ">
                    Add Supplier
                </button>
            </div>

            {/* Purchase Entry Form */}
            <PurchaseEntryForm />

            {addSupplierModalCont && <AddSupplierModal setAddSupplierModalCont={setAddSupplierModalCont} />}
            {/* Add Product Modal */}
            {addProductModalCont && <AddProductModal setAddProductModalCont={setAddProductModalCont} />}

        </div>
    );
};

export default PurchasePage;