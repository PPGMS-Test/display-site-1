import Root from "./root";
import ErrorPage from "../pages/error-page";
import ApplePay from "../pages/ApplePay";
import GooglePay from "../pages/GooglePay";
import Venmo from "../pages/Venmo";
import Tooltips from "../pages/Tooltips";
import ShoppingCartBCDC from "../pages/ShoppingCartBCDC";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/tooltips",
        element: <Tooltips />,
      },
      {
        path: "/shoppingCartBCDC",
        element: <ShoppingCartBCDC />,
      },
      {
        path: "/applePay",
        element: <ApplePay />,
      },
      {
        path: "/googlePay",
        element: <GooglePay />,
      },
      {
        path: "/venmo",
        element: <Venmo />,
      },
    ],
  },
]);

export default router;
