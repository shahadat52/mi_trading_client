/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const commissionProduct = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        CommissionProductEntry: builder.mutation({
            query: (commissionProductData: any) => (
                {
                    url: "commissionProduct/create",
                    method: "POST",
                    body: commissionProductData
                }
            ),
            invalidatesTags: ['CommissionProduct']
        }),

        getCommissionProducts: builder.query({
            query: (query) => (
                {
                    url: `/commissionProduct/${query}`,
                    method: 'GET',

                }),
            providesTags: ['CommissionProduct']
        }),



    }),
});

export const { useCommissionProductEntryMutation, useGetCommissionProductsQuery } = commissionProduct    