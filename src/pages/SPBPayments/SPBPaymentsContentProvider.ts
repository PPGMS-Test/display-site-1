import { Dispatch, SetStateAction, createContext } from "react";

export default createContext<{
    showSPBAreaFlag: boolean,
    setShowSPBAreaFlag: Dispatch<SetStateAction<boolean>>,
    PayPalJSSDK: Promise<any>,
    setJSLoadCountry: Dispatch<SetStateAction<string>>
}>({} as any)