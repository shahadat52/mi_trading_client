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
            invalidatesTags: ['Customer']
        }),
        getAllCustomers: builder.query({
            query: (query) => (
                new URLSearchParams(query).toString(),
                {
                    url: `/customer?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['Customer']
        }),



    }),
});

export const { useAddCustomerMutation, useGetAllCustomersQuery } = authApi