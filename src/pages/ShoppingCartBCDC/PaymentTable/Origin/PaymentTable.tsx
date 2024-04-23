import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Icon,
    Radio,
    RadioGroup,
    Switch,
    Tooltip,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useAppDispatch, useAppSelector } from "../../../../typeHooks";
import {
    get_payment_method,
    setPaymentMethod,
} from "../../../../reducer/reducers/paymentMethodReducer";

import PAYMENT_METHOD from "../../../../enum/PAYMENT_METHOD";
import classNames from "classnames";
import { getIsMoreSpace } from "../../../../reducer/reducers/globalToggleReducer";
import { getAPMMethod } from "../../../../reducer/reducers/APMReducer";
import APMDisplayArea from "../../../APM/APMDisplayArea";
import APM_METHOD_ENUM from "../../../APM/APM_METHOD_ENUM";
import PayPalMarksAndEligible from "../../../../components/PayPalCheckOutButtons/JSSDKRenderedButtons/SmartPaymentBtn/PayPalMarksAndEligible";

const payPalMarksAndEligible =  PayPalMarksAndEligible.build(PAYMENT_METHOD.PAYPAL_BNPL);

const PaymentTable: FC = () => {
    const dispatch = useAppDispatch();

    const APMMethod = useAppSelector((state) => {
        return getAPMMethod(state);
    });

    // const radio_value_global = useAppSelector(
    //     (state) => state.paymentMethod.method
    // );

    //用以控制支付方式变化的默认值
    const [useRadioOnChange, setUseRadioOnChange] = useState(true);

    const radio_value_global = useAppSelector((state) =>
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

    //PayPal wallet Logo
    const paypal_logo = (
        <img
            className=" w-1/2 h-8 ml-14 object-contain inline-block"
            src={process.env.PUBLIC_URL + "/image/paypal-logo.svg"}
        />
    );

    //Debit or Credit Card Logo
    const paypal_used = (
        <>
            {/* <img
                className=" w-1/2 h-10 object-contain  inline-block"
                src={process.env.PUBLIC_URL + "/image/paypal-used.svg"}
            /> */}
            <img
                className=" w-1/2 h-8 object-contain  inline-block ml-4"
                src={process.env.PUBLIC_URL + "/image/card.svg"}
            />
        </>
    );

    const payLater_logo = (
        <>
            <img
                className=" w-1/2 h-8 object-contain  inline-block ml-28"
                src={process.env.PUBLIC_URL + "/image/pay-later.png"}
            />
        </>
    );

    const APM_logo = () => {
        let imgUrl;
        if (APMMethod === APM_METHOD_ENUM.Bancontact) {
            imgUrl =
                "https://www.paypalobjects.com/js-sdk-logos/2.2.7/bancontact-black.svg";
        } else if (APMMethod === APM_METHOD_ENUM.SOFORT) {
            imgUrl =
                "https://www.paypalobjects.com/js-sdk-logos/2.2.7/sofort-black.svg";
        } else if (APMMethod === APM_METHOD_ENUM.iDEAL) {
            imgUrl =
                "https://www.paypalobjects.com/js-sdk-logos/2.2.7/ideal-black.svg";
        } else if (APMMethod === APM_METHOD_ENUM.BLIK) {
            imgUrl =
                "https://www.paypalobjects.com/js-sdk-logos/2.2.7/blik-black.svg";
        } else if (APMMethod === APM_METHOD_ENUM.eps) {
            imgUrl =
                "https://www.paypalobjects.com/js-sdk-logos/2.2.7/eps-black.svg";
        } else if (APMMethod === APM_METHOD_ENUM.giropay) {
            imgUrl =
                "https://www.paypalobjects.com/js-sdk-logos/2.2.7/giropay-black.svg";
        } else if (APMMethod === APM_METHOD_ENUM.MyBank) {
            imgUrl =
                "https://www.paypalobjects.com/js-sdk-logos/2.2.7/mybank-black.svg";
        } else if (APMMethod === APM_METHOD_ENUM.PUI) {
        } else if (APMMethod === APM_METHOD_ENUM.Przelewy24) {
            imgUrl =
                "https://www.paypalobjects.com/js-sdk-logos/2.2.7/p24-black.svg";
        }

        return (
            <>
                <img
                    src={imgUrl}
                    className=" w-1/3 h-8 object-contain  inline-block ml-20"
                />
            </>
        );
    };

    const buttonTables = function () {
        const lists = [
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
                logo: APM_logo(),
                additionalInfo: null,
            },
            {
                value: PAYMENT_METHOD.PAYPAL_BNPL,
                label: "Pay later",
                logo: payLater_logo,
                additionalInfo: null,
            },
        ];
        if (useRadioOnChange) {
            /* [2023-10-09]radio button的点击事件来变动支付方式而不是按钮 */
            // [2023-12-26]代码优化, 把一个一个写死的项目改变为数组遍历渲染
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
    return (
        <div
            className={classNames({
                "text-base  leading-7 relative": true,
                "space-y-6 py-8": isUseMoreSpace,
            })}
        >
            {
                //显示 点击这个按钮用以切换支付方式的选择方式 的toggle按钮
                changePaymentMethodComponent()
            }

            {/* ----------------------------------------------------------------------- */}

            {/* [2023-10-09]添加文字头 */}
            <p className="text-gray-400 font-extrabold">Payment Method</p>

            {/* [2023-10-09]为了控制台不报 validateDOMNesting(...) 错, 把表格去掉 */}
            {  buttonTables()}
        </div>
    );
};

export default PaymentTable;
