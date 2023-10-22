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
import React, { useEffect, useState } from "react";
// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useAppDispatch, useAppSelector } from "../../typeHooks";
import {
    get_payment_method,
    setPaymentMethod,
} from "../../reducer/reducers/paymentMethodReducer";

import PAYMENT_METHOD from "../../enum/PAYMENT_METHOD";
import classNames from "classnames";
import { getIsMoreSpace } from "../../reducer/reducers/globalToggleReducer";

const PaymentTable = () => {
    const dispatch = useAppDispatch();

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

    const isUseMoreSpace: boolean = useAppSelector(
        (state) =>  getIsMoreSpace(state)
    );

    const buttonTables = function () {
        if (useRadioOnChange) {
            /* [2023-10-09]radio button的点击事件来变动支付方式而不是按钮 */
            return (
                <div>
                    <RadioGroup
                        value={radio_value}
                        onChange={handleChange_ChangePaymentMethod}
                    >
                        <div className="pl-2 w-full">
                            <FormControlLabel
                                value={PAYMENT_METHOD.PAYPAL_STANDARD}
                                control={<Radio color="primary" />}
                                label="PayPal"
                                disabled={radioBtnDisable}
                            />
                            *LOGO* &nbsp;
                        </div>

                        <div className="pl-2 w-full">
                            <FormControlLabel
                                value={PAYMENT_METHOD.PAYPAL_BCDC}
                                control={<Radio color="primary" />}
                                label="Debit or Credit Card"
                                disabled={radioBtnDisable}
                            />
                            *LOGO* &nbsp;
                        </div>
                    </RadioGroup>
                </div>
            );
        } else {
            return (
                <div>
                    <RadioGroup value={radio_value} onChange={handleChange}>
                        <div className="pl-2 w-full">
                            <FormControlLabel
                                value={PAYMENT_METHOD.PAYPAL_STANDARD}
                                control={<Radio color="primary" />}
                                label="PayPal"
                            />
                            *LOGO* &nbsp;
                        </div>

                        <div className="pl-2 w-full">
                            <FormControlLabel
                                value={PAYMENT_METHOD.PAYPAL_BCDC}
                                control={<Radio color="primary" />}
                                label="Debit or Credit Card"
                            />
                            *LOGO* &nbsp;
                        </div>
                    </RadioGroup>

                    <Button
                        variant="contained"
                        color="primary"
                        // endIcon={<ArrowForwardIosIcon />}
                        // endIcon={<Icon>send</Icon>}
                        onClick={() => {
                            console.clear();
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
    return (
        <div
            className={classNames({
                "text-base  leading-7 relative": true,
                "space-y-6 py-8": isUseMoreSpace,
            })}
        >
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
                        label={useRadioOnChange?"选中radio button":"点击按钮"}
                    />
                </Tooltip>
            </div>
            {/* --    radio group sample --

    <FormControl component="fieldset">
        <FormLabel component="legend">
          <p className="text-gray-400 font-extrabold">Payment Method</p>
        </FormLabel>
        <RadioGroup
          // row
          aria-label="position"
          name="position"
          defaultValue="top"
        >
          <FormControlLabel
            value="A"
            control={<Radio color="primary" />}
            label="A"
          />

          <FormControlLabel
            value="B"
            control={<Radio color="primary" />}
            label="B"
          />
          <FormControlLabel
            value="C"
            control={<Radio color="primary" />}
            label="C"
          />
          
        </RadioGroup>
    </FormControl> 
*/}

            {/* 
            <div>
                表格式样还需调整, width max属性不起作用
                <table className=" mx-auto w-full table-auto  rounded-lg border-separate border-spacing-2 border border-slate-400">
                    <tbody>
                        <RadioGroup value={radio_value} onChange={handleChange}>
                            <tr className="w-full">
                                <td className="w-full border border-slate-300 rounded">
                                    <div className="pl-2 w-full">
                                        <FormControlLabel
                                            value={
                                                PAYMENT_METHOD.PAYPAL_STANDARD
                                            }
                                            control={<Radio color="primary" />}
                                            label="PayPal"
                                        />
                                        *LOGO* &nbsp;
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-slate-300 rounded">
                                    <div className="pl-2 w-full">
                                        <FormControlLabel
                                            value={PAYMENT_METHOD.PAYPAL_BCDC}
                                            control={<Radio color="primary" />}
                                            label="Debit or Credit Card"
                                        />
                                        *LOGO* &nbsp;
                                    </div>
                                </td>
                            </tr>

                            [2023-10-08 去除支付方式中的APM按钮 ]
                            <tr>
                                <td className="border border-slate-300 rounded">
                                    <div className="pl-2 w-full">
                                        <FormControlLabel
                                            value={PAYMENT_METHOD.PAYPAL_APM}
                                            control={<Radio color="primary" />}
                                            label="APM"
                                        />
                                        *LOGO* &nbsp;
                                    </div>
                                </td>
                            </tr>          

                        </RadioGroup>
                    </tbody>
                </table>
            
        */}

            {/* ----------------------------------------------------------------------- */}

            {/* [2023-10-09]添加文字头 */}
            <p className="text-gray-400 font-extrabold">Payment Method</p>

            {/* [2023-10-09]为了控制台不报 validateDOMNesting(...) 错, 把表格去掉 */}
            {buttonTables()}
        </div>
    );
};

export default PaymentTable;
