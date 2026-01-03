import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Item {
    product: string;
    quantity: number;
    salesPrice: number;
    commissionRatePercent: number;
    total: number;
}

interface CommissionSales {
    customer: string;
    supplier: string;
    items: Item[];
    paymentMethod: string;
    date: string;
    totalAmount?: number;
    totalCommission?: number;
    notes: string;
}

const initialState: CommissionSales = {
    customer: "",
    supplier: "",
    items: [],
    paymentMethod: "Cash",
    notes: "",
    date: "",
    totalAmount: 0,
    totalCommission: 0
};

const calculateTotals = (state: CommissionSales) => {
    state.totalAmount = state.items.reduce((sum, item) => sum + item.total, 0);

    state.totalCommission = state.items.reduce(
        (sum, item) =>
            sum + item.quantity * item.salesPrice * (item.commissionRatePercent / 100),
        0
    );
};


const commissionSalesSlice = createSlice({
    name: "commissionSales",
    initialState,
    reducers: {
        setCustomer(state, action: PayloadAction<string>) {
            console.log(action)
            state.customer = action.payload;
        },
        setSupplier(state, action: PayloadAction<string>) {
            state.supplier = action.payload;
        },
        addItem(state, action: PayloadAction<Item>) {
            state.items.push(action.payload);
            calculateTotals(state);
        },
        updateItem(state, action: PayloadAction<{ index: number; item: Partial<Item> }>) {
            const { index, item } = action.payload;

            // merge safely
            state.items[index] = { ...state.items[index], ...item };

            // auto calculate total for that item
            const i = state.items[index];
            i.total = i.quantity * i.salesPrice;

            calculateTotals(state);
        },
        removeItem(state, action: PayloadAction<number>) {
            state.items.splice(action.payload, 1);
            calculateTotals(state);
        },
        setPaymentMethod(state, action: PayloadAction<string>) {
            state.paymentMethod = action.payload;
        },
        setDate(state, action: PayloadAction<string>) {
            state.date = action.payload;
        },
        setTotalAmount(state, action: PayloadAction<number>) {
            state.totalAmount = action.payload
        },
        setTotalCommission(state, action: PayloadAction<number>) {
            state.totalCommission = action.payload
        },
        setNotes(state, action: PayloadAction<string>) {
            state.notes = action.payload;
        },
        resetForm() {
            return initialState;
        },
    },
});

export const {
    setCustomer,
    setSupplier,
    addItem,
    updateItem,
    removeItem,
    setPaymentMethod,
    // setTotalAmount,
    // setTotalCommission,
    setDate,
    setNotes,
    resetForm,
} = commissionSalesSlice.actions;

export default commissionSalesSlice.reducer;
