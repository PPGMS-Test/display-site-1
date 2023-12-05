import { FC } from "react";

export interface APMMethod {
    method: string;
}
const APMInstructionArea: FC<APMMethod> = (childrenProp: APMMethod) => {
    const getInstructionWords = () => {
        let instructionWords;
        if (childrenProp.method === "Bancontact") {
            let instructionWords =
                "Bancontact is the most widely used, accepted and trusted electronic payment method in Belgium, with over 15 million Bancontact cards issued, and 150,000 online transactions processed a day. Bancontact makes it possible to pay directly through the online payment systems of all major Belgian banks and can be used by all customers with a Bancontact branded payment card. Bancontact cards are issued by more than 20 Belgian banks and exists solely in Belgium.";
            return <div>{instructionWords}</div>;
        }
        return <div>{childrenProp.method}</div>;
    };
    return <div>{getInstructionWords()}</div>;
};
export default APMInstructionArea;
