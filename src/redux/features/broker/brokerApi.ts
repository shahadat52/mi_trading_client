import { baseApi } from "../../api/baseApi";


const brokerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBroker: builder.mutation({
            query: (brokerData) => (
                {
                    url: "/broker/create",
                    method: "POST",
                    body: { brokerData },
                }
            ),
            invalidatesTags: ['Broker', 'Brokers', 'BrokerTxn']
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

        getSpecificBrokerTxn: builder.query({
            query: (id) => (
                {
                    url: `/brokerTxn/${id}`,
                    method: 'GET',
                }),
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

        brokerUpdate: builder.mutation({
            query: (payload) => (
                {
                    url: `/broker/update/${payload.id}`,
                    method: "PATCH",
                    body: { name: payload.name, phone: payload.phone }
                }
            ),
            invalidatesTags: ['BrokerTxn', 'Brokers', 'Broker']
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

export const { useCreateBrokerMutation, useBrokerTxnEntryMutation, useGetAllBrokersQuery, useGetBrokerByIdQuery, useGetSpecificBrokerTxnQuery, useUpdateBrokerTxnMutation, useBrokerDeleteMutation, useBrokerUpdateMutation, useDeleteBrokerTxnMutation } = brokerApi