import { baseApi } from "../../api/baseApi";


const supplierApi = baseApi.injectEndpoints({
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
            query: ({ type, searchTerm, limit }) => {

                const params = new URLSearchParams();

                if (type) {
                    params.append("type", type);
                }

                if (searchTerm) {
                    params.append("searchTerm", searchTerm);
                }

                if (limit) {
                    params.append("limit", limit);
                }
                return {
                    url: '/suppliers',
                    method: 'GET',
                    params
                };
            },
            providesTags: ['Supplier'],
        }),

        getSupplierById: builder.query({
            query: (id) => (
                {
                    url: `/suppliers/${id}`,
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
        updateSupplierData: builder.mutation({
            query: (updatedData) => (
                {
                    url: `/suppliers/${updatedData.id}`,
                    method: 'PATCH',
                    body: updatedData.data
                }),
            invalidatesTags: ['Supplier']
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

export const { useAddSupplierMutation, useGetAllSuppliersQuery, useGetSupplierByIdQuery, useGetAllSuppliersNameQuery, useUpdateSupplierDataMutation, useDeleteSupplierMutation } = supplierApi