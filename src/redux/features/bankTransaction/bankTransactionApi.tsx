/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const bankTxnApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        transactionEntry: builder.mutation({
            query: (transactionData: any) => (
                {
                    url: "/bankTxn/entry",
                    method: "POST",
                    body: transactionData
                }
            ),
            invalidatesTags: ['Transaction', 'Account']
        }),

        getAllTransaction: builder.query({
            query: (query: any) => (
                {
                    url: `/bankTxn?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['Transaction']
        }),



    }),
});

export const { useTransactionEntryMutation, useGetAllTransactionQuery } = bankTxnApi