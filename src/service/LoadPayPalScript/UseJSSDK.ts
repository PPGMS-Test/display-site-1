import { Input } from '@mui/material';
import { BuyerInfo } from '../../reducer/reducers/buyerInfoReducer';


// bussiness: paypal-sandbox-us@pptest.com
// pwd:111222333
// bncode: PP-Test-Petro
window.clientID = "AbdLhKRGmSLshAiaLdfrdePdMhlnq8n4aRM3p7bwFgYL6FewsYiTGdfviIbTULFVvoIKi4hlyTcbat8S"
window.secretKey = "EI8c5mSYLjn-9JSGYWSODXySJ3YukZCSt8OIR0Qwu4U6rnvpdgmV-7m2xso_zHDGwb1avA25oH7kqjki";

export interface JSSDKParams {
    input?: Function,
    addressCountry: string,
    additionalOptions?: Map<string, string>,
    [key: string]: any;
}

const UseJSSDK = function (loadParam: JSSDKParams) {
    let { input, addressCountry, additionalOptions } = loadParam;
    // debugger;
    let additionalParams: string[] = new Array<string>();
    if (additionalOptions) {
        additionalOptions.forEach((value, key) => {
            additionalParams.push(`${key}=${value}`)
        })
    }

    return new Promise<void>((resolve) => {
        let PayPal_SPB_JS_SDK_LoadScript = document.createElement("script");
        console.log("[UseJSSDK.ts] PayPal JS SDK load!");
        const client_id = window.clientID;

        const url = `https://www.paypal.com/sdk/js?client-id=${client_id}&buyer-country=${addressCountry}${additionalParams.length > 0 ? "&" + additionalParams.join("&") : ""}`;
        console.log("[UseJSSDK.ts] Smart Payment button Url:", url)
        PayPal_SPB_JS_SDK_LoadScript.src = url;
        PayPal_SPB_JS_SDK_LoadScript.async = false;
        document
            .getElementById("root")
            ?.appendChild(PayPal_SPB_JS_SDK_LoadScript);
        // console.clear();

        PayPal_SPB_JS_SDK_LoadScript.onload = function () {
            console.log("[UseJSSDK.ts] SDK load Complete!");
            input && input.call(this);
            resolve();
        };
    });
};
export default UseJSSDK;
