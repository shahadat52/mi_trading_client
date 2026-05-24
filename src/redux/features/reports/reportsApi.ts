
import { baseApi } from "../../api/baseApi";

const reportsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        salesReports: builder.query({
            query: ({ startDate, endDate }: { startDate?: string; endDate?: string }) => {
                const params = new URLSearchParams();

                if (startDate) params.append('startDate', startDate);
                if (endDate) params.append('endDate', endDate);

                return {
                    url: `/bothSales/sales/reports?${params.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['Sales', 'Products'],
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
                url: `/sales/reports?startDate=${query.startDate}&endDate=${query.endDate}`,
                method: 'GET',
            })

        }),

    }),
});

export const { useSalesReportsQuery, useGetAllSalesQuery, useGetSalesReportQuery } = reportsApi