import React, { FC, useEffect, useState } from "react";
import CreateOrderObjectFn from "../../../../service/LoadPayPalScript/createOrderObject";

import UseJSSDK, {
    JSSDKParams,
} from "../../../../service/LoadPayPalScript/UseJSSDK";
import { useNavigate, useLocation } from "react-router-dom";
import PAYMENT_METHOD from "../../../../enum/PAYMENT_METHOD";
import {
    BuyerInfo,
    getBuyerInfo,
} from "../../../../reducer/reducers/buyerInfoReducer";
import { useAppSelector } from "../../../../typeHooks";
import { getPendingRenderSPBFlag } from "../../../../reducer/reducers/globalMarkerFlagReducer";
import { renderBtn } from "./SPBRenderFunction";


interface ButtonType {
    buttonType: PAYMENT_METHOD;
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

    // const buyerInfo = useAppSelector((state) => state.buyerInfo);

    const buyerInfo: BuyerInfo = useAppSelector((state) => {
        return getBuyerInfo(state);
    });
    const addressCountry = buyerInfo.Address.Country;

    // const pendingRenderFlag: Boolean = useAppSelector((state) => {
    //     return getPendingRenderSPBFlag(state);
    // });
    // const [pendingRender, setPendingRender] = useState(pendingRenderFlag);

    useEffect(
        () => {
            console.log("Smart Payment Button is now rendering!");
            (async () => {
                let JSLoadParams: JSSDKParams = {
                    addressCountry: addressCountry,
                };
                if (buttonType === PAYMENT_METHOD.PAYPAL_BNPL) {
                    //在渲染pay later 按钮时, 根据所选国家不同, 传入不同的货币种类
                    let map = new Map<string, string>();
                    map.set("enable-funding", "paylater");
                    if (
                        ["AU", "ES", "DE", "IT", "FR"].includes(addressCountry)
                    ) {
                        map.set("currency", "EUR");
                    }
                    if (["GB"].includes(addressCountry)) {
                        map.set("currency", "GBP");
                    }
                    JSLoadParams.additionalOptions = map;
                }
                await UseJSSDK(JSLoadParams).then(()=>{
                    renderBtn(buttonType,{navigate,getLink},{})
                });
            })();
        }
        // [pendingRender]
    );

    return (
        <div>
            <div id="paypal-button-container"></div>
            <div id="smart-payment-button-info-area"></div>
        </div>
    );
};
export default SPB;
