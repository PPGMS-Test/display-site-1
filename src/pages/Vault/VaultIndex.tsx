import { MenuItem, Select } from "@mui/material";
import { FC, useState } from "react";
import { useAppSelector } from "../../typeHooks";
import { getVaultClientID, getVaultSellerID } from "../../reducer/reducers/VaultReducer";
import ClientIDList from "./VaultConstant/ClientID.json";
import SellerIDList from "./VaultConstant/SellerID.json"

const VaultIndex: FC = () => {
    const initVaultClientID = useAppSelector((state) =>
        getVaultClientID(state)
    );
    const initVaultSellerID = useAppSelector((state) =>
        getVaultSellerID(state)
    );
    const [clientID, setClientID] = useState(initVaultClientID);
    const [sellerID, setSellerID] = useState(initVaultSellerID);
    return (
        <div>
            Global Setting:
            <Select
                labelId="clientID-select-label"
                id="clientID"
                value={clientID}
                label="clientID"
                onChange={(data) => {
                    setClientID(data.target.value);
                }}
            >
                {ClientIDList.map((item) => {
                    return (
                        <MenuItem value={item.ClientID}>
                            {item.CountryCode}
                        </MenuItem>
                    );
                })}
            </Select>

            <Select
                labelId="sellerID-select-label"
                id="sellerID"
                value={sellerID}
                label="sellerID"
                onChange={(data) => {
                    setSellerID(data.target.value);
                }}
            >
                {SellerIDList.map((item) => {
                    return (
                        <MenuItem value={item.sellerID}>
                            {item.countryCode}
                        </MenuItem>
                    );
                })}
            </Select>
        </div>
    );
};

export default VaultIndex;
