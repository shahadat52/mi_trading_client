/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        transactionEntry: builder.mutation({
            query: (transactionData: any) => (
                {
                    url: "/transaction/entry",
                    method: "POST",
                    body: transactionData
                }
            ),
            invalidatesTags: ['Transaction', 'Account']
        }),

        getAllTransaction: builder.query({
            query: (query) => (
                {
                    url: `/transaction?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['Transaction']
        }),



    }),
});

export const { useTransactionEntryMutation, useGetAllTransactionQuery } = authApi