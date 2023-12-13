import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FC, useState } from "react";
import { setAPMButtonsDisable } from "../../reducer/reducers/globalToggleReducer";
import { getAPMButtonsDisable } from "../../reducer/reducers/globalToggleReducer";
import { useAppSelector, useAppDispatch } from "../../typeHooks";
import { APMMethod } from "./index";

const APMButtonGroup: FC<APMMethod> = (childrenProp: APMMethod) => {
    const { method, setMethod } = childrenProp;

    const APMMethodList = [
        "Bancontact",
        "BLIK",
        "eps",
        "giropay",
        "iDEAL",
        "MyBank",
        //Pay upon invoice 的方式先不做
        // "Pay upon invoice",
        "Przelewy24",
        "SOFORT",
    ];

    const children = APMMethodList.map((APMMethod) => {
        return (
            <ToggleButton
                value={APMMethod}
                key={APMMethod}
                //margin不手动为0话会被设为-1, 看起来很奇怪;加粗字体看起来更清楚些
                style={{ margin: "0px", fontWeight: 700 }}
            >
                {APMMethod}
            </ToggleButton>
        );
    });
    const dispatch = useAppDispatch();

    const isDisable: boolean = useAppSelector((state) =>
        getAPMButtonsDisable(state)
    );

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAPM: string
    ) => {
        if (newAPM) {
            dispatch(setAPMButtonsDisable(true));
            console.log("当前的APM方式:", newAPM);
            setMethod(newAPM);
        }
    };

    return (
        <div>
            <ToggleButtonGroup
                size="large"
                color="primary"
                value={method}
                exclusive
                onChange={handleChange}
                disabled={isDisable}
            >
                {children}
            </ToggleButtonGroup>
        </div>
    );
};

export default APMButtonGroup;
