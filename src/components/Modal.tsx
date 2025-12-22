import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <div
            className={`px-2 mt-4   fixed inset-0 flex items-center justify-center z-50
        transition-opacity duration-300
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
            {/* Overlay */}
            <div
                className="mt-2 absolute inset-0 bg-black opacity-40 transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Box */}
            <div
                className={`bg-white rounded-lg shadow-lg w-full max-w-[800px] relative
          transform transition-all duration-300
          ${isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"}
          max-h-screen overflow-y-auto`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;