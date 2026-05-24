import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


type TCoutha = {
    kuli: number | string;
    brokary: number | string;
    arot: number | string;
    transport_rent: number | string

}

const initialState: TCoutha = {
    kuli: '',
    brokary: '',
    arot: '',
    transport_rent: ''
};


const couthaSlice = createSlice({
    name: "coutha",
    initialState,
    reducers: {
        setLabour(state, action: PayloadAction<number>) {
            state.kuli = action.payload
        },
        setBrokery(state, action: PayloadAction<number>) {
            state.brokary = action.payload
        },
        setArot(state, action: PayloadAction<number>) {
            state.arot = action.payload
        },
        setTransportRent(state, action: PayloadAction<number>) {
            state.transport_rent = action.payload
        }
    },
});

export const {
    setLabour,
    setArot,
    setBrokery,
    setTransportRent
} = couthaSlice.actions;

export default couthaSlice.reducer;
