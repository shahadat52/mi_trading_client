
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
            invalidatesTags: ['BothSales', 'Products', 'CommissionProduct', 'Receivable']
        }),
        getAllBothSales: builder.query({
            query: (query) => (
                {
                    url: `/bothSales/all?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['BothSales']
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

export const { useBothSalesEntryMutation, useUpdateInvoiceMutation, useDeleteSalesInvoiceMutation, useGetAllBothSalesQuery, useGetBothSaleByInvoiceQuery, useGetBothSalesReportQuery } = bothSalesApi