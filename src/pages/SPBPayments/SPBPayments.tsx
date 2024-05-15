import { FC, useEffect, useState } from "react";
import DownloadButtonPart from "./DownloadButtonPart";
import { useAppDispatch, useAppSelector } from "../../typeHooks";
import {
    get_payment_method,
    setPaymentMethod,
} from "../../reducer/reducers/paymentMethodReducer";
import PAYMENT_METHOD from "../../enum/PAYMENT_METHOD";
import SPBPaymentsContentProvider from "./SPBPaymentsContentProvider";
import UseJSSDK, { JSSDKParams } from "../../service/LoadPayPalScript/UseJSSDK";
import {
    BuyerInfo,
    getBuyerInfo,
} from "../../reducer/reducers/buyerInfoReducer";
import { getShoppingCart } from "../../reducer/reducers/shoppingCartReducer";
import { getAPMMethod } from "../../reducer/reducers/APMReducer";
import PricingSeparate from "./PricingSeparate";
import PricingTotal from "./PricingTotal";
import SmartPaymentButton from "../../components/PayPalCheckOutButtons/JSSDKRenderedButtons/SmartPaymentBtn/SmartPaymentButton";
import APMDisplayArea from "../APM/APMDisplayArea";
import APM_METHOD_ENUM from "../APM/APM_METHOD_ENUM";
import classNames from "classnames";
import { getIsMoreSpace } from "../../reducer/reducers/globalToggleReducer";
import Contacts from "./Contact";
import ContactUnEditable from "./ContactReadOnly";
import ShippingMethod from "./ShippingMethod";
import {
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    Switch,
    Tooltip,
} from "@mui/material";
import {
    APM_logo,
    CurrentPaymentMethod,
    payLater_logo,
    paypal_logo,
    paypal_used,
} from "./SPBPaymentsCommonFunctions";
import PayPalMarksAndEligible from "../../components/PayPalCheckOutButtons/JSSDKRenderedButtons/SmartPaymentBtn/PayPalMarksAndEligible";
import { useLocation, useNavigate } from "react-router-dom";

const SPBPayments: FC = () => {
    const dispatch = useAppDispatch();

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

    //****************************右侧的函数********************************* */
    //****************************** Start ********************************* */
    const shoppingCartList = useAppSelector((state) => getShoppingCart(state));

    const selectedPaymentMethod = useAppSelector((state) =>
        get_payment_method(state)
    ) as PAYMENT_METHOD;

    const APMMethod = useAppSelector((state) => {
        return getAPMMethod(state);
    });

    const renderRightPartFn = () => {
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
                        <p>是否渲染SPB Area: {String(showSPBAreaFlag)}</p>
                        <div>
                            {/* CurrentPaymentMethod(
                                    selectedPaymentMethod,
                                    APMMethod,
                                    {
                                        navigate,
                                        getLink,
                                    },
                                    PayPalJSSDK
                                ) */}

                            {showSPBAreaFlag && (
                                <div>
                                    <div id="paypal-button-container"></div>
                                    <div id="smart-payment-button-info-area"></div>
                                </div>
                            )}
                        </div>
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
    //****************************右侧的函数********************************* */
    //****************************   END  ********************************** */

    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
    // **************************** 左侧的函数********************************* */
    // ****************************   Start  ********************************** */
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */

    let [isInfoEditable, setIsInfoEditable] = useState(true);

    const [eligiblePaymentSourceList, setEligiblePaymentSourceList] = useState(
        []
    );

    //用以控制支付方式变化的默认值
    const [useRadioOnChange, setUseRadioOnChange] = useState(true);

    const radio_value_global: PAYMENT_METHOD = useAppSelector((state) =>
        get_payment_method(state)
    );
    const [radio_value, setRadioValue] =
        useState<PAYMENT_METHOD>(radio_value_global);

    //setTimeOut用的, 以防误触
    const [radioBtnDisable, setRadioBtnDisable] = useState(false);

    //radio btn change 事件, 仅仅改变当前页面的value值, 不改变redux中的值
    const handleChange = (event: any) => {
        setRadioValue(event?.target?.value);
        // dispatch(setPaymentMethod(event?.target?.value));
    };

    //radio btn change 事件, 不仅仅改变当前页面的value值, 也改变redux中的值
    const handleChange_ChangePaymentMethod = (event: any) => {
        setRadioBtnDisable(true);
        setRadioValue(event?.target?.value);
        dispatch(setPaymentMethod(event?.target?.value as PAYMENT_METHOD));

        setTimeout(() => {
            setRadioBtnDisable(false);
        }, 800);
    };

    const isUseMoreSpace: boolean = useAppSelector((state) =>
        getIsMoreSpace(state)
    );

    const payPalMarksAndEligibleFnTool = new PayPalMarksAndEligible();

    const buttonTables = () => {
        return renderRadioSet(eligiblePaymentSourceList);
    };

    const renderRadioSet = (lists: any[]) => {
        if (useRadioOnChange) {
            return (
                <div>
                    <RadioGroup
                        value={radio_value}
                        onChange={handleChange_ChangePaymentMethod}
                    >
                        {lists.map((item, index) => {
                            return (
                                <div className="pl-2 w-full" key={index}>
                                    <FormControlLabel
                                        value={item.value}
                                        control={<Radio color="primary" />}
                                        label={item.label}
                                        disabled={radioBtnDisable}
                                        className=" inline-block"
                                    />
                                    {item.logo && item.logo}
                                    {item.additionalInfo && item.additionalInfo}
                                </div>
                            );
                        })}
                    </RadioGroup>
                </div>
            );
        } else {
            return (
                <div>
                    <RadioGroup value={radio_value} onChange={handleChange}>
                        {lists.map((item, index) => {
                            return (
                                <div className="pl-2 w-full" key={index}>
                                    <FormControlLabel
                                        value={item.value}
                                        control={<Radio color="primary" />}
                                        label={item.label}
                                    />
                                    {item.logo && item.logo}
                                    {item.additionalInfo && item.additionalInfo}
                                </div>
                            );
                        })}
                    </RadioGroup>

                    <Button
                        variant="contained"
                        color="primary"
                        // endIcon={<ArrowForwardIosIcon />}
                        // endIcon={<Icon>send</Icon>}
                        onClick={() => {
                            // console.clear();
                            console.log(
                                "[OnClick事件]当前radio value:",
                                radio_value,
                                "| typeof radio_value:",
                                typeof radio_value
                            );

                            dispatch(
                                setPaymentMethod(radio_value as PAYMENT_METHOD)
                            );
                        }}
                    >
                        更改支付方式
                    </Button>
                </div>
            );
        }
    };

    const changePaymentMethodComponent = () => {
        if (
            process.env.REACT_APP_SHOW_PAYMENT_METHOD_TOGGLE &&
            process.env.REACT_APP_SHOW_PAYMENT_METHOD_TOGGLE === "TRUE"
        ) {
            return (
                <div className="top-1 right-1 absolute ">
                    <Tooltip
                        title="点击这个按钮用以切换支付方式的选择方式"
                        placement="bottom"
                        className="text-sky-500 hover:text-sky-600"
                    >
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={useRadioOnChange}
                                    onChange={() => {
                                        setUseRadioOnChange(!useRadioOnChange);
                                    }}
                                />
                            }
                            label={
                                useRadioOnChange
                                    ? "选中radio button"
                                    : "点击按钮"
                            }
                        />
                    </Tooltip>
                </div>
            );
        }
    };

    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
    // **************************** 左侧的函数********************************* */
    // ****************************   END  ********************************** */
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */
    // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */

    const [showSPBAreaFlag, setShowSPBAreaFlag] = useState(false);

    const [buttonType, setButtonType] = useState(
        PAYMENT_METHOD.PAYPAL_STANDARD
    );

    const buyerInfo: BuyerInfo = useAppSelector((state) => {
        return getBuyerInfo(state);
    });

    const addressCountry = buyerInfo.Address.Country;

    let JSLoadParams: JSSDKParams = {
        addressCountry: addressCountry,
    };

    //在渲染pay later 按钮时, 根据所选国家不同, 传入不同的货币种类
    let map = new Map<string, string>();
    map.set("enable-funding", "paylater");
    if (["AU", "ES", "DE", "IT", "FR"].includes(addressCountry)) {
        map.set("currency", "EUR");
    }
    if (["GB"].includes(addressCountry)) {
        map.set("currency", "GBP");
    }
    map.set("components", "buttons,marks,funding-eligibility");
    JSLoadParams.additionalOptions = map;

    let PayPalJSSDK = UseJSSDK(JSLoadParams, "<SPBPayments.tsx>");

    const [JSLoadCountry, setJSLoadCountry] = useState(addressCountry);

    useEffect(() => {
        PayPalJSSDK.then((JSSDK) => {
            const paymentMethodList: any = [];

            paymentMethodList.push(
                ...[
                    {
                        value: PAYMENT_METHOD.PAYPAL_STANDARD,
                        label: "PayPal",
                        logo: paypal_logo,
                        additionalInfo: null,
                    },
                    {
                        value: PAYMENT_METHOD.PAYPAL_BCDC,
                        label: "Debit or Credit Card",
                        logo: paypal_used,
                        additionalInfo: null,
                    },
                    {
                        value: PAYMENT_METHOD.PAYPAL_APM,
                        label: `APM - ${APMMethod}`,
                        logo: APM_logo(APMMethod),
                        additionalInfo: null,
                    },
                ]
            );

            payPalMarksAndEligibleFnTool
                .getAllEligiblePaymentSource()
                .forEach((eligiblePaymentSource) => {
                    if (eligiblePaymentSource === "paylater") {
                        paymentMethodList.push({
                            value: PAYMENT_METHOD.PAYPAL_BNPL,
                            label: "Pay later",
                            logo: payLater_logo,
                            additionalInfo: null,
                        });
                    }
                });

            // debugger;

            setTimeout(() => {
                payPalMarksAndEligibleFnTool.renderMarks(
                    "paylater",
                    "paylater-mark"
                );
                payPalMarksAndEligibleFnTool.renderMarks(
                    "paypal",
                    "paypal-mark"
                );
            }, 400);

            setTimeout(() => {
                setShowSPBAreaFlag(false);
            }, 2000);

            setEligiblePaymentSourceList(paymentMethodList);
        });
    }, [JSLoadCountry]);

    useEffect(() => {});

    return (
        <SPBPaymentsContentProvider.Provider
            value={{ showSPBAreaFlag, setShowSPBAreaFlag, PayPalJSSDK, setJSLoadCountry}}
        >
            <div>
                <div className="flex flex-col md:flex-row bg-white">
                    <div className=" basis-2/3  m-2">
                        <div
                            className={classNames({
                                "relative bg-white px-6 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-3xl sm:rounded-lg sm:px-10":
                                    true,
                                "pt-10": isUseMoreSpace,
                            })}
                        >
                            <div className="mx-auto max-w-2xl">
                                {/* Divide line in each div */}
                                <div className="divide-y divide-gray-300/50">
                                    {isInfoEditable ? (
                                        <Contacts />
                                    ) : (
                                        <ContactUnEditable />
                                    )}
                                    <ShippingMethod></ShippingMethod>
                                    <div
                                        className={classNames({
                                            "text-base  leading-7 relative":
                                                true,
                                            "space-y-6 py-8": isUseMoreSpace,
                                        })}
                                    >
                                        {changePaymentMethodComponent()}

                                        <p className="text-gray-400 font-extrabold">
                                            Payment Method
                                        </p>

                                        {buttonTables()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" basis-1/2  m-2">
                        <div className="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10 ">
                            <div className="mx-auto max-w-2xl">
                                <div className="divide-y divide-gray-300/50">
                                    {renderRightPartFn()}
                                </div>
                            </div>
                        </div>

                        {renderDownloadButtonPart()}
                    </div>
                </div>
            </div>
        </SPBPaymentsContentProvider.Provider>
    );
};

export default SPBPayments;
