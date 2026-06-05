/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const commissionProduct = baseApi.injectEndpoints({
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
        CommissionProductEntry: builder.mutation<any, FormData>({
            query: (formData) => (
                {
                    url: "commissionProduct/create",
                    method: "POST",
                    body: formData
                }
            ),
            invalidatesTags: ['CommissionProduct']
        }),

        getCommissionProducts: builder.query({
            query: ({ searchTerm }) => (
                {
                    url: `/commissionProduct/?searchTerm=${searchTerm}`,
                    method: 'GET',

                }),
            providesTags: ['CommissionProduct']
        }),


        getCommissionProductsById: builder.query({
            query: (id) => (
                {
                    url: `/commissionProduct/productDetails/${id}`,
                    method: 'GET',

                }),
            providesTags: ['CommissionProduct']
        }),

        getCommissionProductsBySupplier: builder.query({
            query: (id: any) => (
                {
                    url: `/commissionProduct/${id}`,
                    method: 'GET',

                }),
            providesTags: ['CommissionProduct']
        }),

        updateCommissionProd: builder.mutation({
            query: (commissionProductData: any) => (
                {
                    url: `commissionProduct/update/${commissionProductData.id}`,
                    method: "PATCH",
                    body: commissionProductData.data
                }
            ),
            invalidatesTags: ['CommissionProduct']
        }),

        deleteCommissionProd: builder.mutation({
            query: (id: any) => (
                {
                    url: `commissionProduct/${id}`,
                    method: "DELETE"
                }
            ),
            invalidatesTags: ['CommissionProduct']
        }),



    }),
});

export const { useCommissionProductEntryMutation, useGetCommissionProductsByIdQuery, useGetCommissionProductsQuery, useGetCommissionProductsBySupplierQuery, useUpdateCommissionProdMutation, useDeleteCommissionProdMutation } = commissionProduct    