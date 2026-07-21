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
            query: ({ startDate, endDate, }) => {
                const params = new URLSearchParams();
                if (startDate) {
                    params.append('startDate', startDate);
                }
                if (endDate) {
                    params.append('endDate', endDate);
                }
                return {
                    url: "/customerTxn",
                    method: 'GET',
                    params
                }
            },
            providesTags: ['CustomerTxn']
        }),

        getAllTxnByCustomer: builder.query({
            query: ({ id, startDate, endDate, limit }) => {
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
                    url: `/customerTxn/${id}`,
                    method: 'GET',
                    params
                }
            },
            providesTags: ['CustomerTxn']
        }),

        getCustomerDue: builder.query({
            query: ({ id }) => (
                {
                    url: `/customerTxn/due/${id}`,
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

        sendTxnSms: builder.mutation({
            query: (payload) => (

                {
                    url: `/sms/txn`,
                    method: "POST",
                    body: payload

                }
            )
        }),

        sendDueSms: builder.mutation({
            query: (payload) => (
                {
                    url: `/sms/due`,
                    method: "POST",
                    body: payload

                }
            )
        }),

        getTotalDueFromAllCustomers: builder.query({
            query: () => (
                {
                    url: "/customerTxn/totaldue",
                    method: 'GET',
                })
        }),



    }),
});

export const { useAddCustomerMutation, useGetAllCustomersQuery, useGetCustomerByIdQuery, useUpdateCustomerDataMutation, useCustomerTxnEntryMutation, useGetAllCustomerTxnQuery, useGetCustomerDueQuery, useGetAllTxnByCustomerQuery, useUpdateCustomerTxnMutation, useDeleteCustomerTxnMutation, useDeleteCustomerMutation, useGetUnapprovedCustomerTxnQuery, useMakeApproveCustomerTxnMutation, useSendTxnSmsMutation, useSendDueSmsMutation, useGetTotalDueFromAllCustomersQuery } = authApi