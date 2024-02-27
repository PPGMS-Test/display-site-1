import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


const initialState = {
    JsSDKClientID: "AaupPo8G66AlZPSMxOMUtvQx2oSlP_8fMqOpYS-mTW0wsJkeXqfuBAVrvF1jx-gnzkUqGNRLHTD-VR_x",
    JsSDKSecretKey: "EK8hqlHecd2m5k3tEpppVe6Xj5McpzlL8qVV57dWtxGtjmzC0Pp-fmLMZkdgUixG4Zee6qOUtxbFyCrD",
    isCustomizedClient: false
}

export const JsSDInfoSlice = createSlice({
    name: "JsSDKInfo",
    initialState,
    reducers: {
        setJsSDKClientID: (state, action: PayloadAction<string>) => {
            state.JsSDKClientID = action.payload;
        },
        setJsSDKSecretKey: (state, action: PayloadAction<string>) => {
            state.JsSDKSecretKey = action.payload;
        },
        setIsCustomizedClient: (state, action: PayloadAction<boolean>) => {
            state.isCustomizedClient = action.payload;
        },
    },
});

export const { setJsSDKClientID, setJsSDKSecretKey, setIsCustomizedClient } = JsSDInfoSlice.actions;

export const getJsSDKClientID = (state: RootState) => state.JsSDKInfo.JsSDKClientID;
export const getVaultSecretKey = (state: RootState) =>
    state.JsSDKInfo.JsSDKSecretKey;
export const getIsCustomizedClient = (state: RootState) =>
    state.JsSDKInfo.isCustomizedClient;

export default JsSDInfoSlice.reducer;
