import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addExpense: builder.mutation({
            query: (expenseData) => (
                {
                    url: "/expense/add",
                    method: "POST",
                    body: expenseData,
                }
            ),
            invalidatesTags: ['Expenses']
        }),
        getAllExpenses: builder.query({
            query: (query) => (
                new URLSearchParams(query).toString(),
                {
                    url: `/expense?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['Expenses']
        }),



    }),
});

export const { useAddExpenseMutation, useGetAllExpensesQuery } = authApi