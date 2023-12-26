import { FC, useState } from "react";

import PricingSeparate from "./PricingSeparate";
import PricingTotal from "./PricingTotal";

import { useAppSelector, useAppDispatch } from "../../typeHooks";

import SmartPaymentButton from "../../components/SmartPaymentBtn/SmartPaymentButton";
import BCDCButton from "../../components/BCDCButton/BCDCButton";
import APMDisplayArea from "../APM/APMDisplayArea";
import PAYMENT_METHOD from "../../enum/PAYMENT_METHOD";
import { getShoppingCart } from "../../reducer/reducers/shoppingCartReducer";
import { get_payment_method } from "../../reducer/reducers/paymentMethodReducer";
import { getAPMMethod } from "../../reducer/reducers/APMReducer";

function renderSmartPaymentButtons() {
    return (
        <>
            <SmartPaymentButton buttonType="Stand" />
        </>
    );
}

function renderBCDCButton() {
    return (
        // <>
        //     <BCDCButton />
        // </>
        <>
            <SmartPaymentButton buttonType="BCDC" />
        </>
    );
}

function renderAPMButton(APMMethod: string) {
    console.log("APM Method:", APMMethod);
    return (
        <>
            <APMDisplayArea method={APMMethod} setMethod={() => {}} />
        </>
    );
}

function CurrentPaymentMethod(count: PAYMENT_METHOD, APMMethod: string) {
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
            return renderAPMButton(APMMethod);
            break;

        default:
            break;
    }
    console.log("什么都没有返回");
}

const RightPart: FC = () => {
    const count = useAppSelector((state) =>
        get_payment_method(state)
    ) as PAYMENT_METHOD;
    const shoppingCartList = useAppSelector((state) => getShoppingCart(state));
    const APMMethod = useAppSelector((state) => {
        return getAPMMethod(state);
    });

    let [showPaymentMethod, setShowPaymentMethod] = useState(count);

    const isWithShippingOption = useAppSelector(
        (state) => state.withShippingOption.isWithShipping
    ) as boolean;

    // console.log("isWithShippingOption:",isWithShippingOption)

    const renderFn = () => {
        if (shoppingCartList.length > 0) {
            return (
                <div>
                    <div>
                        <PricingSeparate />
                    </div>
                    <div>
                        <PricingTotal />
                    </div>
                    <hr className=" my-2" />
                    <div>
                        {/* <p>当前的支付方式: {count}</p>
                        <p>是否带有运输参数: {`${isWithShippingOption}`}</p> */}

                        <div>{CurrentPaymentMethod(count, APMMethod)}</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <em>Empty Cart</em>
                    </div>
                    <div>Please Select your favorite products!</div>
                </div>
            );
        }
    };

    return (
        <div className="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 ">
            <div className="mx-auto max-w-md">
                <div className="divide-y divide-gray-300/50">{renderFn()}</div>
            </div>
        </div>
    );
};
export default RightPart;
