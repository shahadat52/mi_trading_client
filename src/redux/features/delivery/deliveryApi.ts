/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        deliveryEntryAndUpdate: builder.mutation({
            query: (deliveryData: any) => (
                console.log(deliveryData),
                {
                    url: "/deliveries/create",
                    method: "POST",
                    body: deliveryData
                }
            ),
            invalidatesTags: ['Sales', 'Deliveries']
        }),

        getDeliveries: builder.query({
            query: (query) => (
                {
                    url: `/deliveries/all?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['Deliveries']
        }),



    }),
});

export const { useDeliveryEntryAndUpdateMutation, useGetDeliveriesQuery } = authApi