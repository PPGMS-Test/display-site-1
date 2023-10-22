import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { act } from "@testing-library/react";

export interface ShoppingCartItem {
    ProductName: string;
    count: number;
    value: number;
    totalValue?: number;
}

export interface ShoppingCartList {
    // [index:number]: ShoppingCartItem
    list: ShoppingCartItem[];
}

const initialState: ShoppingCartList = { list: [] };

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        updateShoppingCart: (
            state,
            action: PayloadAction<ShoppingCartItem>
        ) => {
            let newList = [...state.list];

            let inputItem = action.payload;
            inputItem.totalValue =
                Math.floor(inputItem.count * inputItem.value * 100) / 100;
            let target = newList.find(
                (item) => item.ProductName === inputItem.ProductName
            );
            // debugger;

            //TODO//待完成
            //获取代理对象的指应该还有别的更优雅的办法
            if (target) {
                target.ProductName = inputItem.ProductName;
                target.count = inputItem.count;
                target.value = inputItem.value;
                target.totalValue = inputItem.totalValue;
            } else {
                newList.push(inputItem);
            }
            state.list = newList;
        },
    },
});

export const { updateShoppingCart } = shoppingCartSlice.actions;

export const getShoppingCart = (state: RootState) => state.shoppingCart.list;

export default shoppingCartSlice.reducer;
