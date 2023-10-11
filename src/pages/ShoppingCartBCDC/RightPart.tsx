import { FC, useState } from "react";

import PricingSeparate from "./PricingSeparate";
import PricingTotal from "./PricingTotal";

import { useAppSelector, useAppDispatch } from "../../typeHooks";

import SmartPaymentButton from "../../components/StandardSPB/SmartPaymentButton";
import BCDCButton from "../../components/BCDCButton";
import APMButton from "../../components/APMButton";
import PAYMENT_METHOD from "../../enum/PAYMENT_METHOD";

function renderSmartPaymentButtons() {
    return (
        <>
            <SmartPaymentButton />
        </>
    );
}

function renderBCDCButton() {
    return (
        <>
            <BCDCButton />
        </>
    );
}

function renderAPMButton() {
    return (
        <>
            <APMButton />
        </>
    );
}

function CurrentPaymentMethod(count: PAYMENT_METHOD) {
    // if (count === PAYMENT_METHOD.PAYPAL_STANDARD) {
    //     console.log("分支1");
    //     return <div>111</div>;
    // } else if (count === PAYMENT_METHOD.PAYPAL_BCDC) {
    //     console.log("分支2");
    //     return <div>222</div>;
    // } else if (count === PAYMENT_METHOD.PAYPAL_APM) {
    //     console.log("分支3");
    //     return <div>333</div>;
    // }

    switch (count) {
        case PAYMENT_METHOD.PAYPAL_STANDARD:
            console.log("分支1");
            return renderSmartPaymentButtons();
            break;
        case PAYMENT_METHOD.PAYPAL_BCDC:
            console.log("分支2");
            return renderBCDCButton();
            break;
        case PAYMENT_METHOD.PAYPAL_APM:
            console.log("分支3");
            return renderAPMButton();
            break;

        default:
            break;
    }
    console.log("什么都没有返回");
}

const RightPart: FC = () => {
    // console.clear();
    const count = useAppSelector(
        (state) => state.paymentMethod.method
    ) as PAYMENT_METHOD;

    let [showPaymentMethod, setShowPaymentMethod] = useState(count);

    const isWithShippingOption =  useAppSelector(
        (state) => state.withShippingOption.isWithShipping
    ) as boolean

    // console.log("isWithShippingOption:",isWithShippingOption)

    return (
        <div className="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 ">
            <div className="mx-auto max-w-md">
                <div className="divide-y divide-gray-300/50">
                    <div>商品缩略图</div>
                    <div>
                        <PricingSeparate />
                    </div>
                    <div>
                        <PricingTotal />
                    </div>
                    <div>
                        <p>当前的支付方式: {count}</p>
                        <p>是否带有运输参数: {`${isWithShippingOption}`}</p>

                        <div>{CurrentPaymentMethod(count)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RightPart;
