import React from "react";

type ConfirmationModalProps = {
    isOpen: boolean;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title = "Are you sure?",
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) return null;

    return (
        <dialog className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{message}</p>
                <div className="modal-action">
                    <button onClick={onConfirm} className="btn btn-error text-white">
                        {confirmText}
                    </button>
                    <button onClick={onCancel} className="btn">
                        {cancelText}
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default ConfirmationModal;
