import ErrorPage from "../pages/error-page";

import ShoppingCartBCDC from "../pages/ShoppingCartBCDC";

import Product from "../pages/Product";
import Thankyou from "../pages/Thankyou";
import App from "../App";
import lab from "./labRoute";
import { createBrowserRouter } from "react-router-dom";
import DisplayRoot from "../pages/DisplayRoot";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/display",
        element: <DisplayRoot />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/display/",
                element: <Product />,
            },
            {
                path: "/display/product",
                element: <Product />,
            },
            {
                path: "/display/shoppingCartBCDC",
                element: <ShoppingCartBCDC />,
            },
            {
                path: "/display/thankyou",
                element: <Thankyou />,
            },
        ],
    },
    lab,
]);

export default router;
