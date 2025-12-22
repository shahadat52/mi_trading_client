/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import TableSkeleton from "../../components/table/TableSkeleton";
import ErrorBoundary from "../../components/ErrorBoundary";
import { expenseTableHeads } from "./expenseTableHeads";
import ExpanseTableBody from "./ExpanseTableBody";
import { useGetAllExpensesQuery } from "../../redux/features/expense/expenseApi";

const ExpensesTable = () => {
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const { data, isLoading, isError } = useGetAllExpensesQuery({
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

    const expenses = data?.data;
    console.log(expenses)

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
                            {expenseTableHeads?.map((head: string) => (
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
                        {expenses?.map((d: any, idx: number) => (
                            <ExpanseTableBody key={d._id} d={d} idx={idx} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card layout for mobile */}
            <div className="grid gap-4 md:hidden">
                {expenses?.map((d: any, idx: number) => (
                    <div
                        key={d._id}
                        className="border rounded-lg shadow-sm p-4 bg-white"
                    >
                        <p className="text-sm font-semibold">
                            No: <span className="font-normal">{idx + 1}</span>
                        </p>
                        <p className="text-sm font-semibold">
                            Category: <span className="font-normal">{d.expenseCategory}</span>
                        </p>
                        <p className="text-sm font-semibold">
                            Expense By: <span className="font-normal">{d.expenseBy.name}</span>
                        </p>
                        <p className="text-sm font-semibold">
                            Amount: <span className="font-normal">{d.amount}</span>
                        </p>
                        <p className="text-sm font-semibold">
                            Date: <span className="font-normal">{new Date(d.date).toLocaleDateString()}</span> {"--"}
                            Time: <span className="font-normal">{new Date(d.date).toLocaleTimeString()}</span>
                        </p>
                        <p className="text-sm font-semibold">
                            Description: <span className="font-normal">{d.description}</span>
                        </p>

                        {/* Add more fields as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpensesTable;