const UseJSSDK = function (input: Function = () => {}) {
    return new Promise<void>((resolve) => {
        let PayPal_SPB_JS_SDK_LoadScript = document.createElement("script");
        console.log("[JSSDK.ts] PayPal JS SDK load!");
        const client_id =
            "AY13GPAAVtyuFAmqUT9FWoLIpTQo2B1u_LXupEn3390NjUnOK6qPZFbeJbMqY2nBnVLLronvqG8uNeIE";
        const url = `https://www.paypal.com/sdk/js?client-id=${client_id}&buyer-country=US`;
        PayPal_SPB_JS_SDK_LoadScript.src = url;
        PayPal_SPB_JS_SDK_LoadScript.async = false;
        document
            .getElementById("root")
            ?.appendChild(PayPal_SPB_JS_SDK_LoadScript);
        // console.clear();

        PayPal_SPB_JS_SDK_LoadScript.onload = function () {
            input.call(this);
            console.log("PayPal SPB JS SDK is loaded!");
            resolve();
        };
    });
};
export default UseJSSDK;
