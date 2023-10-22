import React, { FC, useEffect } from "react";
// import PayPal_SPB_JS_SDK_LoadScript from "../LoadPayPalScript/JSSDK";
import CreateOrderObjectFn from "../../service/LoadPayPalScript/createOrderObject";

// import { useAppSelector } from "../../typeHooks";
// import { getBuyerInfo } from "../../reducer/reducers/buyerInfoReducer";

import UseJSSDK from "../../service/LoadPayPalScript/UseJSSDK";
import { useNavigate, useLocation } from "react-router-dom";

interface ButtonType {
    buttonType: string;
}

const SPB: FC<ButtonType> = ({ buttonType }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const pathname = location.pathname;

    const getLink = () => {
        if (pathname.startsWith("/lab")) {
            return "/lab/thankyou";
        } else if (pathname.startsWith("/display")) {
            return "/display/thankyou";
        } else {
            return "";
        }
    };

    // const buyerInfo = useAppSelector((state) => getBuyerInfo(state));
    // const buyerInfo = useAppSelector((state) => state.buyerInfo);
    const renderBtn = () => {
        if (window.paypal) {
            let button;
            let obj = CreateOrderObjectFn({
                navigate,
                getLink,
            });
            if (buttonType === "BCDC") {
                button = window.paypal.Buttons({
                    fundingSource: window.paypal.FUNDING.CARD,
                    ...obj,
                });
            } else {
                button = window.paypal.Buttons(obj);
            }

            if (button.isEligible()) {
                button.render("#paypal-button-container");
            }
        }
    };
    useEffect(() => {
        (async () => {
            // console.log(
            //     "JS SDK states:",
            //     (PayPal_SPB_JS_SDK_LoadScript as any).readyState
            // );
            // debugger;
            await UseJSSDK().then(renderBtn);
        })();
        // console.log("JS SDK states:", PayPal_SPB_JS_SDK_LoadScript.readyState);

        // debugger;
    });

    return (
        <div>
            <div id="paypal-button-container"></div>
        </div>
    );
};
export default SPB;
