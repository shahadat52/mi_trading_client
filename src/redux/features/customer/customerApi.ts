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
            query: ({ searchTerm, limit }) => {
                const params = new URLSearchParams();
                if (searchTerm) params.append('searchTerm', searchTerm);
                if (limit) params.append('limit', String(limit));

                return {
                    url: `/customer?${params.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['Customer']
        }),

        getCustomerById: builder.query({
            query: (id) => (
                {
                    url: `/customer/${id}`,
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
            invalidatesTags: ['CustomerTxn', 'Customer', 'Payable', 'MFS']
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
                    url: `/customerTxn/update/${updatedData.id}`,
                    method: 'PATCH',
                    body: updatedData.data
                }),
            invalidatesTags: ['CustomerTxn', 'Customer', 'Receivable']
        }),

        deleteCustomerTxn: builder.mutation({
            query: (id) => (
                {
                    url: `/customerTxn/${id}`,
                    method: 'DELETE'
                }),
            invalidatesTags: ['CustomerTxn', 'Customer', 'Receivable']
        }),

        deleteCustomer: builder.mutation({
            query: (id) => (
                {
                    url: `/customer/${id}`,
                    method: 'DELETE',
                    body: id.data
                }),
            invalidatesTags: ['CustomerTxn', 'Customer']
        }),

        getUnapprovedCustomerTxn: builder.query({
            query: () => (
                {
                    url: `/customerTxn/unapproved`,
                    method: 'GET',
                }),
            providesTags: ['UnapprovedCustomerTxn']
        }),

        makeApproveCustomerTxn: builder.mutation({
            query: (id) => (
                {
                    url: `/customerTxn/approve/${id}`,
                    method: "PATCH",

                }
            ),
            invalidatesTags: ['UnapprovedCustomerTxn']
        }),



    }),
});

export const { useAddCustomerMutation, useGetAllCustomersQuery, useGetCustomerByIdQuery, useUpdateCustomerDataMutation, useCustomerTxnEntryMutation, useGetAllCustomerTxnQuery, useGetAllTxnByCustomerQuery, useUpdateCustomerTxnMutation, useDeleteCustomerTxnMutation, useDeleteCustomerMutation, useGetUnapprovedCustomerTxnQuery, useMakeApproveCustomerTxnMutation } = authApi