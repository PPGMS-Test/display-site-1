import UseJSSDK, { JSSDKParams } from "@/service/LoadPayPalScript/UseJSSDK";
import { FC, useEffect } from "react";
import { onGooglePayLoaded } from "./GooglePayLoad";

const GooglePayButton: FC = () => {
    useEffect(() => {
        let JSLoadParams: JSSDKParams = {
            addressCountry: "US",
        };

        const GoogleLoadScriptPromise = new Promise<void>((resolve) => {
            let mScript = document.createElement("script");
            const url = "https://pay.google.com/gp/p/js/pay.js";
            console.log("[UseJSSDK.ts] Smart Payment button Url:", url);
            mScript.src = url;
            document.getElementById("root")?.appendChild(mScript);
            mScript.onload = function () {
                console.log(
                    "--[GoogleLoadScriptPromise]Google Pay Script Loaded"
                );
                resolve();
            };
        });

        const PayPalLoadScriptPromise: Promise<void> = UseJSSDK(JSLoadParams);

        Promise.all([GoogleLoadScriptPromise, PayPalLoadScriptPromise]).then(
            () => {
                console.log("Both Promises are resolved!");
                if (window.google && window.paypal.Googlepay) {
                    console.log("[Google&PayPal Object checked!]");
                    onGooglePayLoaded().catch(console.log);
                }
                // onGooglePayLoaded().catch(console.log);
            }
        );
    });

    return (
        <>
            <div id="google-button-container"></div>
        </>
    );
};

export default GooglePayButton;
