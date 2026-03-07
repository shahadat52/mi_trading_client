/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const commissionSalesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        commissionSalesEntry: builder.mutation({
            query: (commissionSalesData: any) => (
                {
                    url: "commissionSales/entry",
                    method: "POST",
                    body: commissionSalesData
                }
            ),
            invalidatesTags: ['Sales', 'Income', 'CommissionSales', 'CommissionProduct']
        }),

        getCommissionSales: builder.query({
            query: (query) => (
                {
                    url: `/commissionSales/${query}`,
                    method: 'GET',

                }),
            providesTags: ['CommissionSales']
        }),

        getCommissionSalesSupplierLotWise: builder.query({
            query: (query) => (
                {
                    url: `/commissionSales/couthaOf/?couthaOf=${query.couthaOf}`,
                    method: 'GET',

                }),
            providesTags: ['CommissionSales']
        }),



    }),
});

export const { useCommissionSalesEntryMutation, useGetCommissionSalesQuery, useGetCommissionSalesSupplierLotWiseQuery } = commissionSalesApi