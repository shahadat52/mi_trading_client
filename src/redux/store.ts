import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import authReducer from "./features/auth/authSlice";
import salesReducer from "./features/sales/salesSlice";
import cartReducer from "./features/cart/cartSlice";
import purchaseReducer from "./features/purchase/purchaseSlice";
import productReducer from "./features/product/productSlice";
import couthaReducer from "./features/coutha/couthaSlice";
import brokerReducer from "./features/broker/brokerSlice";
import commissionSalesReducer from "./features/commissionSales/commissionSalesSlice";
import commissionProductReducer from "./features/commissionProduct/commissionProductSlice";
import storage from 'redux-persist/lib/storage'

import { baseApi } from "./api/baseApi";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedReducer,
        purchase: purchaseReducer,
        product: productReducer,
        cart: cartReducer,
        sales: salesReducer,
        commissionSales: commissionSalesReducer,
        commissionProduct: commissionProductReducer,
        coutha: couthaReducer,
        broker: brokerReducer
    },
    devTools: {
        name: 'M.I Trading ERP'

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,]
            }
        }).concat(baseApi.middleware),
});

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch