import React, { FC, useEffect } from "react";
import CreateOrderObject from "../LoadPayPalScript/createOrderObject";
// import PayPal_SPB_JS_SDK_LoadScript from "../LoadPayPalScript/JSSDK";
import UseJSSDK from "../LoadPayPalScript/UseJSSDK";

// import { useAppSelector } from "../../typeHooks";
// import { getBuyerInfo } from "../../reducer/reducers/buyerInfoReducer";

const BCDCButton: FC = () => {
    // const buyerInfo = useAppSelector((state) => getBuyerInfo(state));
    // const isWithShippingOption = useAppSelector(
    //     (state) => state.withShippingOption.isWithShipping
    // ) as boolean;

    const renderBtn = ()=>{
        debugger;
        if (window.paypal) {
            let button = window.paypal.Buttons({
                fundingSource: window.paypal.FUNDING.CARD,
                ...CreateOrderObject(),
            });
            if (button.isEligible()) {
                button.render("#paypal-button-container");
            }
        }
    }

    useEffect(() => {
        (async () => {
            // console.log(
            //     "JS SDK states:",
            //     (PayPal_SPB_JS_SDK_LoadScript as any).readyState
            // );
            debugger;
            await UseJSSDK().then(renderBtn);
           
        })();
    });

    return (
        <div>
            <div id="paypal-button-container"></div>
        </div>
    );
};
export default BCDCButton;
