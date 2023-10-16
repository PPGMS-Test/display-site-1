import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface WithShipping {
    isWithShipping: boolean;
}

const initialState: WithShipping = {
    isWithShipping: true,
} as WithShipping;

export const isShippingOptionSlice = createSlice({
    name: "shippingOption",
    initialState,
    reducers: {
        setShippingOption: (state, action: PayloadAction<boolean>) => {
            // console.log("来自toggle的值:", action.payload);
            state.isWithShipping = action.payload;
        },
    },
});

export const { setShippingOption } = isShippingOptionSlice.actions;

export const getShippingOption = (state: RootState) =>
    state.withShippingOption.isWithShipping;

export default isShippingOptionSlice.reducer;
