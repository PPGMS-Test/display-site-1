import store from "../../../reducer/store";
export const PAYPAL_CLIENT_ID = window.clientID;
export const PAYPAL_CLIENT_SECRET = window.secretKey;
export const base = "https://api.sandbox.paypal.com";

export const getJsSDKClientIDSecretKey = () => {
    let isCustomizedClient: boolean = store.getState().JsSDKInfo.isCustomizedClient;
    let clientID = PAYPAL_CLIENT_ID
    let secretKey = PAYPAL_CLIENT_SECRET
    // debugger;
    if (isCustomizedClient) {
        clientID = store.getState().JsSDKInfo.JsSDKClientID;
        secretKey = store.getState().JsSDKInfo.JsSDKSecretKey;
    }
    // debugger;
    return {
        clientID,
        secretKey
    }
}

const generateAccessToken = async () => {
    const { clientID, secretKey } = getJsSDKClientIDSecretKey();
    try {
        if (!clientID || !secretKey) {
            throw new Error("MISSING_API_CREDENTIALS");
        }
        const auth = Buffer.from(
            clientID + ":" + secretKey
        ).toString("base64");
        const response = await fetch(`${base}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("Failed to generate Access Token:", error);
    }
};

const generateClientToken = async () => {
    console.log("[api.js][generateClientToken]Request....")
    const { clientID, secretKey } = getJsSDKClientIDSecretKey();
    try {
        if (!clientID || !secretKey) {
            throw new Error("MISSING_API_CREDENTIALS");
        }
        const auth = Buffer.from(
            clientID + ":" + secretKey
        ).toString("base64");
        const response = await fetch(`${base}/v1/identity/generate-token`, {
            method: "POST",
            body: JSON.stringify({
                customer_id: "001",
            }),
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/json"
            },
        });

        const data = await response.json();

        // console.log("Client token successfully generate!\n")
        // console.log("response body:",JSON.stringify(data,null,"  "))
        return data.client_token;
    } catch (error) {
        console.error("Failed to generate data client token:", error);
    }
};

export async function handleResponse(responsePromise: Promise<any>) {
    console.log("=>[OrderV2.ByOnlineFetch.CreateOrderAPI.js] handleResponse #1")
    try {
       const fulFilledResult = await responsePromise;
       const jsonResponse = await fulFilledResult.json()
    //    debugger;
        return {
            jsonResponse,
            httpStatusCode: fulFilledResult.status,
        };
    } catch (err) {
        const errorMessage = await responsePromise.then(data=>data.text());
        throw new Error(errorMessage);
    }
}