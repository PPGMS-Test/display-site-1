import { FC, useState } from "react";

import LeftPart from "./LeftPart";
import RightPart from "./RightPart";
import DownloadButtonPart from "./DownloadButtonPart";
import { useAppSelector } from "../../typeHooks";
import { get_payment_method } from "../../reducer/reducers/paymentMethodReducer";
import PAYMENT_METHOD from "../../enum/PAYMENT_METHOD";

const BCDCShoppingCart: FC = () => {
    const currentPaymentMethod: PAYMENT_METHOD = useAppSelector((state) =>
        get_payment_method(state)
    );

    const renderDownloadButtonPart = () => {
        if (currentPaymentMethod === PAYMENT_METHOD.PAYPAL_BCDC) {
            return <DownloadButtonPart />;
        }
        if (currentPaymentMethod === PAYMENT_METHOD.PAYPAL_APM) {
            return <DownloadButtonPart />;
        }
    };
    return (
        <div>
            {/* 标题: Shipping Cart BCDC */}

            {/* [2023-10-08 修改"Left right 背景图拿掉] */}
            {/* <div className="flex flex-col md:flex-row bg-gray-300"> */}

            <div className="flex flex-col md:flex-row bg-white">
                <div className=" basis-2/3  m-2">
                    <LeftPart></LeftPart>
                </div>
                <div className=" basis-1/2  m-2">
                    <RightPart />
                    {renderDownloadButtonPart()}
                </div>
            </div>
        </div>
    );
};

export default BCDCShoppingCart;
