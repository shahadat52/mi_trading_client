import { baseApi } from "../../api/baseApi";


const supplierTxnApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        supplierTxnEntry: builder.mutation({
            query: (supplierTxnData) => (
                {
                    url: "/supplierTxn/entry",
                    method: "POST",
                    body: supplierTxnData
                }
            ),
            invalidatesTags: ['SupplierTxn']
        }),
        getAllSupplierTxn: builder.query({
            query: (query) => (
                new URLSearchParams(query).toString(),
                {
                    url: `/supplierTxn?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['SupplierTxn']
        }),

        getSpecificSupplierTxn: builder.query({
            query: ({ id }) => (
                {
                    url: `/supplierTxn/${id}`,
                    method: 'GET',
                }),
            providesTags: ['SupplierTxn']
        }),
        updateSupplierTxnData: builder.mutation({
            query: (updatedData) => (
                {
                    url: `/supplierTxn/${updatedData.id}`,
                    method: 'PATCH',
                    body: updatedData.data
                }),
            invalidatesTags: ['SupplierTxn']
        }),
        deleteSupplierTxn: builder.mutation({
            query: (id) => (
                {
                    url: `/supplierTxn/${id}`,
                    method: "DELETE",

                }
            ),
            invalidatesTags: ['SupplierTxn']
        }),

    }),
});

export const { useSupplierTxnEntryMutation, useGetAllSupplierTxnQuery, useGetSpecificSupplierTxnQuery, useUpdateSupplierTxnDataMutation, useDeleteSupplierTxnMutation } = supplierTxnApi