import { baseApi } from "../../api/baseApi";


const chequeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllReceivableCheque: builder.query({
            query: () => (
                {
                    url: "/bothSales/cheque/due",
                    method: "GET"
                }

            ),
            providesTags: ['ReceivableCheque']
        }),
        getAllPayableCheque: builder.query({
            query: () => (
                {
                    url: '/purchase/cheque/due',
                    method: 'GET',
                }
            ),
            providesTags: ['PayableCheque']
        }),



    }),
});

export const { useGetAllReceivableChequeQuery, useGetAllPayableChequeQuery } = chequeApi