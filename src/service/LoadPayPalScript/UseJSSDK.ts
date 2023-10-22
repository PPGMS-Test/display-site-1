// bussiness: paypal-sandbox-us@pptest.com
// pwd:111222333
// bncode: PP-Test-Petro
window.clientID = "AbdLhKRGmSLshAiaLdfrdePdMhlnq8n4aRM3p7bwFgYL6FewsYiTGdfviIbTULFVvoIKi4hlyTcbat8S"
window.secretKey = "EI8c5mSYLjn-9JSGYWSODXySJ3YukZCSt8OIR0Qwu4U6rnvpdgmV-7m2xso_zHDGwb1avA25oH7kqjki";

const UseJSSDK = function (input: Function = () => { }) {
    return new Promise<void>((resolve) => {
        let PayPal_SPB_JS_SDK_LoadScript = document.createElement("script");
        console.log("[UseJSSDK.ts] PayPal JS SDK load!");
        const client_id = window.clientID;

        const url = `https://www.paypal.com/sdk/js?client-id=${client_id}&buyer-country=US`;
        console.log("[UseJSSDK.ts] Smart Payment button Url:", url)
        PayPal_SPB_JS_SDK_LoadScript.src = url;
        PayPal_SPB_JS_SDK_LoadScript.async = false;
        document
            .getElementById("root")
            ?.appendChild(PayPal_SPB_JS_SDK_LoadScript);
        // console.clear();

        PayPal_SPB_JS_SDK_LoadScript.onload = function () {
            console.log("[UseJSSDK.ts] SDK load Complete!");
            input.call(this);
            resolve();
        };
    });
};
export default UseJSSDK;
