import React, { FC, useEffect } from "react";
import CreateOrderObject from "../LoadPayPalScript/createOrderObject";
// import PayPal_SPB_JS_SDK_LoadScript from "../LoadPayPalScript/JSSDK";
import { useAppSelector } from "../../typeHooks";
import UseJSSDK from "../LoadPayPalScript/UseJSSDK";

const BCDCButton: FC = () => {
    const buyerInfo = useAppSelector((state) => state.buyerInfo);
    const isWithShippingOption = useAppSelector(
        (state) => state.withShippingOption.isWithShipping
    ) as boolean;

    useEffect(() => {
        (async () => {
            // console.log(
            //     "JS SDK states:",
            //     (PayPal_SPB_JS_SDK_LoadScript as any).readyState
            // );

            await UseJSSDK();
            debugger;
            if (window.paypal) {
                let button = window.paypal.Buttons({
                    fundingSource: window.paypal.FUNDING.CARD,
                    ...CreateOrderObject(buyerInfo, isWithShippingOption),
                });
                if (button.isEligible()) {
                    button.render("#paypal-button-container");
                }
            }
        })();
    });

    return (
        <div>
            <div id="paypal-button-container"></div>
        </div>
    );
};
export default BCDCButton;
