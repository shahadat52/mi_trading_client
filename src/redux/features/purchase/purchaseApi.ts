import { baseApi } from "../../api/baseApi";


const purchaseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        purchaseEntry: builder.mutation<any, FormData>({
            query: (formData) => (
                {
                    url: "/purchase/entry",
                    method: "POST",
                    body: formData,
                }
            ),
            invalidatesTags: ["Purchases", "Supplier", "SupplierTxn", "Payable",
            ],
        }),
        getAllPurchases: builder.query({
            query: (query) => (
                new URLSearchParams(query).toString(),
                {
                    url: `/purchase?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['Purchases']
        }),

        getCommissionPurchases: builder.query({
            query: (query) => (
                new URLSearchParams(query).toString(),
                {
                    url: `/purchase/commissionPurchases?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
        }),

        getCommissionPurchaseById: builder.query({
            query: (id) => (
                {
                    url: `/purchase/commission/${id}`,
                    method: 'GET',
                }),
            providesTags: ['CommissionPurchase']
        }),

        getRegualarPurchaseById: builder.query({
            query: (id) => (
                {
                    url: `/purchase/regular/${id}`,
                    method: 'GET',
                }),
            providesTags: ['RegularPurchase']
        }),

        deletePurchase: builder.mutation({
            query: (id) => (
                {
                    url: `/purchase/${id}`,
                    method: "DELETE",

                }
            ),
            invalidatesTags: ['Purchases', 'Payable', 'Products']
        }),

        updatePurchase: builder.mutation({
            query: (payload) => (
                {
                    url: `/purchase/update/${payload.id}`,
                    method: "PATCH",
                    body: payload.data

                }
            ),
            invalidatesTags: ['Purchases', 'Products', 'RegularPurchase', 'Payable']
        }),

        getPurchaseReports: builder.query({
            query: (query) => (
                {
                    url: `/purchase/reports?startDate=${query.startDate}&endDate=${query.endDate}`,
                    method: 'GET',
                }),
            // providesTags: ['Purchase']
        }),

        getProductWiseSalesReports: builder.query({
            query: (id) => (
                {
                    url: `/bothSales/reports/${id}`,
                    method: 'GET',
                }),
            // providesTags: ['Purchase']
        }),

        getPurchaseDataByInvoice: builder.query({
            query: (invoice) => (
                {
                    url: `/purchase/invoice/${invoice}`,
                    method: 'GET',
                }),
            // providesTags: ['Purchases']
        }),

    }),
});

export const { usePurchaseEntryMutation, useGetCommissionPurchasesQuery, useGetRegualarPurchaseByIdQuery, useGetAllPurchasesQuery, useGetCommissionPurchaseByIdQuery, useDeletePurchaseMutation, useUpdatePurchaseMutation, useGetPurchaseReportsQuery, useGetProductWiseSalesReportsQuery, useGetPurchaseDataByInvoiceQuery } = purchaseApi