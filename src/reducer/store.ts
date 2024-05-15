import { APMMethod } from './../pages/APM/index';
import { configureStore } from "@reduxjs/toolkit";
import paymentMethodReducer from "./reducers/paymentMethodReducer";
import globalToggleReducer from "./reducers/globalToggleReducer";
import buyerInfoReducer from "./reducers/buyerInfoReducer";
import shippingOptionReducer from "./reducers/shippingOptionReducer";
import productReducer from "./reducers/productReducer";
import shoppingCartReducer from "./reducers/shoppingCartReducer";
import orderReducer from "./reducers/orderReducer";
import APMReducer from "./reducers/APMReducer";
import VaultReducer from './reducers/VaultReducer';
import ClientSecretReducer from './reducers/ClientSecretReducer';
import globalMarkerFlag from './reducers/globalMarkerFlagReducer';

const store = configureStore({
    reducer: {
        paymentMethod: paymentMethodReducer,
        globalToggle: globalToggleReducer,
        buyerInfo: buyerInfoReducer,
        withShippingOption: shippingOptionReducer,
        productInfo: productReducer,
        shoppingCart: shoppingCartReducer,
        orderInfo: orderReducer,
        APMMethod: APMReducer,
        vault: VaultReducer,
        JsSDKInfo:ClientSecretReducer,
        globalMarkerFlag: globalMarkerFlag
    },
});

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
