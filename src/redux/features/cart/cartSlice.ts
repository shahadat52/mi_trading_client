/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TSaleItem = {
    name: string
    product: string;
    quantity: number | "";
    salePrice: number;
    bosta: number | string;
    unit: string;
    profit?: number;
    commission?: number;
    supplier?: string;
    lot?: number
};

export type TCustomer = {
    name: string;
    _id: string;
    phone?: string;
    address?: string;
};
export type TCart = {
    customer: TCustomer;
    date: string;
    labour: number | string;
    customerCommission: number | string;
    broker: { name: '', _id: '' };
    brokerBill: number;
    items: TSaleItem[]
    others: number | string;
    grandTotal: number | string;
    paidAmount: number | string;
    paymentMethod: string;
    comments: string
};

const initialState: TCart = {
    customer: { name: '', _id: '' },
    date: new Date().toISOString(),
    labour: 0,
    customerCommission: 0,
    broker: { name: '', _id: '' },
    brokerBill: 0,
    items: [],
    others: 0,
    grandTotal: 0,
    paidAmount: 0,
    paymentMethod: "cash",
    comments: ''

};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCustomer(state, action: PayloadAction<TCustomer>) {
            state.customer = action.payload as any;
        },

        setDate(state, action: PayloadAction<string>) {
            state.date = action.payload;
        },

        setBrokerName(state, action: PayloadAction<any>) {
            state.broker = action.payload;
        },
        setBrokerBill(state, action: PayloadAction<number>) {
            state.brokerBill = action.payload;
        },



        setLabour(state, action: PayloadAction<number | string>) {
            state.labour = action.payload;
        },

        setCustomerCommission(state, action: PayloadAction<number | string>) {
            state.customerCommission = action.payload;
        },

        setOthers(state, action: PayloadAction<number | string>) {
            state.others = action.payload;
        },

        setPaidAmount(state, action: PayloadAction<number | string>) {
            state.paidAmount = action.payload;
        },

        setPaymentMethod(state, action: PayloadAction<string>) {
            state.paymentMethod = action.payload;
        },

        setComments(state, action: PayloadAction<string>) {
            state.comments = action.payload;
        },

        /* ---------------- CALCULATION ---------------- */
        calculateGrandTotal(state) {
            const itemsTotal = state.items.reduce(
                (sum, item) => sum + Number(item.quantity) * Number(item.salePrice),
                0
            );

            state.grandTotal =
                itemsTotal +
                Number(state.labour || 0) +
                Number(state.customerCommission || 0) +
                Number(state.others || 0);
        },


        /* ---------------- ITEMS ---------------- */
        addItem(state, action: PayloadAction<TSaleItem>) {
            state.items.push(action.payload);
        },
        updateSalePrice: (
            state,
            action: PayloadAction<{ productId: string; salePrice: number }>
        ) => {
            const item = state.items.find(
                (item) => item.product === action.payload.productId
            );

            if (item) {
                item.salePrice = action.payload.salePrice;
            }
        },

        updateCommissionRate: (
            state,
            action: PayloadAction<{ productId: string; commission: number }>
        ) => {
            const item = state.items.find(
                (item) => item.product === action.payload.productId
            );

            if (item) {
                item.commission = action.payload.commission;
            }
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ productId: string; quantity: number }>
        ) => {
            const item = state.items.find(
                (item) => item.product === action.payload.productId
            );

            if (item) {
                item.quantity = action.payload.quantity;
            }
        },

        updateBosta: (
            state,
            action: PayloadAction<{ productId: string; bosta: number }>
        ) => {
            const item = state.items.find(
                (item) => item.product === action.payload.productId
            );

            if (item) {
                item.bosta = action.payload.bosta;
            }
        },


        updateItem(
            state,
            action: PayloadAction<{ index: number; item: Partial<TSaleItem> }>
        ) {
            const { index, item } = action.payload;
            state.items[index] = {
                ...state.items[index],
                ...item,
            };
        },

        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(
                (item) => item.product !== action.payload
            );
        },


        /* ---------------- RESET ---------------- */
        resetCart() {
            return initialState;
        },
    },
});


export const {
    setCustomer,
    setDate,
    setBrokerName,
    setBrokerBill,
    setLabour,
    setCustomerCommission,
    setOthers,
    setPaidAmount,
    setPaymentMethod,
    setComments,
    updateSalePrice,
    updateCommissionRate,
    updateQuantity,
    updateBosta,
    addItem,
    updateItem,
    removeItem,
    calculateGrandTotal,
    resetCart,
} = cartSlice.actions;

export default cartSlice.reducer