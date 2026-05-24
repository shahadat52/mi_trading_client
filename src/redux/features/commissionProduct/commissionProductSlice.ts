import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export type TCommissionProduct = {
    name: string;
    lot: string;
    quantity: number | string;
    supplier: string;
    commissionRatePercent: number;
    isPaid: boolean;

}

const initialState: TCommissionProduct = {
    name: "",
    supplier: "",
    lot: "",
    quantity: "",
    commissionRatePercent: 0,
    isPaid: false
};



const commissionProductSlice = createSlice({
    name: "commissionProduct",
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        setSupplier(state, action: PayloadAction<string>) {
            state.supplier = action.payload;
        },
        setLot(state, action: PayloadAction<string>) {
            state.lot = action.payload;
        },
        setQuantity(state, action: PayloadAction<number>) {
            state.quantity = action.payload;
        },
        setCommissionRatePercent(state, action: PayloadAction<number>) {
            state.commissionRatePercent = action.payload;
        },
        resetForm() {
            return initialState;
        },
    },
});

export const {
    setName,
    setSupplier,
    setLot,
    setQuantity,
    setCommissionRatePercent,
    resetForm,
} = commissionProductSlice.actions;

export default commissionProductSlice.reducer;