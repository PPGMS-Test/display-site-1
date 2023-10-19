import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface MoreCSSSpace {
    useMoreSpace: boolean;
}

const initialState: MoreCSSSpace = {
    useMoreSpace: false,
} as MoreCSSSpace;

export const useMoreSpaceSlice = createSlice({
    name: "moreSpace",
    initialState,
    reducers: {
        setIsMoreSpace: (state, action: PayloadAction<boolean>) => {
            console.log('来自toggle的值:',action.payload)
            state.useMoreSpace = action.payload;
        },
    },
});

export const { setIsMoreSpace } = useMoreSpaceSlice.actions;

export const getIsMoreSpace = (state: RootState) =>
    state.isMoreSpace.useMoreSpace;

export default useMoreSpaceSlice.reducer;
