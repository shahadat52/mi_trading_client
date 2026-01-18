import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <div
            className={`px-2 pt-4 h-auto   fixed inset-0 flex items-start justify-center z-50
        transition-opacity duration-300
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
            {/* Overlay */}
            <div
                className=" absolute inset-0 bg-black opacity-40 transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Box */}
            <div
                className={`bg-white max-h-screen my-auto rounded-lg shadow-lg w-full max-w-[800px] relative
          transform transition-all duration-300
          ${isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"}
          max-h-screen overflow-y-auto`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 tex-xl text-red-600 hover:text-gray-700"
                >
                    ✕
                </button>
                <div className="p-2">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;