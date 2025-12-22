import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (productData) => (
                {
                    url: "/products/add",
                    method: "POST",
                    body: productData,
                    credentials: 'include',
                }
            ),
            invalidatesTags: ['Product']
        }),
        getAllProducts: builder.query({
            query: (query) => (
                new URLSearchParams(query).toString(),
                {
                    url: `/products?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['Product']
        }),

        getAllProductNames: builder.query({
            query: (query) => (
                new URLSearchParams(query).toString(),
                {
                    url: `/products/names?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['Product']
        }),

        deleteProduct: builder.mutation({
            query: (id) => (
                {
                    url: `/products/${id}`,
                    method: "DELETE",

                }
            ),
            invalidatesTags: ['Product']
        }),
    }),
});

export const { useAddProductMutation, useGetAllProductsQuery, useGetAllProductNamesQuery, useDeleteProductMutation } = authApi