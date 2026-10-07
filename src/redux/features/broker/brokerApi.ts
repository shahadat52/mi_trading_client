import { baseApi } from "../../api/baseApi";


const brokerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBroker: builder.mutation<any, FormData>({
            query: (brokerData) => (
                {
                    url: "/broker/create",
                    method: "POST",
                    body: brokerData,
                }
            ),
            invalidatesTags: ['Broker', 'Brokers', 'BrokerTxn']
        }),

        brokerUpdate: builder.mutation<any, { id: string; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `/broker/update/${id}`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["BrokerTxn", "Brokers", "Broker"],
        }),

        brokerTxnEntry: builder.mutation({
            query: (brokerTxnData) => (
                {
                    url: "/brokerTxn/entry",
                    method: "POST",
                    body: brokerTxnData,
                }
            ),
            invalidatesTags: ['BrokerTxn', 'Broker']
        }),

        getAllBrokers: builder.query({
            query: ({ limit, searchTerm }) => {
                const params = new URLSearchParams();
                if (searchTerm) {
                    params.append('searchTerm', searchTerm);
                }
                if (limit) {
                    params.append('limit', limit);
                }

                return {
                    url: `/broker?${params.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['Brokers']
        }),

        getBrokerById: builder.query({
            query: (id) => (
                {
                    url: `/broker/${id}`,
                    method: 'GET',
                }),
            providesTags: ['Broker']
        }),

        getBrokerTxns: builder.query({
            query: ({ startDate, endDate, limit }) => {
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
                    url: "/brokerTxn",
                    method: 'GET',
                    params
                }
            },
            providesTags: ['BrokerTxn']
        }),


        getSpecificBrokerTxn: builder.query({
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
                    url: `/brokerTxn/${id}`,
                    method: 'GET',
                    params
                }
            },
            providesTags: ['BrokerTxn']
        }),

        updateBrokerTxn: builder.mutation({
            query: (payload) => (
                {
                    url: `/brokerTxn/${payload.id}`,
                    method: "PATCH",
                    body: payload.data,
                }
            ),
            invalidatesTags: ['BrokerTxn', 'Broker']
        }),

        brokerDelete: builder.mutation({
            query: (payload) => (
                {
                    url: `/broker/delete/${payload}`,
                    method: "DELETE"
                }
            ),
            invalidatesTags: ['BrokerTxn', 'Brokers']
        }),



        deleteBrokerTxn: builder.mutation({
            query: (id) => (
                {
                    url: `/broker/brokerTxn/${id}`,
                    method: "DELETE",
                }
            ),
            invalidatesTags: ['BrokerTxn', 'Brokers', 'Broker']
        }),



    }),
});

export const { useCreateBrokerMutation, useBrokerTxnEntryMutation, useGetAllBrokersQuery, useGetBrokerByIdQuery, useGetBrokerTxnsQuery, useGetSpecificBrokerTxnQuery, useUpdateBrokerTxnMutation, useBrokerDeleteMutation, useBrokerUpdateMutation, useDeleteBrokerTxnMutation } = brokerApi