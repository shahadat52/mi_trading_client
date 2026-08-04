import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TFinalSale = {
    bosta: number;
    quantity: number;
    price: number;
    total: number;
};

type TCoutha = {
    kuli: number;
    brokary: number;
    arot: number;
    transport_rent: number;
    tohori: number;
    haolat: number;
    godi: number;
    finalSales: TFinalSale[];
};

const initialState: TCoutha = {
    kuli: 0,
    brokary: 0,
    arot: 0,
    transport_rent: 0,
    tohori: 0,
    haolat: 0,
    godi: 0,
    finalSales: [],
};

const couthaSlice = createSlice({
    name: "coutha",
    initialState,
    reducers: {
        // ---------- Basic Fields ----------
        setLabour(state, action: PayloadAction<number>) {
            state.kuli = action.payload;
        },

        setBrokery(state, action: PayloadAction<number>) {
            state.brokary = action.payload;
        },

        setArot(state, action: PayloadAction<number>) {
            state.arot = action.payload;
        },

        setTransportRent(state, action: PayloadAction<number>) {
            state.transport_rent = action.payload;
        },

        setTohori(state, action: PayloadAction<number>) {
            state.tohori = action.payload;
        },

        setHaolat(state, action: PayloadAction<number>) {
            state.haolat = action.payload;
        },

        setGodi(state, action: PayloadAction<number>) {
            state.godi = action.payload;
        },

        // ---------- Final Sales ----------
        addFinalSale(state) {
            state.finalSales.push({
                bosta: 0,
                quantity: 0,
                price: 0,
                total: 0,
            });
        },

        updateFinalSale(
            state,
            action: PayloadAction<{
                index: number;
                field: keyof Omit<TFinalSale, "total">;
                value: number;
            }>
        ) {
            const { index, field, value } = action.payload;

            state.finalSales[index][field] = value;

            state.finalSales[index].total =
                state.finalSales[index].quantity *
                state.finalSales[index].price;
        },

        removeFinalSale(state, action: PayloadAction<number>) {
            state.finalSales.splice(action.payload, 1);
        },

        resetFinalSales(state) {
            state.finalSales = [];
        },

        setFinalSales(state, action: PayloadAction<TFinalSale[]>) {
            state.finalSales = action.payload;
        },

        resetCoutha() {
            return initialState;
        },
    },
});

export const {
    setLabour,
    setBrokery,
    setArot,
    setTransportRent,
    setTohori,
    setHaolat,
    setGodi,

    addFinalSale,
    updateFinalSale,
    removeFinalSale,
    resetFinalSales,
    setFinalSales,

    resetCoutha,
} = couthaSlice.actions;

export default couthaSlice.reducer;