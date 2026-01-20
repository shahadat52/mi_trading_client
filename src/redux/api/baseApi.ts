import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_API_URL,
        prepareHeaders: (headers, { getState }) => {

            const token = (getState() as RootState).auth?.auth?.token;

            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `${token}`)
            }
            return headers;
        }
    }),
    tagTypes: ['User', 'Purchase', 'Product', 'CommissionSales', 'CommissionProduct', 'Settlement', 'CustomerTxn', 'Customer', 'Supplier', 'SupplierTxn', 'Sales', 'Deliveries', 'Stock', 'Income', 'Expenses', 'Account', 'Transaction'],
    endpoints: () => ({}),
});     