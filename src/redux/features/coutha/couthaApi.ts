import { baseApi } from "../../api/baseApi";

/* eslint-disable @typescript-eslint/no-explicit-any */
const couthaApi = baseApi.injectEndpoints({


    // server bepariChoutha module 
    endpoints: (builder) => ({
        createCoutha: builder.mutation({
            query: (settlementData: any) => ({
                url: "/settlement",
                method: "POST",
                body: settlementData,
            }),
            invalidatesTags: ['Couthas', 'Account'],
        }),

        getCouthaById: builder.query({
            query: (id) => ({
                url: `/settlement/coutha/${id}`,
                method: 'GET'
            }),
            providesTags: ['Coutha'],
        }),

        getAllCouthasOfSupplier: builder.query({
            query: (query) => ({
                url: `/settlement/${query}`,
                method: 'GET',
                params: query
            }),
            providesTags: ['Couthas'],
        }),

        getFieldWiseData: builder.query({
            query: (field) => {
                const params = new URLSearchParams();

                if (field) {
                    params.append("field", field);
                }

                return {
                    url: "/settlement/field",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["Couthas"],
        }),



        updateBepariCoutha: builder.mutation({
            query: (updatedData) => (
                {
                    url: `/settlement/${updatedData.id}`,
                    method: 'PATCH',
                    body: updatedData.data
                }),
            invalidatesTags: ['CustomerTxn', 'Customer', 'Couthas', 'Coutha']
        }),

        deleteBepariCoutha: builder.mutation({
            query: (id) => (
                {
                    url: `/settlement/${id}`,
                    method: 'DELETE'
                }),
            invalidatesTags: ['CustomerTxn', 'Customer', 'Couthas', 'Coutha']
        }),

    }),
});

export const { useCreateCouthaMutation, useGetAllCouthasOfSupplierQuery, useGetCouthaByIdQuery, useGetFieldWiseDataQuery, useUpdateBepariCouthaMutation, useDeleteBepariCouthaMutation } = couthaApi;