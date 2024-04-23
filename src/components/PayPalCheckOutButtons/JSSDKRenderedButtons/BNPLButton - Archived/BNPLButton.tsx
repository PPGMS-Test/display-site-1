/*****************************************************
 *****************************************************
 ******* BNPLButton这个模块已经废弃
 ******* 通过SmartPaymentButton的buttonType属性
 ******* 来控制渲染不同的Button类型
 *******
 ******* 请使用SmartPaymentButton.tsx这个文件
 *******
 *******
 *****************************************************
 *****************************************************/

import React, { FC, useEffect } from "react";
import CreateOrderObject from "../../../../service/LoadPayPalScript/createOrderObject";
import UseJSSDK from "../../../../service/LoadPayPalScript/UseJSSDK";
import { useNavigate } from "react-router-dom";

const BNPLButton: FC = () => {
    const navigate = useNavigate();
    const renderBtn = () => {
        debugger;
        if (window.paypal) {
            let button = window.paypal.Buttons({
                fundingSource: window.paypal.FUNDING.PAYLATER,
                ...CreateOrderObject({
                    navigate,
                }),
            });
            if (button.isEligible()) {
                button.render("#paypal-button-container");
            }
        }
    };

    useEffect(() => {
        (async () => {
            // await UseJSSDK().then(renderBtn);
        })();
    });

    return (
        <div>
            <div id="paypal-button-container"></div>
        </div>
    );
};
export default BNPLButton;
