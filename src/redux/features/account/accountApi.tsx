/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addAccount: builder.mutation({
            query: (accountData: any) => (
                {
                    url: "/account/add",
                    method: "POST",
                    body: accountData
                }
            ),
            invalidatesTags: ['Account', 'Transaction']
        }),

        getAllAccount: builder.query({
            query: (query) => (
                {
                    url: `/account?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['Account', 'Transaction']
        }),



    }),
});

export const { useAddAccountMutation, useGetAllAccountQuery } = authApi