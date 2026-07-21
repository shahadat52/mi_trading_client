
import type { TSales } from "../../../interfaces/sales";
import { baseApi } from "../../api/baseApi";

const bothSalesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        bothSalesEntry: builder.mutation({
            query: (salesData: TSales) => (
                {
                    url: "/bothSales/entry",
                    method: "POST",
                    body: salesData
                }
            ),
            invalidatesTags: ['BothSales', 'Products', 'CommissionProduct', 'Receivable', 'DueSales']
        }),

        getAllBothSales: builder.query({
            query: ({ page, limit, search, order, sortBy, dateFrom, dateTo }: any) => {
                const params = new URLSearchParams();
                if (page) {
                    params.append('page', page);
                }
                if (limit) {
                    params.append('limit', limit);
                }
                if (search) {
                    params.append('search', search);
                }
                if (dateFrom) {
                    params.append('dateFrom', dateFrom);
                }
                if (dateTo) {
                    params.append('dateTo', dateTo);
                }

                if (order) {
                    params.append('order', order);
                }
                if (sortBy) {
                    params.append('sortBy', sortBy);
                }

                return {
                    url: "/bothSales/all",
                    method: 'GET',
                    params
                }
            },
            providesTags: ['BothSales']
        }),

        getProductWiseSales: builder.query({
            query: ({ dateFrom, dateTo }: any) => {
                const params = new URLSearchParams();

                if (dateFrom) {
                    params.append('dateFrom', dateFrom);
                }
                if (dateTo) {
                    params.append('dateTo', dateTo);
                }


                return {
                    url: "/bothSales/productwise/sales",
                    method: 'GET',
                    params
                }
            },
            providesTags: ['BothSales']
        }),

        getAllDueSales: builder.query({
            query: ({ page, limit, search, order, sortBy, dateFrom, dateTo }: any) => {
                const params = new URLSearchParams();
                if (page) {
                    params.append('page', page);
                }
                if (limit) {
                    params.append('limit', limit);
                }
                if (search) {
                    params.append('search', search);
                }
                if (dateFrom) {
                    params.append('dateFrom', dateFrom);
                }
                if (dateTo) {
                    params.append('dateTo', dateTo);
                }

                if (order) {
                    params.append('order', order);
                }
                if (sortBy) {
                    params.append('sortBy', sortBy);
                }


                return {
                    url: '/bothSales/due',
                    method: 'GET',
                    params
                }
            },
            providesTags: ['DueSales']
        }),

        getBothSaleByInvoice: builder.query({
            query: (invoice) => (
                {
                    url: `/bothSales/invoice/${invoice}`,
                    method: 'GET',
                }),
            providesTags: ['BothSales']
        }),

        getBothSalesReport: builder.query({
            query: (query) => ({
                url: `/bothSales/reports?startDate=${query.startDate}&endDate=${query.endDate}`,
                method: 'GET',
            })
        }),

        updateInvoice: builder.mutation({
            query: ({ id, data }: any) => (
                {
                    url: `/bothSales/${id}`,
                    method: 'PATCH',
                    body: data
                }),
            invalidatesTags: ['BothSales', 'Receivable']
        }),

        deleteSalesInvoice: builder.mutation({
            query: (id: any) => ({
                url: `/bothSales/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['BothSales', 'Receivable']
        })

    }),
});

export const { useBothSalesEntryMutation, useUpdateInvoiceMutation, useDeleteSalesInvoiceMutation, useGetAllBothSalesQuery, useGetProductWiseSalesQuery, useGetAllDueSalesQuery, useGetBothSaleByInvoiceQuery, useGetBothSalesReportQuery } = bothSalesApi