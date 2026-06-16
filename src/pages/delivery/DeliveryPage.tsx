/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useDeliveryStatusUpdateMutation, useGetDeliveriesQuery } from "../../redux/features/delivery/deliveryApi";
import type { TDelivery } from "../../interfaces/delivery";
import DeliveryTableBody from "./DeliveyTableBody";
import { deliveryTableHeads } from "./deliveryTableHeads";
import TableSkeleton from "../../components/table/TableSkeleton";
import ErrorBoundary from "../../components/ErrorBoundary";
import DeliverySlip from "./DeliverySlip";
import { toast } from "react-toastify";
import { useAppSelector } from "../../redux/hook";
import { format } from "date-fns";

const DeliveryPage: React.FC = () => {
    const today = format(new Date(), "yyyy-MM-dd");
    const [startDate, setStartDate] = useState<string>(today);
    const [endDate, setEndDate] = useState<string>(today);
    const [selectedDelivery, setSelectedDelivery] = useState<any | null>(null)
    const user = useAppSelector((state: any) => state?.auth?.auth?.user);
    const [updateDeliveryStatus] = useDeliveryStatusUpdateMutation();

    const { data, isLoading, isError } = useGetDeliveriesQuery({
        startDate,
        endDate,
    });



    const openDeliverySlip = (sale: any) => setSelectedDelivery(sale);
    const closeDeliverySlip = () => setSelectedDelivery(null)

    const handleDeliveryStatusUpdate = async (id: string, invoice: string) => {
        const isConfirm = confirm(`এই পন্যের ডেলিভারি ম্যান ${user?.name}?`)
        if (!isConfirm) {
            return
        }
        const toastId = toast.loading('Processing...', { autoClose: 2000 });

        try {
            const result: any = await updateDeliveryStatus({
                id,
                invoice,
            });
            if (result?.data?.success) {
                toast.update(toastId, {
                    render: result.data.message,
                    type: 'success',
                    isLoading: false,
                    autoClose: 1500,
                    closeOnClick: true,
                });
            } else {
                toast.update(toastId, {
                    render: result?.error?.data?.message || 'Failed!',
                    type: 'error',
                    isLoading: false,
                    autoClose: 2000,
                });
            }
        } catch (err: any) {
            toast.update(toastId, {
                render:
                    err?.error?.data?.message || 'Something went wrong!',
                type: 'error',
                isLoading: false,
                autoClose: 2000,
            });
        }
    };

    if (isLoading) {
        return <TableSkeleton row={10} />;
    }

    if (isError) {
        return <ErrorBoundary />;
    }

    const deliveries = data?.data;

    return (
        <div className="p-4 sm:p-6 mb-14">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-4">

                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                    <div>
                        <label>Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border rounded px-3 py-2 w-full text-sm"
                        />
                    </div>
                    <div>
                        <label>End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border rounded px-3 py-2 w-full text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Table for desktop */}
            <div className="hidden md:block overflow-x-auto ">
                <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            {deliveryTableHeads?.map((head: string) => (
                                <th
                                    key={head}
                                    className="px-4 py-2 border whitespace-nowrap text-left"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {deliveries?.map((d: TDelivery) => (
                            <DeliveryTableBody
                                openDeliverySlip={openDeliverySlip}
                                key={d._id}
                                d={d}
                            />
                        ))}
                    </tbody>
                </table>


                {
                    selectedDelivery && <DeliverySlip sale={selectedDelivery} onClose={closeDeliverySlip} />
                }
            </div>

            {/* Card layout for mobile */}
            <div className="grid gap-4 md:hidden">
                {deliveries?.map((d: TDelivery) => (
                    <div
                        key={d._id}
                        className="border rounded-lg shadow-sm p-4 bg-white"
                    >
                        <p className="text-sm font-semibold">
                            DeliveryBy: <span className="font-normal">{d.deliveryBy}</span>
                        </p>
                        <p className="text-sm font-semibold">
                            Destination: <span className="font-normal">{d.destination}</span>
                        </p>
                        <p className="text-sm font-semibold">
                            Via: <span className="font-normal">{d.via}</span>
                        </p>
                        <p className="text-sm font-semibold">
                            Description: <span className="font-normal">{d.description}</span>
                        </p>
                        <p className="text-sm font-semibold">
                            Date: <span className="font-normal">{new Date(d.deliveryTime).toLocaleDateString()}</span> {"--"}
                            Time: <span className="font-normal">{new Date(d.deliveryTime).toLocaleTimeString()}</span>
                        </p>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => openDeliverySlip(d)}
                                className="bg-blue-600 text-white  px-1 py-1 text-xs mt-1 rounded"
                            > স্লিপ প্রিন্ট করুণ
                            </button>

                            <button
                                onClick={() =>
                                    handleDeliveryStatusUpdate(
                                        d._id as string,
                                        d?.sales?.invoice as string
                                    )
                                }
                                className="bg-blue-600 text-white  px-1 py-1 text-xs mt-1 rounded"
                            > ডেলিভারি সম্পন্ন করুন
                            </button>
                        </div>
                        {/* Add more fields as needed */}
                        {
                            selectedDelivery && <DeliverySlip sale={selectedDelivery} onClose={closeDeliverySlip} />
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeliveryPage;
