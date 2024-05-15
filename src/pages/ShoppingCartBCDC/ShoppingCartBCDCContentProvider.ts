import { Dispatch, SetStateAction, createContext } from "react";

export default createContext<{
    SPBPendingFlag: boolean, setSPBPendingFlag: Dispatch<SetStateAction<boolean>>
}>({} as any)