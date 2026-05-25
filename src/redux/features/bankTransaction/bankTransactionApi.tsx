/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const bankTxnApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        bankTxnEntry: builder.mutation({
            query: (transactionData: any) => (
                {
                    url: "/bankTxn/entry",
                    method: "POST",
                    body: transactionData
                }
            ),
            invalidatesTags: ['Transaction', 'Account']
        }),

        getAllBankTxn: builder.query({
            query: (query: any) => (
                {
                    url: `/bankTxn?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['Transactions']
        }),

        getBankWiseTxn: builder.query({
            query: ({ bankName, fromDate,
                toDate, limit }) => {
                const params = new URLSearchParams();

                if (bankName) {
                    params.append("bankName", bankName);
                }
                if (fromDate) {
                    params.append("fromDate", fromDate);
                }
                if (toDate) {
                    params.append("toDate", toDate);
                }

                if (limit) {
                    params.append("limit", limit);
                }

                return {
                    url: "/bankTxn/name",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["Transaction"],
        }),

        updateBankTxn: builder.mutation({
            query: (updatedData) => (
                {
                    url: `/bankTxn/update/${updatedData.id}`,
                    method: 'PATCH',
                    body: updatedData.data
                }),
            invalidatesTags: ["Transaction"]
        }),

        deleteBankTxn: builder.mutation({
            query: (id) => (
                {
                    url: `/bankTxn/${id}`,
                    method: 'DELETE'
                }),
            invalidatesTags: ["Transaction"]
        }),








    }),
});

export const { useBankTxnEntryMutation, useGetAllBankTxnQuery, useGetBankWiseTxnQuery, useUpdateBankTxnMutation, useDeleteBankTxnMutation } = bankTxnApi