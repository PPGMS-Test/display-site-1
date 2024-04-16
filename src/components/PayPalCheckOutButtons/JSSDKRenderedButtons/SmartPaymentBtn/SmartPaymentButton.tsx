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
                button = window.paypal.Buttons({
                    fundingSource: window.paypal.FUNDING.CARD,
                    ...obj,
                });
            } else if (buttonType === PAYMENT_METHOD.PAYPAL_STANDARD) {
                button = window.paypal.Buttons(obj);
            } else if (buttonType === PAYMENT_METHOD.PAYPAL_BNPL) {
                button = window.paypal.Buttons({
                    fundingSource: window.paypal.FUNDING.PAYLATER,
                    ...obj,
                });
            }

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
            // if (buttonType === PAYMENT_METHOD.PAYPAL_STANDARD) {
            //     let map = new Map<string, string>();
            //     map.set("enable-funding", "paylater");
            //     if (["AU", "ES", "DE", "IT", "FR"].includes(addressCountry)) {
            //         map.set("currency", "USD");
            //     }
            //     if (["GB"].includes(addressCountry)) {
            //         map.set("currency", "USD");
            //     }
            //     JSLoadParams.additionalOptions = map;
            // }
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
