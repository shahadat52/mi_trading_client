import { baseApi } from "../../api/baseApi";


const purchaseApi = baseApi.injectEndpoints({
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
                {
                    url: `/purchase/${data._id}`,
                    method: "PATCH",
                    body: data

                }
            ),
            invalidatesTags: ['Purchase']
        }),

        getPurchaseReports: builder.query({
            query: (query) => (
                {
                    url: `/purchase/reports?startDate=${query.startDate}&endDate=${query.endDate}`,
                    method: 'GET',
                }),
            // providesTags: ['Purchase']
        }),
    }),
});

export const { usePurchaseEntryMutation, useGetCommissionPurchasesQuery, useGetAllPurchasesQuery, useGetCommissionPurchaseByIdQuery, useDeletePurchaseMutation, useUpdatePurchaseMutation, useGetPurchaseReportsQuery } = purchaseApi