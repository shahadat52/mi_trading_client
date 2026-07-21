import { baseApi } from "../../api/baseApi";


const mfsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // API for sector
        mfsTxnEntry: builder.mutation({
            query: (txnData: any) => (
                {
                    url: "/mfs/entry",
                    method: "POST",
                    body: txnData
                }
            ),
            invalidatesTags: ['MFS']
        }),

        getAllMfsTxns: builder.query({
            query: ({ dateFrom, dateTo }) => {
                const params = new URLSearchParams();

                if (dateFrom) {
                    params.append("dateFrom", dateFrom);
                }
                if (dateTo) {
                    params.append("dateTo", dateTo);
                }

                return {
                    url: "/mfs/txns",
                    method: "GET",
                    params,
                };
            },
            providesTags: ['MFS']
        }),

        getMfsTxnByHead: builder.query({
            query: ({ head }) => {
                const params = new URLSearchParams();

                if (head) params.append('head', head);

                return {
                    url: `/mfs?${params.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['MFS'],
        }),

        updateMfsTxn: builder.mutation({
            query: (payload) => (
                {
                    url: `/mfs/${payload.id}`,
                    method: "PATCH",
                    body: payload.data,
                }
            ),
            invalidatesTags: ['MFS']
        }),

        deleteMfsTxn: builder.mutation({
            query: (id) => (
                {
                    url: `/mfs/${id}`,
                    method: "DELETE",
                }
            ),
            invalidatesTags: ['MFS']
        }),
    }),
});

export const { useMfsTxnEntryMutation, useGetAllMfsTxnsQuery, useGetMfsTxnByHeadQuery, useUpdateMfsTxnMutation, useDeleteMfsTxnMutation } = mfsApi