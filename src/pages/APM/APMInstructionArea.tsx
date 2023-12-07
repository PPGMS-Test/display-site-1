import { FC } from "react";
import { BancontactWord } from "./Bancontact/Bancontact";
import { SOFORTWord } from "./SOFORT/SOFORT";
import { IDEALWord } from "./iDEAL/iDEAL";
import { BLIKWord } from "./BLIK/BLIK";
import { APMMethod } from "./index";

const APMInstructionArea: FC<APMMethod> = (childrenProp: APMMethod) => {
    console.log("APMInstructionArea, APM文章说明区域!");
    const getInstructionWords = () => {
        let instructionWords;
        if (childrenProp.method === "Bancontact") {
            instructionWords = BancontactWord;
            return <div>{instructionWords}</div>;
        } else if (childrenProp.method === "SOFORT") {
            instructionWords = SOFORTWord;
            return <div>{instructionWords}</div>;
        } else if (childrenProp.method === "iDEAL") {
            instructionWords = IDEALWord;
            return <div>{instructionWords}</div>;
        } else if (childrenProp.method === "BLIK") {
            instructionWords = BLIKWord;
            return <div>{instructionWords}</div>;
        }
        return <div>{childrenProp.method}</div>;
    };
    return <div>{getInstructionWords()}</div>;
};
export default APMInstructionArea;
