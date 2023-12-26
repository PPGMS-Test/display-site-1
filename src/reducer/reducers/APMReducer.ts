import { APMMethod } from './../../pages/APM/index';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


//默认的支付方式
const initialState: string = "Bancontact"

export const paymentSlice = createSlice({
    name: "APM_Method",
    initialState,
    reducers: {
        setAPMMethod: (state, action: PayloadAction<string>) => {
            state = action.payload;
        },
    },
});

export const { setAPMMethod } = paymentSlice.actions;

//获取当前的支付方式
export const getAPMMethod = (state: RootState): string =>
    state.APMMethod;

export default paymentSlice.reducer;
