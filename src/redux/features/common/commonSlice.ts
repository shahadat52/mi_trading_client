import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



type TCommon = {
    partyState: string;
    partyLimit: number;
    productState: string;
    drawerController: boolean;
};

const initialState: TCommon = {
    partyState: 'Customer',
    partyLimit: 10,
    productState: 'normal',
    drawerController: false
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
        setDrawerController(state, action: PayloadAction<boolean>) {
            state.drawerController = action.payload;
        },


    },
});

export const {
    setPartyState,
    setPartyLimit,
    setProductState,
    setDrawerController
} = commonSlice.actions;

export default commonSlice.reducer;