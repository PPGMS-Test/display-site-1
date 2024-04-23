
import React, { FC, useEffect } from "react";
import CreateOrderObjectFn from "../../../../service/LoadPayPalScript/createOrderObject";

import UseJSSDK, {
    JSSDKParams,
} from "../../../../service/LoadPayPalScript/UseJSSDK";
import PAYMENT_METHOD from "../../../../enum/PAYMENT_METHOD";
import {
    BuyerInfo,
    getBuyerInfo,
} from "../../../../reducer/reducers/buyerInfoReducer";
import store from "../../../../reducer/store";



class PayPalMarksAndEligible {
    buttonType: PAYMENT_METHOD

    constructor() {
        this.buttonType = PAYMENT_METHOD.PAYPAL_STANDARD;
    }

    public static async build(buttonType: PAYMENT_METHOD): Promise<PayPalMarksAndEligible> {
        let thisObject = new PayPalMarksAndEligible()
        thisObject.buttonType = buttonType;
        const buyerInfo: BuyerInfo = store.getState().buyerInfo;
        const addressCountry = buyerInfo.Address.Country;

        let JSLoadParams: JSSDKParams = {
            addressCountry: addressCountry,
        };
        let map = new Map<string, string>();

        // if (buttonType === PAYMENT_METHOD.PAYPAL_BNPL) {
        //     //在渲染pay later 按钮时, 根据所选国家不同, 传入不同的货币种类
        //     map.set("enable-funding", "paylater");
        //     if (["AU", "ES", "DE", "IT", "FR"].includes(addressCountry)) {
        //         map.set("currency", "EUR");
        //     }
        //     if (["GB"].includes(addressCountry)) {
        //         map.set("currency", "GBP");
        //     }
        // }

        map.set("components", "buttons,marks,funding-eligibility")
        JSLoadParams.additionalOptions = map;
        await UseJSSDK(JSLoadParams);
       
        return thisObject;
    }


    renderBtn = (buttonType: PAYMENT_METHOD) => {
        if (window.paypal) {
            let button;
            let obj = CreateOrderObjectFn();
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

            if (button.isEligible()) {
                button.render("#paypal-button-container");
                // .then(() => {});
            } else {
                if (buttonType === PAYMENT_METHOD.PAYPAL_BNPL) {

                }
            }
        }
    };

    renderMarks = (fundingSourceName: string, divID: string) => {
        if (window.paypal) {
            // debugger;
            console.log(window.paypal.getFundingSources())
            var mark = window.paypal.Marks({
                fundingSource: fundingSourceName
            });
            if (mark.isEligible()) {
                mark.render(`#${divID}`);
            }

        }
    }

    getAllEligiblePaymentSource = ()=>{
        let results:string[] = []
        if (window.paypal) {
            // debugger;
            let allFundingSources = window.paypal.getFundingSources() as string[]
            // console.log(window.paypal.getFundingSources())
            allFundingSources.forEach(item=>{
                if(window.paypal.isFundingEligible(item)) results.push(item)
            })
        }
        return results;
    }


}


export default PayPalMarksAndEligible;
