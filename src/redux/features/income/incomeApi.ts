import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addIncome: builder.mutation({
            query: (incomeData) => (
                {
                    url: "/income/add",
                    method: "POST",
                    body: incomeData,
                }
            ),
            invalidatesTags: ['Income']
        }),
        getAllIncomes: builder.query({
            query: (query) => (
                new URLSearchParams(query).toString(),
                {
                    url: `/income?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['Income']
        }),



    }),
});

export const { useAddIncomeMutation, useGetAllIncomesQuery } = authApi