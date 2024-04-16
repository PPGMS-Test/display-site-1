import ErrorPage from "../pages/error-page";

import ShoppingCartBCDC from "../pages/ShoppingCartBCDC";

import Product from "../pages/Product";
import Thankyou from "../pages/Thankyou";
import App from "../App";
import lab from "./labRoutes";
import { createBrowserRouter } from "react-router-dom";
import DisplayRoot from "../pages/DisplayRoot";

const createDisplayRoot = (displaySubRoot: string) => {
    return {
        path: `/${displaySubRoot}`,
        element: <DisplayRoot />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: `/${displaySubRoot}`,
                element: <Product />,
            },
            {
                path: `/${displaySubRoot}product`,
                element: <Product />,
            },
            {
                path: `/${displaySubRoot}shoppingCartBCDC`,
                element: <ShoppingCartBCDC />,
            },
            {
                path: `/${displaySubRoot}thankyou`,
                element: <Thankyou />,
            },
        ],
    };
};

const createMyRouterContent = () => {
    let rootRoutersList = [];

    if (process.env.REACT_APP_LAB_ROUTER === "TRUE") {
        rootRoutersList.push(lab);
    }
    if (process.env.REACT_APP_SHOW_ENTRENCE_PAGE === "TRUE") {
        rootRoutersList.push(
            {
                path: "/",
                element: <App />,
                errorElement: <ErrorPage />,
            },
            createDisplayRoot("display/")
        );
    } else {
        rootRoutersList.push(createDisplayRoot(""));
    }
    // debugger;
    return rootRoutersList;
};

// createBrowserRouter([
//     {
//         path: "/",
//         element: <App />,
//         errorElement: <ErrorPage />,
//     },
//     {
//         path: "/display",
//         element: <DisplayRoot />,
//         errorElement: <ErrorPage />,
//         children: [
//             {
//                 path: "/display/",
//                 element: <Product />,
//             },
//             {
//                 path: "/display/product",
//                 element: <Product />,
//             },
//             {
//                 path: "/display/shoppingCartBCDC",
//                 element: <ShoppingCartBCDC />,
//             },
//             {
//                 path: "/display/thankyou",
//                 element: <Thankyou />,
//             },
//         ],
//     },
//     lab,
// ]);

const router = createBrowserRouter(createMyRouterContent());

export default router;
