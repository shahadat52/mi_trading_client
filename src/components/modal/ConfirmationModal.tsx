import React from "react";

type ConfirmationModalProps = {
    isOpen: boolean;
    title?: string;
    item: any;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: (id: string) => void;
    onCancel: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title = "Are you sure?",
    message,
    item,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) return null;

    return (
        <dialog className="modal modal-open">
            <div className="modal-box rounded-2xl shadow-2xl border border-base-300 bg-base-100">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4 text-base-content/70">{message}</p>

                <div className="modal-action">
                    <button onClick={onCancel} className="btn btn-ghost">
                        {cancelText}
                    </button>
                    <button onClick={() => onConfirm(item._id)} className="btn btn-error text-white">
                        {confirmText}
                    </button>
                </div>
            </div>

            <form
                method="dialog"
                className="modal-backdrop bg-black/30 backdrop-blur-md"
                onClick={onCancel}
            >
                <button>close</button>
            </form>
        </dialog>
    );
};

export default ConfirmationModal;