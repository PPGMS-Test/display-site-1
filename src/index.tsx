import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {  RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/createRouter";
import store from "./reducer/store";
import { Provider } from "react-redux";

console.table(process.env)


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
