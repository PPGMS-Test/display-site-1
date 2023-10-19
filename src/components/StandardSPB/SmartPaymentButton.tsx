import React, { FC, useEffect } from "react";
// import PayPal_SPB_JS_SDK_LoadScript from "../LoadPayPalScript/JSSDK";
import CreateOrderObjectFn from "../LoadPayPalScript/createOrderObject";

// import { useAppSelector } from "../../typeHooks";
// import { getBuyerInfo } from "../../reducer/reducers/buyerInfoReducer";

import UseJSSDK from "../LoadPayPalScript/UseJSSDK";

const SPB: FC = () => {
    // const buyerInfo = useAppSelector((state) => getBuyerInfo(state));
    // const buyerInfo = useAppSelector((state) => state.buyerInfo);
    const renderBtn = () => {
        if (window.paypal) {
            let button = window.paypal.Buttons(CreateOrderObjectFn());
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
            debugger;
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
