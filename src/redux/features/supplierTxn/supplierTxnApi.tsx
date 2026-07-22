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
            invalidatesTags: ['SupplierTxn', 'Transaction', 'Supplier', 'Receivable', 'MFS']
        }),

        bepariTxnEntry: builder.mutation({
            query: (bepariTxnData) => (

                {
                    url: "/supplierTxn/bepariEntry",
                    method: "POST",
                    body: bepariTxnData
                }
            ),
            invalidatesTags: ['SupplierTxn', 'Transaction', 'Supplier', 'Receivable']
        }),
        getAllSupplierTxn: builder.query({
            query: ({ startDate, endDate }) => {
                const params = new URLSearchParams();
                if (startDate) {
                    params.append('startDate', startDate);
                }
                if (endDate) {
                    params.append('endDate', endDate);
                }
                return {
                    url: "/supplierTxn",
                    method: 'GET',
                    params
                }
            },
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
                    url: `/supplierTxn/update/${updatedData.id}`,
                    method: 'PATCH',
                    body: updatedData.data
                }),
            invalidatesTags: ['SupplierTxn', 'Supplier', 'Payable']
        }),
        deleteSupplierTxn: builder.mutation({
            query: (id) => (
                {
                    url: `/supplierTxn/${id}`,
                    method: "DELETE",

                }
            ),
            invalidatesTags: ['SupplierTxn', 'Payable']
        }),

        getUnapprovedSupplierTxn: builder.query({
            query: () => (
                {
                    url: '/supplierTxn/unapproved',
                    method: 'GET',
                }),
            providesTags: ['UnapprovedSupplierTxn']
        }),

        makeApproveSupplierTxn: builder.mutation({
            query: (id) => (
                {
                    url: `/supplierTxn/approve/${id}`,
                    method: "PATCH",

                }
            ),
            invalidatesTags: ['UnapprovedSupplierTxn']
        }),
        sendSupplierTxnSms: builder.mutation({
            query: (payload) => (

                {
                    url: `/sms/supplier/txn`,
                    method: "POST",
                    body: payload

                }
            )
        }),

        sendSupplierDueSms: builder.mutation({
            query: (payload) => (
                {
                    url: `/sms/supplier/due`,
                    method: "POST",
                    body: payload

                }
            )
        }),

        getTotalPayableToSupplier: builder.query({
            query: ({ supplierType }) => {
                const params = new URLSearchParams();
                if (supplierType) {
                    params.append('supplierType', supplierType);
                }

                return {
                    url: "/supplierTxn/totalpayable",
                    method: 'GET',
                    params
                }
            }
        })
    }),
});

export const { useSupplierTxnEntryMutation, useBepariTxnEntryMutation, useGetAllSupplierTxnQuery, useGetSpecificSupplierTxnQuery, useUpdateSupplierTxnDataMutation, useDeleteSupplierTxnMutation, useGetUnapprovedSupplierTxnQuery, useMakeApproveSupplierTxnMutation, useSendSupplierTxnSmsMutation, useSendSupplierDueSmsMutation, useGetTotalPayableToSupplierQuery } = supplierTxnApi