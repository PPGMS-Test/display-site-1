import { NavigateFunction } from "react-router-dom";
import PAYMENT_METHOD from "../../../../enum/PAYMENT_METHOD";
import CreateOrderObjectFn from "../../../../service/LoadPayPalScript/createOrderObject";

export interface CreateOrderParam {
    navigate: NavigateFunction,
    getLink: Function
}

interface AfterRenderFlag {
    isMsgHandler?: boolean
}


export const renderBtn = (buttonType: PAYMENT_METHOD, createOrderParam: CreateOrderParam, doSomethingAfterRender: AfterRenderFlag) => {
    const { navigate, getLink } = createOrderParam
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

        doSomethingAfterRender.isMsgHandler && msgHandler(button, buttonType)
    }
};


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


function msgHandler(button: any, buttonType: PAYMENT_METHOD) {
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