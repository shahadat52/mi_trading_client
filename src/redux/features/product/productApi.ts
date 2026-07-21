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
            invalidatesTags: ['Products']
        }),
        getAllProducts: builder.query({
            query: ({ searchTerm, limit, startDate, endDate }) => {
                const params = new URLSearchParams();

                if (searchTerm) {
                    params.append('searchTerm', searchTerm);
                }
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
                    url: "/products",
                    method: 'GET',
                    params
                }
            },
            providesTags: ['Products']
        }),

        getProductsStock: builder.query({
            query: ({ searchTerm }) => (
                {
                    url: `/products/stock?searchTerm=${searchTerm}`,
                    method: 'GET',
                }),
            providesTags: ['ProductStock']
        }),
        getProductDetails: builder.query({
            query: (id) => (
                {
                    url: `/products/${id}`,
                    method: 'GET',
                }),
            providesTags: ['ProductDetails']
        }),

        getAllProductNames: builder.query({
            query: (query) => (
                new URLSearchParams(query).toString(),
                {
                    url: `/products/names?${new URLSearchParams(query).toString()}`,
                    method: 'GET',
                }),
            providesTags: ['Products']
        }),
        updateProduct: builder.mutation({
            query: (payload) => (
                {
                    url: `/products/update/${payload?.id}`,
                    method: "PATCH",
                    body: payload?.data

                }
            ),
            invalidatesTags: ['Products', 'ProductDetails']
        }),

        deleteProduct: builder.mutation({
            query: (id) => (
                {
                    url: `/products/${id}`,
                    method: "DELETE",

                }
            ),
            invalidatesTags: ['Products']
        }),
    }),
});

export const { useAddProductMutation, useGetAllProductsQuery, useGetProductsStockQuery, useGetProductDetailsQuery, useGetAllProductNamesQuery, useUpdateProductMutation, useDeleteProductMutation } = authApi