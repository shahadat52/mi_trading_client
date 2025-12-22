
import type { TSales } from "../../../interfaces/sales";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        salesEntry: builder.mutation({
            query: (salesData: TSales) => (
                {
                    url: "/sales/entry",
                    method: "POST",
                    body: salesData
                }
            ),
            invalidatesTags: ['Sales', 'Product']
        }),
        getAllSales: builder.query({
            query: (query) => (
                {
                    url: `/sales/all?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['Sales']
        }),

        getSalesReport: builder.query({
            query: (query) => ({
                url: '/sales/report',
                method: 'GET',
                body: query
            })

        }),

    }),
});

export const { useSalesEntryMutation, useGetAllSalesQuery, useGetSalesReportQuery } = authApi