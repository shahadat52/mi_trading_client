import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TSaleItem = {
    name: string
    product: string;
    quantity: number;
    salePrice: number;
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
    broker: string;
    items: TSaleItem[]
    others: number | string;
    grandTotal: number | string;
    paidAmount: number | string;
    paymentMethod: string;
    bankInfo: {
        bankName?: string;
        type?: string;
        amount?: number;
        issueDate?: string;
        postingDate?: string;
        note?: string;
    },
    comments: string
};

const initialState: TCart = {
    customer: { name: '', _id: '' },
    date: new Date().toISOString(),
    labour: 0,
    customerCommission: 0,
    broker: "",
    items: [],
    others: 0,
    grandTotal: 0,
    paidAmount: 0,
    paymentMethod: "cash",
    bankInfo: {
        bankName: '',
        type: '',
        amount: 0,
        issueDate: new Date().toISOString(),
        postingDate: new Date().toISOString(),
        note: ''
    },
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

        setBroker(state, action: PayloadAction<string>) {
            state.broker = action.payload;
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

        setBankName(state, action: PayloadAction<string>) {
            state.bankInfo.bankName = action.payload;
        },
        setBankAmount(state, action: PayloadAction<number>) {
            state.bankInfo.amount = action.payload;
        },
        setBankTxnType(state, action: PayloadAction<string>) {
            state.bankInfo.type = action.payload;
        },
        setIssueDate(state, action: PayloadAction<string>) {
            state.bankInfo.issueDate = action.payload;
        },
        setPostingDate(state, action: PayloadAction<string>) {
            state.bankInfo.postingDate = action.payload;
        },
        setBankNote(state, action: PayloadAction<string>) {
            state.bankInfo.note = action.payload;
        },
        setComments(state, action: PayloadAction<string>) {
            state.comments = action.payload;
        },

        /* ---------------- CALCULATION ---------------- */
        calculateGrandTotal(state) {
            const itemsTotal = state.items.reduce(
                (sum, item) => sum + item.quantity * item.salePrice,
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

            console.log(action)
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
    setBroker,
    setLabour,
    setCustomerCommission,
    setOthers,
    setPaidAmount,
    setPaymentMethod,
    setBankName,
    setBankAmount,
    setBankTxnType,
    setIssueDate,
    setPostingDate,
    setBankNote,
    setComments,
    updateSalePrice,
    updateCommissionRate,
    updateQuantity,
    addItem,
    updateItem,
    removeItem,
    calculateGrandTotal,
    resetCart,
} = cartSlice.actions;

export default cartSlice.reducer