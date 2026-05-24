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

        commissionSalesUpdate: builder.mutation({
            query: (commissionSalesData: any) => (
                {
                    url: `commissionSales/update/${commissionSalesData.id}`,
                    method: "PATCH",
                    body: { salePrice: commissionSalesData.salePrice, quantity: commissionSalesData.quantity, bosta: commissionSalesData.bosta }
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

        getCommissionSalesById: builder.query({
            query: (id) => (
                {
                    url: `/commissionSales/${id}`,
                    method: 'GET',

                })
        }),

        getCommissionSalesSupplierLotWise: builder.query({
            query: (query) => {

                const params = new URLSearchParams();
                if (query.couthaOf) params.append('couthaOf', query.couthaOf);

                return {
                    url: `/commissionSales/couthaOf/?${params.toString()}`,
                    method: 'GET',

                };
            },
            providesTags: ['CommissionSales']
        }),



    }),
});

export const { useCommissionSalesEntryMutation, useCommissionSalesUpdateMutation, useGetCommissionSalesQuery, useGetCommissionSalesByIdQuery, useGetCommissionSalesSupplierLotWiseQuery } = commissionSalesApi