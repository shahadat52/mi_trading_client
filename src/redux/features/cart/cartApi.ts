
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
            invalidatesTags: ['BothSales', 'Product']
        }),
        getAllBothSales: builder.query({
            query: (query) => (
                {
                    url: `/bothSales/all?${new URLSearchParams(query).toString()}`,
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

    }),
});

export const { useBothSalesEntryMutation, useGetAllBothSalesQuery, useGetBothSalesReportQuery } = bothSalesApi