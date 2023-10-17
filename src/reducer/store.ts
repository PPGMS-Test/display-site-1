import { configureStore } from "@reduxjs/toolkit";
import paymentMethodReducer from "./reducers/paymentMethodReducer";
import moreSpaceReduer from "./reducers/moreSpaceReduer";
import buyerInfoReducer from "./reducers/buyerInfoReducer";
import shippingOptionReducer from "./reducers/shippingOptionReducer";
import productReducer from "./reducers/productReducer";

const store = configureStore({
    reducer: {
        paymentMethod: paymentMethodReducer,
        isMoreSpace: moreSpaceReduer,
        buyerInfo: buyerInfoReducer,
        withShippingOption: shippingOptionReducer,
        productInfo:productReducer
    },
});

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
