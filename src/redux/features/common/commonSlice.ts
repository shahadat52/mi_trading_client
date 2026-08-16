import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



type TCommon = {
    partyState: string;
    partyLimit: number;
    productState: string
};

const initialState: TCommon = {
    partyState: 'Customer',
    partyLimit: 10,
    productState: 'normal'
};

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        // ---------- Basic Fields ----------
        setPartyState(state, action: PayloadAction<string>) {
            state.partyState = action.payload;
        },
        setPartyLimit(state, action: PayloadAction<number>) {
            state.partyLimit = action.payload;
        },
        setProductState(state, action: PayloadAction<string>) {
            state.productState = action.payload;
        },


    },
});

export const {
    setPartyState,
    setPartyLimit,
    setProductState
} = commonSlice.actions;

export default commonSlice.reducer;