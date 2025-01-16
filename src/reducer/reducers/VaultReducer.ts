import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


const initialState = {
    vaultSetting: {
        oneTime: {
            isOneTime: true,
            oneTimeSetting: {
                isSavePayPalWallet: true,
                isSaveACDC: false
            }
        },
        recurring: {
            isRecurring: false,
            recurringSetting: {
                isUsePayPalWallet: false,
                isUseACDC: false
            }
        }
    },
    vaultData: {

    }
}

export const vaultSlice = createSlice({
    name: "vault",
    initialState,
    reducers: {
        setVaultSetting: (state, action: PayloadAction<any>) => {
            state.vaultSetting = action.payload;
        },
        setVaultData: (state, action: PayloadAction<any>) => {
            state.vaultData = action.payload;
        },
        setOneTimeFlag: (state, action: PayloadAction<any>) => {
            state.vaultSetting.oneTime.isOneTime = action.payload;
        },
        setRecurringFlag: (state, action: PayloadAction<boolean>) => {
            state.vaultSetting.recurring.isRecurring = action.payload;
        },
        setSavePayPalWalletFlag: (state, action: PayloadAction<boolean>) => {
            state.vaultSetting.oneTime.oneTimeSetting.isSavePayPalWallet = action.payload;
        },
        setSaveACDCFlag: (state, action: PayloadAction<boolean>) => {
            state.vaultSetting.oneTime.oneTimeSetting.isSaveACDC = action.payload;
        },
        setUsePayPalWalletFlag: (state, action: PayloadAction<boolean>) => {
            state.vaultSetting.recurring.recurringSetting.isUsePayPalWallet = action.payload;
        },
        setUseACDCFlag: (state, action: PayloadAction<boolean>) => {
            state.vaultSetting.recurring.recurringSetting.isUseACDC = action.payload;
        },
    },
});

export const { setOneTimeFlag, setRecurringFlag, setSaveACDCFlag, setSavePayPalWalletFlag, setUseACDCFlag, setUsePayPalWalletFlag, setVaultData, setVaultSetting } = vaultSlice.actions;
export const getVaultSetting = (state: RootState) => state.vault.vaultSetting;


export default vaultSlice.reducer;
