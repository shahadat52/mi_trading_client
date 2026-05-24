import { baseApi } from "../../api/baseApi";


const partyLedgerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllPayableTxn: builder.query({
            query: ({ search, type, limit }) => {
                const params = new URLSearchParams();

                if (search) params.append('searchTerm', search);
                if (type) params.append('type', type);
                if (limit) params.append('limit', String(limit));

                return {
                    url: `/supplierTxn/outStanding?${params.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['Payable'],
        }),

        getAllReceivableTxn: builder.query({
            query: ({ search, limit, category }) => {
                const params = new URLSearchParams();

                if (search) params.append('searchTerm', search);
                if (limit) params.append('limit', String(limit));
                if (category) params.append('category', category);

                return {
                    url: `/customerTxn/outStanding?${params.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['Receivable'],
        }),


    }),
});

export const { useGetAllPayableTxnQuery, useGetAllReceivableTxnQuery } = partyLedgerApi