/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const inExTxnApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // API for sector
        createSector: builder.mutation({
            query: (sectorData: any) => (
                {
                    url: "/sector/create",
                    method: "POST",
                    body: sectorData
                }
            ),
            invalidatesTags: ['Sectors']
        }),
        getAllSectors: builder.query({
            query: ({ head }) => {
                console.log('search')
                const params = new URLSearchParams();
                if (head) {
                    params.append('head', head);
                }
                return {
                    url: `/sector?${params.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['Sectors']
        }),


        // API for income expesne 
        txnEntry: builder.mutation({
            query: (transactionData: any) => (
                {
                    url: "/txn/entry",
                    method: "POST",
                    body: transactionData
                }
            ),
            invalidatesTags: ['InExTxn']
        }),

        getAllTxn: builder.query({
            query: ({ category, limit, search, head, startDate, endDate }) => {
                const params = new URLSearchParams();
                if (head) {
                    params.append('head', head);
                }
                if (category) {
                    params.append('category', category);
                }
                if (search) {
                    params.append('search', search);
                }

                if (limit) {
                    params.append('limit', limit);
                }

                if (startDate && endDate) {
                    params.append('startDate', startDate);
                    params.append('endDate', endDate);
                }


                return {
                    url: `/txn?${params.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['InExTxn']
        }),

        deleteTxnOfINEX: builder.mutation({
            query: (id: any) => (
                {
                    url: `/txn/${id}`,
                    method: "DELETE"
                }
            ),
            invalidatesTags: ['InExTxn']
        }),



    }),
});

export const { useCreateSectorMutation, useGetAllSectorsQuery, useTxnEntryMutation, useGetAllTxnQuery, useDeleteTxnOfINEXMutation } = inExTxnApi