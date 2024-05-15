// ***************************************************
// ************    全      ***************************
// ************    局      ***************************
// ************    标      ***************************
// ************    识      ***************************
// ************    位      ***************************
// ***************************************************

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ToggleParam {
    pendingRenderSPBFlag: boolean;
}

const initialState: ToggleParam = {
    pendingRenderSPBFlag: false,
};

export const globalMarkerFlagSlicer = createSlice({
    name: "globalToggle",
    initialState,
    reducers: {
        setPendingRenderSPBFlag: (state, action: PayloadAction<boolean>) => {

            state.pendingRenderSPBFlag = action.payload;
        }
    },
});

export const { setPendingRenderSPBFlag } = globalMarkerFlagSlicer.actions;

export const getPendingRenderSPBFlag = (state: RootState) =>
    state.globalMarkerFlag.pendingRenderSPBFlag;


export default globalMarkerFlagSlicer.reducer;
