import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PaymentState {
  method: number;
}

//默认的支付方式是1
const initialState: PaymentState = {
  method: 2,
} as PaymentState;

export const paymentSlice = createSlice({
  name: "payment_method",
  initialState,
  reducers: {
    //改变store中的支付方式
    setPaymentMethod: (state, action: PayloadAction<number>) => {
      state.method = action.payload;
    },
  },
});

export const { setPaymentMethod } = paymentSlice.actions;

//获取当前的支付方式
export const get_payment_method = (state: RootState) =>
  state.paymentMethod.method;

export default paymentSlice.reducer;
