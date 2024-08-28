import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


const initialState = {
    JsSDKClientID: "AfT9T73YOOVSPXNJb8pd9E4WkuwFl1NDM5naClS9HwORvc7mlppOzVHMqzSMAo3oZ7-zyqLgo5SbHPV2",
    JsSDKSecretKey: "ECFSfdTPHh5qezz-5nTWYSNTtmIxke64jVJkDZINSYVNCp0zOkZ2tQAKDQlQ8WYwm9iHwQ13jrQPHUiQ",
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
