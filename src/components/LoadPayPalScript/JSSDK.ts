let PayPal_SPB_JS_SDK_LoadScript = document.createElement("script");

const client_id =
    "AY13GPAAVtyuFAmqUT9FWoLIpTQo2B1u_LXupEn3390NjUnOK6qPZFbeJbMqY2nBnVLLronvqG8uNeIE";
const url = `https://www.paypal.com/sdk/js?client-id=${client_id}&buyer-country=US`;
PayPal_SPB_JS_SDK_LoadScript.src = url;
PayPal_SPB_JS_SDK_LoadScript.async = false;
document.getElementById("root")?.appendChild(PayPal_SPB_JS_SDK_LoadScript);
console.clear();

export default PayPal_SPB_JS_SDK_LoadScript;
