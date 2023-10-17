import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import PAYMENT_METHOD from "../../enum/PAYMENT_METHOD";

interface PaymentState {
  method: PAYMENT_METHOD;
}

//默认的支付方式是1
const initialState: PaymentState = {
  method: PAYMENT_METHOD.PAYPAL_STANDARD,
} as PaymentState;

export const paymentSlice = createSlice({
  name: "payment_method",
  initialState,
  reducers: {
    //改变store中的支付方式
    setPaymentMethod: (state, action: PayloadAction<PAYMENT_METHOD>) => {
      state.method = action.payload;
    },
  },
});

export const { setPaymentMethod } = paymentSlice.actions;

//获取当前的支付方式
export const get_payment_method = (state: RootState) =>
  state.paymentMethod.method;

export default paymentSlice.reducer;
