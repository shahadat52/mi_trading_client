import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import authReducer from "./features/auth/authSlice";
import storage from 'redux-persist/lib/storage'

import { baseApi } from "./api/baseApi";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    // products: productsReducer,
    // cart: cartReducer,
    // address: addressReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedReducer,
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