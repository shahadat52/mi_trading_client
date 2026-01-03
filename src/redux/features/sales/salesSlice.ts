import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CommissionSales {
    customer: string;

}

const initialState: CommissionSales = {
    customer: "",
};



const salesSlice = createSlice({
    name: "commissionSales",
    initialState,
    reducers: {
        setCustomer(state, action: PayloadAction<string>) {
            console.log(action)
            state.customer = action.payload;
        },
        resetForm() {
            return initialState;
        },
    },
});

export const {
    setCustomer,
    resetForm,
} = salesSlice.actions;

export default salesSlice.reducer;
