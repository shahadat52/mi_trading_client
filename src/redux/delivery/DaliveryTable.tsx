import React, { useState } from "react";
import { useGetDeliveriesQuery } from "../features/delivery/deliveryApi";
import type { TDelivery } from "../../interfaces/delivery";
import DeliveryTableBody from "./DeliveyTableBody";
import { deliveryTableHeads } from "./deliveryTableHeads";
import TableSkeleton from "../../components/table/TableSkeleton";
import ErrorBoundary from "../../components/ErrorBoundary";

const DeliveryTable: React.FC = () => {
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const { data, isLoading, isError } = useGetDeliveriesQuery({
        search,
        startDate,
        endDate,
    });

    if (isLoading) {
        return <TableSkeleton row={10} />;
    }

    if (isError) {
        return <ErrorBoundary />;
    }

    const deliveries = data?.data;

    return (
        <div className="p-4 sm:p-6">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by destination, via, description..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded px-3 py-2 w-full text-sm"
                />
                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded px-3 py-2 w-full text-sm"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded px-3 py-2 w-full text-sm"
                    />
                </div>
            </div>

            {/* Table for desktop */}
            <div className="hidden md:block overflow-x-auto">
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
                            <DeliveryTableBody key={d._id} d={d} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card layout for mobile */}
            <div className="grid gap-4 md:hidden">
                {deliveries?.map((d: TDelivery) => (
                    <div
                        key={d._id}
                        className="border rounded-lg shadow-sm p-4 bg-white"
                    >
                        <p className="text-sm font-semibold">
                            DeliveryBy: <span className="font-normal">{d.deliveryBy?.name}</span>
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
                        {/* Add more fields as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeliveryTable;
