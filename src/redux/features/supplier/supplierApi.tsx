import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addSupplier: builder.mutation({
            query: (supplierData) => (
                {
                    url: "/suppliers/add",
                    method: "POST",
                    body: supplierData
                }
            ),
            invalidatesTags: ['Supplier']
        }),
        getAllSuppliers: builder.query({
            query: (query) => (
                new URLSearchParams(query).toString(),
                {
                    url: `/suppliers?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['Supplier']
        }),

        getAllSuppliersName: builder.query({
            query: (query) => (
                new URLSearchParams(query).toString(),
                {
                    url: `/suppliers/names?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['Supplier']
        }),

        deleteSupplier: builder.mutation({
            query: (id) => (
                {
                    url: `/suppliers/${id}`,
                    method: "DELETE",

                }
            ),
            invalidatesTags: ['Supplier']
        }),
    }),
});

export const { useAddSupplierMutation, useGetAllSuppliersQuery, useGetAllSuppliersNameQuery, useDeleteSupplierMutation } = authApi