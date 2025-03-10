import { FC } from "react";

import MyPanel from "@/components/Panel/MyPanel";
import { useAppSelector } from "@/typeHooks";
import {
    getJsSDKClientID,
    getJsSDKSecretKey,
} from "@/reducer/reducers/clientSecretReducer";
import {
    getPayPalWalletCustomerID,
    getPayPalWalletMerchantID,
    getPayPalWalletVaultID,
} from "@/reducer/reducers/vaultReducer";
import { Button } from "@mui/material";

import { persistor } from "@/reducer/store";

const codeHighlightStyle = {
    borderRadius: ".25rem",
    padding: ".125rem .25",
    backgroundColor: "#F2F1F1",
    color: "black",
    margin: ".25rem",
    fontWeight: "bold",
};

const HomePage: FC = () => {
    const clientID = useAppSelector((state) => getJsSDKClientID(state));
    const secretKey = useAppSelector((state) => getJsSDKSecretKey(state));
    const vaultID = useAppSelector((state) => getPayPalWalletVaultID(state));

    const customerID = useAppSelector((state) =>
        getPayPalWalletCustomerID(state)
    );

    const merchantID = useAppSelector((state) =>
        getPayPalWalletMerchantID(state)
    );

    return (
        <div className=" space-y-2">
            <MyPanel>
                <div className=" block">
                    您可以在{" "}
                    <span style={codeHighlightStyle}>Payment Setting</span> 中,
                    选择在<span style={codeHighlightStyle}>Checkout</span>
                    页面里需要展示的Payment Method. (如果选择了Apple
                    Pay作为显示的支付方式, 那么它虽然会被列出,
                    但是需要您的设备支持Apple Pay)
                    {/* <AddShippingInCreateOrder /> */}
                </div>
            </MyPanel>

            <MyPanel>
                <div>
                    <Button onClick={()=>{
                        persistor.purge();
                    }}>Purge Browser LocalStorage</Button>                   
                </div>
                Please Refresh Browser Tag after purge LocalStorage, because Data in Memory is not cleared yet. <br/>
                If you want to use your own Vault Info, then do not purge LocalStorage.
            </MyPanel>
            <MyPanel>
                <div className="justify-between flex">
                    <p style={codeHighlightStyle}>ClientID:</p>
                    <p>{clientID}</p>
                </div>
                <div className="justify-between flex">
                    <p style={codeHighlightStyle}>SecretKey:</p>
                    <p>{secretKey}</p>
                </div>

                <div className="flex items-center">
                    <div className="m-2 rounded-lg border-2 p-2">
                        <div className="m-1">PayPal Wallet Vault Info</div>
                        <hr />
                        <div className="justify-between flex mt-1">
                            <p style={codeHighlightStyle}>VaultID:</p>
                            <p>{vaultID}</p>
                        </div>
                        <div className="justify-between flex">
                            <p style={codeHighlightStyle}>CustomerID:</p>
                            <p>{customerID}</p>
                        </div>
                        <div className="justify-between flex">
                            <p style={codeHighlightStyle}>MerchantID:</p>
                            <p>{merchantID}</p>
                        </div>
                    </div>
                </div>
            </MyPanel>
        </div>
    );
};

export default HomePage;
