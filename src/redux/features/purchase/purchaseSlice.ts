/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { calculateGrandTotal } from "../cart/cartSlice";

/* ---------------- TYPES ---------------- */

export type TUnit =
    | "কেজি"
    | "পিস"
    | "মণ"
    | "বস্তা"
    | "লিটার"
    | "বক্স"
    | "টন";

export type TPurchaseType = "regular" | "due";

export type TSupplier = {
    _id: string;
    name: string;
    phone?: string;
    address?: string;
};

export type TPurchase = {
    product: string;
    sku: string;
    unit: TUnit;
    supplier: string;
    broker: string;
    purchaseDate: string;
    purchaseType: TPurchaseType;
    labour: number | string;
    isLabourPaid: boolean
    commission: number | string;
    isCommissionPaid: boolean
    others: number | string;
    isOthersPaid: boolean
    othersField: string;
    quantity: number | string;
    bosta: number | string;
    purchasePrice: number | string;

    paidAmount: number | string;
    note: string;
    invoice?: string;

    isDeleted?: boolean;
    isVerified?: boolean;

    subTotal: number | string;
    grandTotal: number | string;
    dueAmount: number | string;
};

/* ---------------- INITIAL STATE ---------------- */

const initialState: TPurchase = {
    product: "",
    sku: "",
    unit: "কেজি",
    supplier: "",
    broker: "",
    purchaseDate: new Date().toISOString(),
    purchaseType: "regular",

    labour: 0,
    isLabourPaid: false,
    commission: 0,
    isCommissionPaid: false,
    others: 0,
    isOthersPaid: false,
    othersField: "",

    quantity: 0,
    bosta: 0,
    purchasePrice: 0,
    paidAmount: 0,
    note: "",

    subTotal: 0,
    grandTotal: 0,
    dueAmount: 0,
};

/* ---------------- SLICE ---------------- */

const purchaseSlice = createSlice({
    name: "purchase",
    initialState,
    reducers: {
        /* ---------------- BASIC FIELDS ---------------- */

        setProduct(state, action: PayloadAction<any>) {
            state.product = action.payload.name;
            state.sku = action.payload.sku
        },

        setUnit(state, action: PayloadAction<any>) {
            state.unit = action.payload;
        },

        setSupplier(state, action: PayloadAction<string>) {
            state.supplier = action.payload;
        },
        setBroker(state, action: PayloadAction<string>) {
            state.broker = action.payload;
        },

        setPurchaseDate(state, action: PayloadAction<string>) {
            state.purchaseDate = action.payload;
        },

        setPurchaseType(state, action: PayloadAction<TPurchaseType>) {
            state.purchaseType = action.payload;
        },

        setLabour(state, action: PayloadAction<number | string>) {
            state.labour = action.payload;
            calculateGrandTotal()
        },

        setIsLabourPaid(state, action: PayloadAction<boolean>) {
            state.isLabourPaid = action.payload;
        },

        setCommission(state, action: PayloadAction<number | string>) {
            state.commission = action.payload;
            calculateGrandTotal()
        },

        setIsCommissionPaid(state, action: PayloadAction<boolean>) {
            state.isCommissionPaid = action.payload;
        },

        setOthers(state, action: PayloadAction<number | string>) {
            state.others = action.payload;
            calculateGrandTotal()
        },

        setIsOthersPaid(state, action: PayloadAction<boolean>) {
            state.isOthersPaid = action.payload;
        },

        setOthersField(state, action: PayloadAction<string>) {
            state.othersField = action.payload;
        },

        setQuantity(state, action: PayloadAction<number | string>) {
            state.quantity = action.payload;
            calculateGrandTotal()
        },

        setBosta(state, action: PayloadAction<number | string>) {
            state.bosta = action.payload;
        },

        setPurchasePrice(state, action: PayloadAction<number | string>) {
            state.purchasePrice = action.payload;
            calculateGrandTotal()
        },


        setPaidAmount(state, action: PayloadAction<number | string>) {
            state.paidAmount = action.payload;
        },

        setNote(state, action: PayloadAction<string>) {
            state.note = action.payload;
        },
        /* ---------------- BULK UPDATE ---------------- */
        updatePurchaseField(
            state,
            action: PayloadAction<Partial<TPurchase>>
        ) {
            Object.assign(state, action.payload);
        },

        /* ---------------- CALCULATIONS ---------------- */
        calculatePurchaseTotals(state) {
            const subTotal =
                Number(state.quantity || 0) * Number(state.purchasePrice || 0);

            const grandTotal =
                subTotal +
                Number(state.labour || 0) +
                Number(state.commission || 0) +
                Number(state.others || 0);

            const dueAmount = grandTotal - Number(state.paidAmount || 0);

            state.subTotal = subTotal;
            state.grandTotal = grandTotal;
            state.dueAmount = dueAmount < 0 ? 0 : dueAmount;
        },

        /* ---------------- FULL FORM SETTER (EDIT MODE) ---------------- */
        setPurchaseForEdit(state, action: PayloadAction<Partial<TPurchase>>) {
            return {
                ...state,
                ...action.payload,
            };
        },

        /* ---------------- RESET ---------------- */
        resetPurchase() {
            return initialState;
        },
    },
});

/* ---------------- EXPORT ACTIONS ---------------- */

export const {
    setProduct,
    setUnit,
    setSupplier,
    setBroker,
    setPurchaseDate,
    setPurchaseType,
    setLabour,
    setIsLabourPaid,
    setCommission,
    setIsCommissionPaid,
    setOthers,
    setIsOthersPaid,
    setOthersField,
    setQuantity,
    setBosta,
    setPurchasePrice,
    setPaidAmount,
    setNote,
    updatePurchaseField,
    calculatePurchaseTotals,
    setPurchaseForEdit,
    resetPurchase,
} = purchaseSlice.actions;

export default purchaseSlice.reducer;