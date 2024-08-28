import { FC, useEffect, useState } from "react";
import UseJSSDK, { JSSDKParams } from "../../service/LoadPayPalScript/UseJSSDK";
import {
    createOrderCallback,
    onApproveCallback,
    print_console_ACDC_btn,
    resultMessage,
} from "./ACDCCallBack";
import classNames from "classnames";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../typeHooks";
import { setIsCustomizedClient } from "../../reducer/reducers/ClientSecretReducer";

const ACDCIndex: FC = () => {
    let [cardFormDisplay, setCardFormDisplay] = useState("inline-block");
    let [submitBtnDisable, setSubmitBtnDisable] = useState(true);
    const dispatch = useAppDispatch();

    let cardField: any;

    const renderCard = () => {
        cardField = window.paypal.CardFields({
            createOrder: createOrderCallback,
            onApprove: onApproveCallback,
        });
        console.log("[2][ACDC.Page.init]:Start to load JS SDK");
        let nameField;
        let nameField_value;
        let numberField;
        let cvvField;
        let expiryField;
        if (cardField.isEligible()) {
            nameField = cardField.NameField({
                inputEvents: {
                    onChange: (data: any) => {
                        // debugger;
                        // nameField_value = data;
                    },
                },
            });
            const renderPromise1 = nameField.render(
                "#card-name-field-container"
            );

            numberField = cardField.NumberField();
            const renderPromise2 = numberField.render(
                "#card-number-field-container"
            );

            cvvField = cardField.CVVField();
            const renderPromise3 = cvvField.render("#card-cvv-field-container");

            expiryField = cardField.ExpiryField();
            const renderPromise4 = expiryField.render(
                "#card-expiry-field-container"
            );

            Promise.all([
                renderPromise1,
                renderPromise2,
                renderPromise3,
                renderPromise4,
            ]).then(() => {
                setSubmitBtnDisable(false);
                // dispatch(setIsCustomizedClient(false));
            });
        } else {
            setCardFormDisplay("none");
        }
    };
    useEffect(() => {
        dispatch(setIsCustomizedClient(true));
        (async () => {
            let JSLoadParams: JSSDKParams = {
                addressCountry: "US",
            };
            let map = new Map<string, string>();
            map.set("components", "buttons,card-fields");
            JSLoadParams.additionalOptions = map;
            console.log("[1][ACDC.Page.init]:Start to load JS SDK");
            await UseJSSDK(JSLoadParams).then(renderCard);
        })();
    });

    const submitOnClick = () => {
        print_console_ACDC_btn();
        cardField.submit().catch((error: any) => {
            resultMessage(
                `Sorry, your transaction could not be processed...<br><br>${error}`
            );
        });
    };

    return (
        <>
            
            <div
                id="card-form"
                className={classNames({
                    display: cardFormDisplay,
                })}
            >
                <div id="card-number-field-container"></div>
                <div id="card-expiry-field-container"></div>
                <div id="card-cvv-field-container"></div>
                <div id="card-name-field-container"></div>
                <button
                    id="multi-card-field-button"
                    type="button"
                    onClick={submitOnClick}
                    disabled={submitBtnDisable}
                >
                    Pay now with Card
                </button>
            </div>
            <p id="result-message"></p>
        </>
    );
};

export default ACDCIndex;
