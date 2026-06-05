


/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const cashboxApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addOpeningBal: builder.mutation({
            query: (data) => ({
                url: `/cashbox`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Cashbox"],
        }),


        getOpeningBal: builder.query({
            query: () => ({
                url: `/cashbox/openingBal`,
                method: "GET",
            }),
            providesTags: ["Cashbox"],
        }),
        getCashIn: builder.query({
            query: () => ({
                url: `/cashbox/cashIn`,
                method: "GET",
            }),
            providesTags: ["CashIn"],
        }),

        getCashOut: builder.query({
            query: () => ({
                url: `/cashbox/cashOut`,
                method: "GET",
            }),
            providesTags: ["CashOut"],
        }),

        getClosingBalance: builder.query({
            query: () => ({
                url: `/cashbox/closing`,
                method: "GET",
            }),
        }),



    }),
});

export const { useAddOpeningBalMutation, useGetOpeningBalQuery, useGetCashInQuery, useGetCashOutQuery, useGetClosingBalanceQuery } = cashboxApi