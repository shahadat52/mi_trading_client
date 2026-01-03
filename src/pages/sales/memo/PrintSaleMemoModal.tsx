/* eslint-disable @typescript-eslint/no-explicit-any */
import PaidMemo from "./PaidMemo";
import UnpaidMemo from "./UnpaidMemo";
import './memo.css'

const PrintSaleMemoModal = ({ sale, onClose }: any) => {
    const isPaid = sale.status === "paid";

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/40 min-h-screen p-4 print:bg-white">

            {/* ===================== */}
            {/* CASE 1: PAID → SINGLE */}
            {/* ===================== */}
            {isPaid && (
                <PaidMemo sale={sale} onClose={onClose} />
            )}

            {/* ======================================= */}
            {/* CASE 2: NOT PAID → ORIGINAL + CUSTOMER */}
            {/* ======================================= */}
            {!isPaid && (
                <div className="">

                    <div className=" print:flex print:flex-row print:gap-4 mt-[4px]">
                        <div className="print:w-1/2">
                            <UnpaidMemo sale={sale} onClose={onClose} copyLabel="অরিজিনাল কপি" />
                        </div>
                        <div className="hidden print:block print:w-1/2">
                            <UnpaidMemo sale={sale} onClose={onClose} copyLabel="কাস্টমার কপি" />
                        </div>
                    </div>



                </div>
            )}
        </div>
    );
};

export default PrintSaleMemoModal;