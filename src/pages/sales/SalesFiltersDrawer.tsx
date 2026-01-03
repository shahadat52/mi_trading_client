import React from 'react';

interface Props {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const SalesFiltersDrawer: React.FC<Props> = ({ open, onClose, children }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="absolute left-0 top-0 h-full w-[85%] bg-white p-4 shadow-xl overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button onClick={onClose} className="border px-3 py-1 rounded text-sm">
                        Close
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default SalesFiltersDrawer;