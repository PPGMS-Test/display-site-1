import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/createRouter";
import store from "./reducer/store";
import { Provider } from "react-redux";

// import PayPal_SPB_JS_SDK_LoadScript from "./service/LoadPayPalScript/NoPromiseSDK";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
