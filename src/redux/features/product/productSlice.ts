import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TProductCost = {
    totalCost: number
}

const initialState: TProductCost = {
    totalCost: 0
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setTotalCost(state, action: PayloadAction<number>) {
            state.totalCost = action.payload
        }
    }
});

export const {
    setTotalCost
} = productSlice.actions;

export default productSlice.reducer