import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";




const initialState = {
    vaultClientID: "AbRrAHhyWN1Zl5ncAB1hhnRZRP9YXAk67UpAgl_JhEzOheLecqHmWDWEVJMCr5q1uPUevVwNG81KD1uH",
    vaultSecretKey: "",
    vaultSellerID: "TKHKEBQ3K8L283PS"
}

export const vaultSlice = createSlice({
    name: "vault",
    initialState,
    reducers: {
        setVaultClientID: (state, action: PayloadAction<string>) => {
            state.vaultClientID = action.payload;
        },
        setVaultSecretKey: (state, action: PayloadAction<string>) => {
            state.vaultClientID = action.payload;
        },
        setVaultSellerID: (state, action: PayloadAction<string>) => {
            state.vaultClientID = action.payload;
        },
    },
});

export const { setVaultClientID, setVaultSecretKey, setVaultSellerID } = vaultSlice.actions;

export const getVaultClientID = (state: RootState) => state.vault.vaultClientID;
export const getVaultSecretKey = (state: RootState) =>
    state.vault.vaultSecretKey;
export const getVaultSellerID = (state: RootState) =>
    state.vault.vaultSellerID;

export default vaultSlice.reducer;
