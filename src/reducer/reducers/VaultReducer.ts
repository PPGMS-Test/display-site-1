import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type VaultReducerType = {
    vaultSetting: {
        oneTime: {
            isOneTime: boolean,
            oneTimeSetting: {
                isSavePayPalWallet: boolean,
                isSaveACDC: boolean
            }
        },
        recurring: {
            isRecurring: boolean,
            recurringSetting: {
                isUsePayPalWallet: boolean,
                isUseACDC: boolean
            }
        }
    },
    vaultData: {
        paypalWallet: {
            customerId: string,
            vaultId: string,
            merchantID: string
        },
        acdc: {
            customerId: string,
            vaultId: string,
            merchantID: string
        }
    }
}

const initialState: VaultReducerType = {
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
        paypalWallet: {
            customerId: "lmCozwDftT",
            vaultId: "3y87970523539652h",
            merchantID: "CMHAMMNAXCMGA"
        },
        acdc: {
            customerId: "gmstestbuyeracdc",
            vaultId: "",
            merchantID: ""
        }
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

        setPayPalWalletVaultID: (state, action: PayloadAction<string>) => {
            state.vaultData.paypalWallet.vaultId = action.payload;
        },
        setPayPalWalletCustomerID: (state, action: PayloadAction<string>) => {
            state.vaultData.paypalWallet.customerId = action.payload;
        },
        setPayPalWalletMerchantID: (state, action: PayloadAction<string>) => {
            state.vaultData.paypalWallet.merchantID = action.payload;
        },
        setACDCVaultID: (state, action: PayloadAction<string>) => {
            state.vaultData.acdc.vaultId = action.payload;
        },
        setACDCCustomerID: (state, action: PayloadAction<string>) => {
            state.vaultData.acdc.customerId = action.payload;
        },
        setACDCMerchantID: (state, action: PayloadAction<string>) => {
            state.vaultData.acdc.merchantID = action.payload;
        },
    },
});

export const { setOneTimeFlag, setRecurringFlag, setSaveACDCFlag, setSavePayPalWalletFlag, setUseACDCFlag, setUsePayPalWalletFlag, setVaultData, setVaultSetting } = vaultSlice.actions;
export const getVaultSetting = (state: RootState) => state.vault.vaultSetting;
export const getVaultData = (state: RootState) => state.vault.vaultData;
export const getOneTimeFlag = (state: RootState) => state.vault.vaultSetting.oneTime.isOneTime;
export const getSavePayPalWalletFlag = (state: RootState) => state.vault.vaultSetting.oneTime.oneTimeSetting.isSavePayPalWallet;
export const getSaveACDCFlag = (state: RootState) => state.vault.vaultSetting.oneTime.oneTimeSetting.isSaveACDC;

export const getRecurringFlag = (state: RootState) => state.vault.vaultSetting.recurring.isRecurring;
export const getUsePayPalWalletFlag = (state: RootState) => state.vault.vaultSetting.recurring.recurringSetting.isUsePayPalWallet;
export const getUseACDCFlag = (state: RootState) => state.vault.vaultSetting.recurring.recurringSetting.isUseACDC;

export const getPayPalWalletVaultID = (state: RootState) => state.vault.vaultData.paypalWallet.vaultId;

export const getPayPalWalletCustomerID = (state: RootState) => state.vault.vaultData.paypalWallet.customerId;

export const getPayPalWalletMerchantID = (state: RootState) => state.vault.vaultData.paypalWallet.merchantID;

export const getACDCVaultID = (state: RootState) => state.vault.vaultData.acdc.vaultId;

export const getACDCCustomerID = (state: RootState) => state.vault.vaultData.acdc.customerId;

export const getACDCMerchantID = (state: RootState) => state.vault.vaultData.acdc.merchantID;

export default vaultSlice.reducer;
