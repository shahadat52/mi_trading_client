/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        deliveryEntryAndUpdate: builder.mutation({
            query: (deliveryData: any) => (
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

        deliveryStatusUpdate: builder.mutation({
            query: ({ id, invoice }) => (
                {
                    url: `/deliveries/${id}`,
                    method: "PATCH",
                    body: { invoice },
                }),
            invalidatesTags: ['Sales', 'Deliveries']
        }),
        uploadImage: builder.mutation<any, FormData>({
            query: ({ formData, id }: any) => (
                {
                    url: `/deliveries/upload/${id}`,
                    method: "PATCH",
                    body: formData,
                }
            ),
            invalidatesTags: ["Deliveries"],
        }),



    }),
});

export const { useDeliveryEntryAndUpdateMutation, useGetDeliveriesQuery, useDeliveryStatusUpdateMutation, useUploadImageMutation } = authApi