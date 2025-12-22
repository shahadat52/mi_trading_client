/* eslint-disable @typescript-eslint/no-explicit-any */
// components/common/DataTable.tsx
import React from "react";
import TableSkeleton from "./TableSkeleton";
import ErrorBoundary from "../ErrorBoundary";

type Column<T> = {
    header: string;
    accessor: keyof T;
    render?: (value: any, row: T) => React.ReactNode;
};

type DataTableProps<T> = {
    columns: Column<T>[];
    data: T[];
    loading?: boolean;
    error?: string;
};

const DataTable = <T extends { _id: string }>({
    columns,
    data,
    loading,
    error,
}: DataTableProps<T>) => {
    if (loading)
        return (
            <TableSkeleton row={10} />
        );
    if (error)
        return (
            <ErrorBoundary message={error} />
        );

    if (data.length === 0)
        return <p className="text-center text-gray-500 py-4">No data found.</p>;


    return (
        <div className="overflow-x-auto w-full border rounded-lg shadow-sm">
            <table className="min-w-full bg-white text-sm">
                <thead className="bg-gray-100 text-gray-700 text-left">
                    <tr>
                        {columns.map((col) => (
                            <th key={String(col.accessor)} className="px-4 py-2">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr
                            key={row._id}
                            className="border-t hover:bg-gray-50 transition-colors"
                        >
                            {columns.map((col) => (
                                <td key={String(col.accessor)} className="px-4 py-2">
                                    {col.render
                                        ? col.render(row[col.accessor], row)
                                        : (row[col.accessor] as any)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    );
}

export default DataTable;
