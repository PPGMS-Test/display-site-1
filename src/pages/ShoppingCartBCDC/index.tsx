import { FC, useState } from "react";

import LeftPart from "./LeftPart";
import RightPart from "./RightPart";
import DownloadButtonPart from "./DownloadButtonPart";
import { useAppSelector } from "../../typeHooks";
import { get_payment_method } from "../../reducer/reducers/paymentMethodReducer";
import PAYMENT_METHOD from "../../enum/PAYMENT_METHOD";
import CodeDisplayAreaPrism from "@/components/CodeDisplayArea/CodeDisplayAreaPrism/CodeDisplayAreaPrism";
import {
    CODE_SNIPPET_NAME,
    PrismThemeNAME,
} from "@/components/CodeDisplayArea/CodeDisplayAreaPrism/PrismDisplayContextProvider";
import ACDCTestCard from "../../components/ACDC/ACDCTestCard";
import { CommonToggle } from "@/components/Toggles/CommonToggle";

const BCDCShoppingCart: FC = () => {
    const currentPaymentMethod: PAYMENT_METHOD = useAppSelector((state) =>
        get_payment_method(state)
    );

    const [showCodeDisplayArea, setShowCodeDisplayArea] = useState(false);

    const renderDownloadButtonPart = () => {
        if (currentPaymentMethod === PAYMENT_METHOD.PAYPAL_BCDC) {
            return <DownloadButtonPart />;
        }
        if (currentPaymentMethod === PAYMENT_METHOD.PAYPAL_APM) {
            return <DownloadButtonPart />;
        }
    };

    const renderACDCTestPart = () => {
        if (currentPaymentMethod === PAYMENT_METHOD.PAYPAL_ACDC) {
            return <ACDCTestCard />;
        }
    };

    const paymentMethodRD = useAppSelector((state) =>
        get_payment_method(state)
    );

    const renderFrontEndCode = () => {
        let codeSnippetName: CODE_SNIPPET_NAME = CODE_SNIPPET_NAME.SPB_STANDARD;
        if (paymentMethodRD === PAYMENT_METHOD.PAYPAL_STANDARD) {
            //default
        }
        if (paymentMethodRD === PAYMENT_METHOD.PAYPAL_BNPL) {
            codeSnippetName = CODE_SNIPPET_NAME.SPB_BNPL;
        }
        if (paymentMethodRD === PAYMENT_METHOD.PAYPAL_ACDC) {
            codeSnippetName = CODE_SNIPPET_NAME.ACDC;
        }
        if (paymentMethodRD === PAYMENT_METHOD.PAYPAL_GOOGLEPAY) {
            codeSnippetName = CODE_SNIPPET_NAME.GOOGLEPAY;
        }
        if (paymentMethodRD === PAYMENT_METHOD.PAYPAL_APPLEPAY) {
            codeSnippetName = CODE_SNIPPET_NAME.APPLEPAY;
        }
        if (paymentMethodRD === PAYMENT_METHOD.PAYPAL_APM) {
            codeSnippetName = CODE_SNIPPET_NAME.APM_IDEAL;
        }
        return (
            <>
                {paymentMethodRD}
                <CodeDisplayAreaPrism
                    codeSnippetName={codeSnippetName}
                    prismTheme={PrismThemeNAME.github}
                />
            </>
        );
    };

    const showCode = () => {
        return (
            <>
                {renderFrontEndCode()}
                <CodeDisplayAreaPrism
                    codeSnippetName={CODE_SNIPPET_NAME.BackEndAPI}
                    prismTheme={PrismThemeNAME.nightOwl}
                    languageType="js"
                />
            </>
        );
    };

    return (
        <div>
            {/* 标题: Shipping Cart BCDC */}

            {/* [2023-10-08 修改"Left right 背景图拿掉] */}
            {/* <div className="flex flex-col md:flex-row bg-gray-300"> */}

            <div className="flex flex-col md:flex-row bg-white">
                {/* <div className=" basis-1/4  m-2">
                    <CodeDisplayArea />
                </div> */}

                <div className=" basis-1/4  m-2 divide-y divide-gray-300/50">
                    <CommonToggle
                        handleChange={(event, checked) => {
                            setShowCodeDisplayArea(checked);
                        }}
                        labelContent="显示代码"
                        tipContent="点击用于切换显示/隐藏代码展示区域"
                    />
                    {showCodeDisplayArea && showCode()}
                </div>

                <div className=" basis-1/2  m-2">
                    <LeftPart></LeftPart>
                </div>
                <div className=" basis-1/3  m-2">
                    <RightPart />
                    {renderDownloadButtonPart()}
                    {renderACDCTestPart()}
                </div>
            </div>
        </div>
    );
};

export default BCDCShoppingCart;
