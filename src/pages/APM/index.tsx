import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { FC, useState } from "react";
import APMInstructionArea from "./APMInstructionArea";
import APMDisplayArea from "./APMDisplayArea";
import APMButtonGroup from "./APMButtonGroup";

export interface APMMethod {
    method: string;
    setMethod: Function;
}

const APM: FC = () => {
    const [APMMethod, setAPMMethod] = useState("SOFORT");
    console.log("APM页面!");

    return (
        <div>
            <APMButtonGroup method={APMMethod} setMethod={setAPMMethod} />
            <APMInstructionArea method={APMMethod} setMethod={setAPMMethod} />
            <div>
                <APMDisplayArea method={APMMethod} setMethod={setAPMMethod} />
            </div>
        </div>
    );
};

export default APM;
