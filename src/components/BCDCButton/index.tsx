import React, { FC, useEffect } from "react";
import CreateOrderObject from "../LoadPayPalScript/createOrderObject";
import PayPal_SPB_JS_SDK_LoadScript from "../LoadPayPalScript/JSSDK";
import { useAppSelector } from "../../typeHooks";

const BCDCButton: FC = () => {
    const buyerInfo = useAppSelector((state) => state.buyerInfo);

    useEffect(() => {
        console.log("JS SDK states:", (PayPal_SPB_JS_SDK_LoadScript as any).readyState);

        // debugger;
        if (window.paypal) {
            let button = window.paypal.Buttons({
                fundingSource: window.paypal.FUNDING.CARD,
                ...CreateOrderObject(buyerInfo),
            });
            if (button.isEligible()) {
                button.render("#paypal-button-container");
            }
        }
    });

    return (
        <div>
            <div id="paypal-button-container"></div>
        </div>
    );
};
export default BCDCButton;
