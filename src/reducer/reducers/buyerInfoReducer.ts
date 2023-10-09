import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import user_data from "../../Mock/Person/Tom.json";
import address_data from "../../Mock/Address/TomAddress.json";
import { User } from "../../interface/user/User";
import { Address } from "../../interface/address/Address";

export interface BuyerInfo {
    Contact: User;
    Address: Address;
}

const initialState: BuyerInfo = {
    Contact: user_data,
    Address: address_data,
} as BuyerInfo;

export const buyerInfoSlice = createSlice({
    name: "buyerInfo",
    initialState,
    reducers: {
        setBuyerInfo: (state, action: PayloadAction<BuyerInfo>) => {
            state.Address = action.payload.Address;
            state.Contact = action.payload.Contact;
        },
    },
});

export const { setBuyerInfo } = buyerInfoSlice.actions;

export const getBuyerInfo = (state: RootState) => state.buyerInfo;

export default buyerInfoSlice.reducer;
