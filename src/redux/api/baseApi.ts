import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth?.auth?.token;
            if (token) {
                headers.set('authorization', `${token}`)
            }
            return headers;
        }
    }),
    tagTypes: ['Users', 'Employees', 'Purchases', 'CommissionPurchase', 'RegularPurchase', 'Products', 'ProductStock', 'ProductDetails', 'CommissionSales', 'CommissionProduct', 'Couthas', 'Coutha', 'Receivable', 'Payable', 'CustomerTxn', 'Customer', 'Supplier', 'SupplierTxn', 'Sales', 'BothSales', 'Deliveries', 'Stock', 'Income', 'Expenses', 'Account', 'Transaction', 'Transactions', 'Brokers', 'Broker', 'BrokerTxn', "Sectors", "InExTxn", 'Cashbox', 'CashIn', 'CashOut', 'Attendances', 'Attendance'],
    endpoints: () => ({}),
});     