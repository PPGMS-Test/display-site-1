import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { FC, useState } from "react";
const APM: FC = () => {
    const [APMMethod, setAPMMethod] = useState("Bancontact");

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAPM: string
    ) => {
        setAPMMethod(newAPM);
    };

    const APMMethodList = [
        "Bancontact",
        "BLIK",
        "eps",
        "giropay",
        "iDEAL",
        "MyBank",
        "Pay upon invoice",
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
    return (
        <div>
            <ToggleButtonGroup
                size="large"
                color="primary"
                value={APMMethod}
                exclusive
                onChange={handleChange}
            >
                {children}
            </ToggleButtonGroup>
        </div>
    );
};

export default APM;
