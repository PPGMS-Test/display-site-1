import Root from "../pages/LabRoot";
import APM from "../pages/APM";
import ApplePay from "../pages/ApplePay";
import GooglePay from "../pages/GooglePay";
import HomePage from "../pages/HomePage";
import Product from "../pages/Product";
import ShoppingCartBCDC from "../pages/ShoppingCartBCDC";
import SinglePageTest from "../pages/SingleTestPage";
import Thankyou from "../pages/Thankyou";
import JSSDKParamsPlayground from "../pages/PaymentSetting/PaymentSetting";
// import Tooltips from "../pages/Tooltips";

import PositionedTooltips from "../pages/Tooltips";

import Venmo from "../pages/Venmo";
import ErrorPage from "../pages/error-page";
import VaultIndex from "../pages/Vault/VaultIndex";

import ACDCSingleDisplay from "@/pages/ACDC/ACDCSingleDisplay";

const lab = {
    path: "/lab",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: "/lab/tooltips",
            element: <PositionedTooltips />,
        },

        {
            path: "/lab/thankyou",
            element: <Thankyou />,
        },

        {
            path: "/lab/todoList",
            element: <JSSDKParamsPlayground />,
        },
        {
            path: "/lab/product",
            element: <Product />,
        },
        {
            path: "/lab/shoppingCartBCDC",
            element: <ShoppingCartBCDC />,
        },
        {
            path: "/lab/applePay",
            element: <ApplePay />,
        },
        {
            path: "/lab/googlePay",
            element: <GooglePay />,
        },
        {
            path: "/lab/venmo",
            element: <Venmo />,
        },
        {
            path: "/lab/APM",
            element: <APM />,
        },
        {
            path: "/lab",
            element: <HomePage />,
        },
        {
            path: "/lab/singlePageTest",
            element: <SinglePageTest />,
        },
        {
            path: "/lab/vault",
            element: <VaultIndex />,
        },
        {
            path: "/lab/ACDC",
            element: <ACDCSingleDisplay />,
        },
    ],
}

export default lab;