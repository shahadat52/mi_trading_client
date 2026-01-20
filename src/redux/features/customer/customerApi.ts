import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addCustomer: builder.mutation({
            query: (incomeData) => (
                {
                    url: "/customer/add",
                    method: "POST",
                    body: incomeData,
                }
            ),
            invalidatesTags: ['Customer', 'CustomerTxn']
        }),
        getAllCustomers: builder.query({
            query: (query) => (
                new URLSearchParams(query).toString(),
                {
                    url: `/customer?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['Customer']
        }),
        updateCustomerData: builder.mutation({
            query: (updatedData) => (
                {
                    url: `/customer/${updatedData.id}`,
                    method: 'PATCH',
                    body: updatedData.data
                }),
            invalidatesTags: ['CustomerTxn', 'Customer']
        }),

        customerTxnEntry: builder.mutation({
            query: (txnData) => (
                {
                    url: "/customerTxn/entry",
                    method: "POST",
                    body: txnData,
                }
            ),
            invalidatesTags: ['CustomerTxn', 'Customer']
        }),

        getAllCustomerTxn: builder.query({
            query: (query) => (
                new URLSearchParams(query).toString(),
                {
                    url: `/customerTxn?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['CustomerTxn']
        }),

        getAllTxnByCustomer: builder.query({
            query: ({ id }) => (
                {
                    url: `/customerTxn/${id}`,
                    method: 'GET',
                }),
            providesTags: ['CustomerTxn']
        }),

        updateCustomerTxn: builder.mutation({
            query: (updatedData) => (
                {
                    url: `/customerTxn/${updatedData.id}`,
                    method: 'PATCH',
                    body: updatedData.data
                }),
            invalidatesTags: ['CustomerTxn', 'Customer']
        }),

        deleteCustomerTxn: builder.mutation({
            query: (id) => (
                {
                    url: `/customer/${id}`,
                    method: 'DELETE',
                    body: id.data
                }),
            invalidatesTags: ['CustomerTxn', 'Customer']
        }),



    }),
});

export const { useAddCustomerMutation, useGetAllCustomersQuery, useUpdateCustomerDataMutation, useCustomerTxnEntryMutation, useGetAllCustomerTxnQuery, useGetAllTxnByCustomerQuery, useUpdateCustomerTxnMutation, useDeleteCustomerTxnMutation } = authApi