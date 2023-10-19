import { configureStore } from "@reduxjs/toolkit";
import paymentMethodReducer from "./reducers/paymentMethodReducer";
import moreSpaceReducer from "./reducers/moreSpaceReducer";
import buyerInfoReducer from "./reducers/buyerInfoReducer";
import shippingOptionReducer from "./reducers/shippingOptionReducer";
import productReducer from "./reducers/productReducer";
import shoppingCartReducer from "./reducers/shoppingCartReducer";

const store = configureStore({
    reducer: {
        paymentMethod: paymentMethodReducer,
        isMoreSpace: moreSpaceReducer,
        buyerInfo: buyerInfoReducer,
        withShippingOption: shippingOptionReducer,
        productInfo:productReducer,
        shoppingCart:shoppingCartReducer
    },
});

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
