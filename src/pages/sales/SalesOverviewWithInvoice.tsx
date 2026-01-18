/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useGetAllSalesQuery } from '../../redux/features/sales/salesApi';
// import type { Sale } from '../../components/table/PrintableInvoice';
import TableSkeleton from '../../components/table/TableSkeleton';
import ErrorBoundary from '../../components/ErrorBoundary';
import { salesTableHeads } from './salesTableHeads';
import SalesTableBody from './SalesTableBody';
import { SalesDeliveryEntry } from './SalesDeliveryEntry';
import SalesCard from './SalesCard';
import useDebouncedSearch from '../../hooks/useDebouncedSearch';
import PrintSaleMemoModal from './memo/PrintSaleMemoModal';

/* ---------------------------------------------
   Main Component
   ---------------------------------------------*/

const SalesOverviewWithInvoice: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>('createdAt');
    const [order, setOrder] = useState('desc');
    const [dateFrom, setDateFrom] = useState<string>('');
    const [dateTo, setDateTo] = useState<string>('');

    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
    const [selectedSale, setSelectedSale] = useState<any | null>(null);
    const [delivery, setDelivery] = useState<{ items: any[] } | null>(null);

    // call user's hook
    const { search, setSearch, debouncedSearch } = useDebouncedSearch("", {
        delay: 600,
        minLength: 2,
    });
    const { data, isLoading, isError, error } = useGetAllSalesQuery({ page, limit, search: debouncedSearch, order, sortBy, dateFrom, dateTo });

    const sales = data?.data.data || [];
    const total = data?.total || 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const toggleExpand = (id: string) => {
        setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const openInvoice = (sale: any) => setSelectedSale(sale);
    const closeInvoice = () => setSelectedSale(null);
    const deliveryModalClose = () => setDelivery(null);

    const onSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
    };

    const clearFilters = () => {
        setSearch('');
        setDateFrom('');
        setDateTo('');
        setPage(1);
    };

    if (isError) {
        return <ErrorBoundary />
    }
    return (
        <div className="p-4 space-y-4">
            {/* Filters and search */}
            <form onSubmit={onSearchSubmit} className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex gap-2 flex-wrap items-center">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ইনভয়েস খুঁজুন..."
                        className="border rounded px-3 py-2 text-sm lg:w-64 w-full"
                    />
                    <div className="flex gap-3 items-center">
                        <label className="text-sm">Sort:</label>
                        <button
                            type="button"
                            onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                            className="px-3 py-2 border rounded text-sm"
                        >
                            {order === 'asc' ? 'Ascending' : 'Descending'}
                        </button>

                        <label className="text-sm">Sort:</label>
                        <select value={sortBy} onChange={(e) => { setSortBy(e.target.value) }} className="border rounded px-3 py-2 text-sm">
                            <option value='createdAt'>Date</option>
                            <option value='grandTotal'>Grand Total</option>
                            <option value='customer'>Customer</option>
                        </select>
                        <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }} className="border rounded px-3 py-2 text-sm">
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    <div className='flex gap-2'>
                        <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border rounded px-3 py-2 text-[12px] w-[116px] " />
                        <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border rounded px-3 py-2 text-[12px] w-[116px]" />

                        <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded text-sm">Search</button>
                        <button type="button" onClick={clearFilters} className="px-3 py-2 border rounded text-sm">Clear</button>
                    </div>
                </div>


            </form>

            {/* Desktop view */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm hidden md:block">
                {isLoading ? (
                    <TableSkeleton row={10} />
                ) : isError ? (
                    <div className="p-4 text-red-600">{(error as any)?.data?.message || 'Error loading sales'}</div>
                ) : sales?.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No sales found.</p>
                ) : (
                    <table className="min-w-full bg-white text-sm">
                        <thead className="bg-gray-100 text-gray-700 text-left">
                            <tr>
                                {
                                    salesTableHeads?.map((head: any, idx) => (
                                        <th key={idx} className="px-4 py-2 border-b">{head}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {sales?.map((row: any, idx: number) => (
                                <SalesTableBody
                                    key={row._id}
                                    row={row}
                                    page={page}
                                    limit={limit}
                                    idx={idx}
                                    toggleExpand={toggleExpand}
                                    expandedRows={expandedRows}
                                    openInvoice={openInvoice}
                                    setDelivery={setDelivery}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Mobile Cards */}
            <div className="grid gap-3 md:hidden">
                {
                    isLoading ? (<TableSkeleton row={5} />)
                        : isError ? (
                            <div className="p-4 text-red-600">{(error as any)?.data?.message || 'Error loading sales'}</div>
                        ) : sales?.length === 0 ? (
                            <p className="text-center text-gray-500 py-4">No sales found.</p>
                        ) : (
                            sales.map((sale: any) => (
                                <SalesCard
                                    key={sale._id}
                                    sale={sale}
                                    onInvoice={setSelectedSale}
                                    setDelivery={setDelivery}
                                />
                            ))
                        )
                }
            </div>


            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
                <div className="flex gap-2">
                    <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-2 border rounded disabled:opacity-50">Prev</button>
                    <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-2 border rounded disabled:opacity-50">Next</button>
                </div>
            </div>

            {/* Invoice modal / print area */}
            {selectedSale && <PrintSaleMemoModal sale={selectedSale} onClose={closeInvoice} />}

            <SalesDeliveryEntry item={delivery} deliveryModalClose={deliveryModalClose} />

        </div>
    );
};

export default SalesOverviewWithInvoice;
