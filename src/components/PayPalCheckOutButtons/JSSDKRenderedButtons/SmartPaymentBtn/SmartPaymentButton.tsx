import React, { FC, useEffect } from "react";
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

interface ButtonType {
    buttonType: PAYMENT_METHOD;
}

const SPB: FC<ButtonType> = ({ buttonType }) => {
    let infoMessageArea = document.getElementById(
        "smart-payment-button-info-area"
    );
    const setInfoMessage = () => {
        if (infoMessageArea) {
            infoMessageArea.innerText =
                "Current Payment Method is not support in the country select.";
        }
    };
    const clearInfoMessage = () => {
        if (infoMessageArea) {
            infoMessageArea.innerText = "";
        }
    };

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

    const renderBtn = () => {
        if (window.paypal) {
            let button;
            let obj = CreateOrderObjectFn({
                navigate,
                getLink,
            });
            if (buttonType === PAYMENT_METHOD.PAYPAL_BCDC) {
                //渲染单独的BCDC按钮 | render BCDC standalone button
                button = window.paypal.Buttons({
                    fundingSource: window.paypal.FUNDING.CARD,
                    ...obj,
                });
            } else if (buttonType === PAYMENT_METHOD.PAYPAL_STANDARD) {
                //渲染标准的SPB按钮组 | render Standard SPB button set
                button = window.paypal.Buttons(obj);
            } else if (buttonType === PAYMENT_METHOD.PAYPAL_BNPL) {
                //渲染单独的pay later按钮 | render paylater standalone button
                button = window.paypal.Buttons({
                    fundingSource: window.paypal.FUNDING.PAYLATER,
                    ...obj,
                });
            }

            //如果有按钮的information area, ("smart-payment-button-info-area") 则清除内容, 没有则不管
            //If there is a button information area, ("smart-payment-button-info-area") then clear the content, if no then do nothing
            clearInfoMessage();
            if (button.isEligible()) {
                button.render("#paypal-button-container");
                // .then(() => {});
            } else {
                if (buttonType === PAYMENT_METHOD.PAYPAL_BNPL) {
                    if (
                        !document
                            .getElementById("paypal-button-container")
                            ?.hasChildNodes()
                    ) {
                        //如果发现渲染的按钮区域里没有东西, 那么说明按钮无法被渲染, 提示这个按钮是不能被渲染出来的
                        //If you find that there is nothing in the rendered button area, it means that the button cannot be rendered, prompting that the button cannot be rendered
                        setInfoMessage();
                    }
                }
            }
        }
    };


    useEffect(() => {
        (async () => {
            let JSLoadParams: JSSDKParams = {
                addressCountry: addressCountry,
            };
            if (buttonType === PAYMENT_METHOD.PAYPAL_BNPL) {
                //在渲染pay later 按钮时, 根据所选国家不同, 传入不同的货币种类
                let map = new Map<string, string>();
                map.set("enable-funding", "paylater");
                if (["AU", "ES", "DE", "IT", "FR"].includes(addressCountry)) {
                    map.set("currency", "EUR");
                }
                if (["GB"].includes(addressCountry)) {
                    map.set("currency", "GBP");
                }
                JSLoadParams.additionalOptions = map;
            }
           
            await UseJSSDK(JSLoadParams).then(renderBtn);
        })();
    });

    return (
        <div>
            <div id="paypal-button-container"></div>
            <div id="smart-payment-button-info-area"></div>
        </div>
    );
};
export default SPB;
