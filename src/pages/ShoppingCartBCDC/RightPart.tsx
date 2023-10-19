import { FC, useState } from "react";

import PricingSeparate from "./PricingSeparate";
import PricingTotal from "./PricingTotal";

import { useAppSelector, useAppDispatch } from "../../typeHooks";

import SmartPaymentButton from "../../components/StandardSPB/SmartPaymentButton";
import BCDCButton from "../../components/BCDCButton";
import APMButton from "../../components/APMButton";
import PAYMENT_METHOD from "../../enum/PAYMENT_METHOD";
import { getShoppingCart } from "../../reducer/reducers/shoppingCartReducer";
import { get_payment_method } from "../../reducer/reducers/paymentMethodReducer";

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
    const count = useAppSelector((state) =>
        get_payment_method(state)
    ) as PAYMENT_METHOD;
    const shoppingCartList = useAppSelector((state) => getShoppingCart(state));

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

                        <div>{CurrentPaymentMethod(count)}</div>
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
