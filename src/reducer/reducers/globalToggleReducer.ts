import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface MoreCSSSpace {
    useMoreSpace: boolean;
}

const initialState: MoreCSSSpace = {
    useMoreSpace: false,
} ;

export const globalToggleSlice = createSlice({
    name: "globalToggle",
    initialState,
    reducers: {
        setIsMoreSpace: (state, action: PayloadAction<boolean>) => {
            console.log('来自toggle的值:',action.payload)
            state.useMoreSpace = action.payload;
        },
    },
});

export const { setIsMoreSpace } = globalToggleSlice.actions;

export const getIsMoreSpace = (state: RootState) =>
    state.globalToggle.useMoreSpace;

export default globalToggleSlice.reducer;
