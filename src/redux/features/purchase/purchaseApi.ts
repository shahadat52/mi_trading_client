import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        purchaseEntry: builder.mutation({
            query: (purchaseData) => (
                {
                    url: "/purchase/entry",
                    method: "POST",
                    body: purchaseData
                }
            ),
            invalidatesTags: ['Purchase']
        }),
        getAllPurchases: builder.query({
            query: (query) => (
                new URLSearchParams(query).toString(),
                {
                    url: `/purchase?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['Purchase']
        }),

        getCommissionPurchases: builder.query({
            query: (query) => (
                new URLSearchParams(query).toString(),
                {
                    url: `/purchase/commissionPurchases?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            // providesTags: ['']
        }),

        getCommissionPurchaseById: builder.query({
            query: (id) => (
                console.log(id),
                {
                    url: `/purchase/${id}`,
                    method: 'GET',
                }),
            // providesTags: ['Purchase']
        }),




        deletePurchase: builder.mutation({
            query: (id) => (
                {
                    url: `/purchase/${id}`,
                    method: "DELETE",

                }
            ),
            invalidatesTags: ['Purchase']
        }),

        updatePurchase: builder.mutation({
            query: (data) => (
                console.log(data),
                {
                    url: `/purchase/${data._id}`,
                    method: "PATCH",
                    body: data

                }
            ),
            invalidatesTags: ['Purchase']
        }),
    }),
});

export const { usePurchaseEntryMutation, useGetCommissionPurchasesQuery, useGetAllPurchasesQuery, useGetCommissionPurchaseByIdQuery, useDeletePurchaseMutation, useUpdatePurchaseMutation } = authApi