import { baseApi } from "../../api/baseApi";

/* eslint-disable @typescript-eslint/no-explicit-any */
const settlementApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        createSettlement: builder.mutation({
            query: (settlementData: any) => ({
                url: "/settlement",
                method: "POST",
                body: settlementData,
            }),
            invalidatesTags: ['Settlement', 'Account'],
        }),

        getAllSettlementsOfSupplier: builder.query({
            query: (query) => ({
                url: `/settlement/${query}`,
                method: 'GET',
                params: query
            }),
            providesTags: ['Settlement'],
        }),

        updateBepariCoutha: builder.mutation({
            query: (updatedData) => (
                {
                    url: `/settlement/${updatedData.id}`,
                    method: 'PATCH',
                    body: updatedData.data
                }),
            invalidatesTags: ['CustomerTxn', 'Customer', 'Settlement']
        }),

    }),
});

export const { useCreateSettlementMutation, useGetAllSettlementsOfSupplierQuery, useUpdateBepariCouthaMutation } = settlementApi;