import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TBroker } from "../../../pages/broker/SearchableSelectField";



type TBrokerBalance = {
    balance: number,
    broker: { name: string, _id: string },
};


const initialState: TBrokerBalance = {
    broker: { name: '', _id: '' },
    balance: 0,
};

export const brokerSlice = createSlice({
    name: 'broker',
    initialState,
    reducers: {
        setBroker(state, action: PayloadAction<TBroker>) {
            state.broker = action.payload;
        },
        setBalance: (state, action) => {
            state.balance = action.payload;

        },

    },
})

export const { setBroker, setBalance } = brokerSlice.actions


export default brokerSlice.reducer