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
            query: ({ searchTerm, limit }) => {
                const params = new URLSearchParams();

                if (searchTerm) {
                    params.append('searchTerm', searchTerm);
                }
                if (limit) {
                    params.append('limit', limit);
                }
                return {
                    url: "/commissionProduct",
                    method: 'GET',
                    params
                }
            },
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
                    url: `/commissionProduct/update/${commissionProductData.id}`,
                    method: "PATCH",
                    body: commissionProductData.data
                }
            ),
            invalidatesTags: ['CommissionProduct']
        }),

        deleteCommissionProd: builder.mutation({
            query: (id: any) => (
                {
                    url: `/commissionProduct/${id}`,
                    method: "DELETE"
                }
            ),
            invalidatesTags: ['CommissionProduct']
        }),

        addProfitCommissionProduct: builder.mutation({
            query: ({ id, data }) => (
                {
                    url: `/commissionProduct/addProfit/${id}`,
                    method: "PATCH",
                    body: data

                }
            ),
            invalidatesTags: ['CommissionProduct']
        }),

        getTotalProfitCommissionProduct: builder.query({
            query: ({ startDate, endDate, limit }) => {
                const params = new URLSearchParams();
                if (startDate) {
                    params.append('startDate', startDate);
                }
                if (endDate) {
                    params.append('endDate', endDate);
                }
                if (limit) {
                    params.append('limit', limit);
                }
                return {
                    url: "/commissionProduct/totalProfit",
                    method: 'GET',
                    params
                }
            },
        })


    }),
});

export const { useCommissionProductEntryMutation, useGetCommissionProductsByIdQuery, useGetCommissionProductsQuery, useGetCommissionProductsBySupplierQuery, useUpdateCommissionProdMutation, useDeleteCommissionProdMutation, useAddProfitCommissionProductMutation, useGetTotalProfitCommissionProductQuery } = commissionProduct    