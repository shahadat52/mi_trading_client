
import { baseApi } from "../../api/baseApi";


export type TCustomerDue = {
    name: string;
    address: string;
    phone: string;
    totalDue: number;
};

export type TSupplierPayable = {
    name: string;
    address: string;
    phone: string;
    totalPayable: number;
};

export type TCustomerSupplierDueResponse = {
    customers: TCustomerDue[];
    suppliers: TSupplierPayable[];
};
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

        getCustomerSupplierDue: builder.query<
            TCustomerSupplierDueResponse,
            void
        >({
            query: () => ({
                url: "/reports/due-reports",
                method: "GET",
            }),

            transformResponse: (response: {
                success: boolean;
                message: string;
                data: TCustomerSupplierDueResponse;
            }) => response.data,

        }),



    }),
});

export const { useSalesReportsQuery, useGetAllSalesQuery, useGetSalesReportQuery, useGetCustomerSupplierDueQuery, } = reportsApi