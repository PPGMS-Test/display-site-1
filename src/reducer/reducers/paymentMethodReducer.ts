import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PaymentState {
  method: number;
}

const initialState: PaymentState = {
  method: 1,
};

export const paymentSlice = createSlice({
  name: "payment_method",
  initialState,
  reducers: {
    setPaymentMethod: (state, action: PayloadAction<number>) => {
      state.method = action.payload;
    },
  },
});

export const { setPaymentMethod } = paymentSlice.actions;
// export const select_payment_method = (state) => state.payment_method.method;

export default paymentSlice.reducer;
