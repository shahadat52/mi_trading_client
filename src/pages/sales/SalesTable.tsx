/* eslint-disable @typescript-eslint/no-explicit-any */
import SalesTableBody from './SalesTableBody';

interface Props {
    sales: any[];
    page: number;
    limit: number;
    visibleColumns: string[];
    toggleExpand: (id: string) => void;
    expandedRows: Record<string, boolean>;
    openInvoice: (sale: any) => void;
    setDelivery: (payload: any) => void;
}

const SalesTable: React.FC<Props> = ({
    sales,
    page,
    limit,
    visibleColumns,
    toggleExpand,
    expandedRows,
    openInvoice,
    setDelivery,
}) => {
    return (
        <div className="overflow-x-auto rounded-lg border bg-white">
            <table className="min-w-[1100px] w-full text-sm">
                <thead className="sticky top-0 bg-gray-100 z-10">
                    <tr>
                        {visibleColumns.map(col => (
                            <th key={col} className="px-3 py-2 text-left border-b font-semibold">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sales.map((row, idx) => (
                        <SalesTableBody
                            key={row._id}
                            row={row}
                            idx={idx}
                            page={page}
                            limit={limit}
                            toggleExpand={toggleExpand}
                            expandedRows={expandedRows}
                            openInvoice={openInvoice}
                            setDelivery={setDelivery}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;