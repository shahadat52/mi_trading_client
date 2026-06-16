import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TMemo {
    dueShow: boolean;

}

const initialState: TMemo = {
    dueShow: false,
};



const salesSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {
        setDueShow(state, action: PayloadAction<boolean>) {
            state.dueShow = action.payload;
        },
        resetForm() {
            return initialState;
        },
    },
});

export const {
    setDueShow,
    resetForm,
} = salesSlice.actions;

export default salesSlice.reducer;
