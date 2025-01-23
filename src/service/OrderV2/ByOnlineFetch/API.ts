
import { getAccessToken } from "@/reducer/reducers/clientSecretReducer";
import store from "@/reducer/store";


//ClientID和SecretKey在index.html中的值, 基本上不会用到. 是由最一开始做法遗留下的
export const PAYPAL_CLIENT_ID = window.clientID;
export const PAYPAL_CLIENT_SECRET = window.secretKey;

export const base = "https://api.sandbox.paypal.com";

export const getJsSDKClientIDSecretKey = () => {
    let isCustomizedClient: boolean = store.getState().JsSDKInfo.isCustomizedClient;
    let clientID: string = PAYPAL_CLIENT_ID
    let secretKey: string = PAYPAL_CLIENT_SECRET
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

export const getBearerAccessToken = () => {
    return `Bearer ${getAccessToken(store.getState())}`
}

const storeAccessToken = (accessToken: string) => {
    store.dispatch({
        type: "JsSDKInfo/setAccessToken",
        payload: accessToken
    })
}

const getVaultSetting = () => {
    const vaultSetting = store.getState().vault.vaultSetting;
    const oneTime = vaultSetting.oneTime;
    const recurring = vaultSetting.recurring;
    const isOneTime = oneTime.isOneTime;
    const isRecurring = recurring.isRecurring;
    const oneTimeSetting = oneTime.oneTimeSetting;
    const recurringSetting = recurring.recurringSetting;
    const isSavePayPalWallet = oneTimeSetting.isSavePayPalWallet;
    const isSaveACDC = oneTimeSetting.isSaveACDC;
    const isUsePayPalWallet = recurringSetting.isUsePayPalWallet;
    const isUseACDC = recurringSetting.isUseACDC;
    return {
        isOneTime,
        isRecurring,
        isSavePayPalWallet,
        isSaveACDC,
        isUsePayPalWallet,
        isUseACDC
    }
}

const getVaultPayPalData = () => {
    let vaultData = store.getState().vault.vaultData;
    const { paypalWallet } = vaultData;
    return { paypalWallet }
}

const getVaultACDCData = () => {
    let vaultData = store.getState().vault.vaultData;
    const { acdc } = vaultData;
    return { acdc }
}

export const generatePayPalAuthAssertion = (clientID: string, merchantID: string) => {
    let PayPal_Auth_Assertion;
    let to_encode = {
        iss: clientID,
        payer_id: merchantID,
    };

    let to_encode_str = JSON.stringify(to_encode);
    let encoded_str = btoa(to_encode_str);
    PayPal_Auth_Assertion = `eyJhbGciOiJub25lIn0=.${encoded_str}.`;
    console.log("PayPal_Auth_Assertion Created!");
    console.log("clientID:", clientID);
    console.log("merchantID:", merchantID);
    console.log("PayPal-Auth-Assertion:", PayPal_Auth_Assertion);
    return PayPal_Auth_Assertion;
};

export const generateAccessToken = async () => {
    const { clientID, secretKey } = getJsSDKClientIDSecretKey();
    const {
        isOneTime,
        isRecurring,
        isSavePayPalWallet,
        isSaveACDC,
        isUsePayPalWallet,
        isUseACDC
    } = getVaultSetting();
    try {
        if (!clientID || !secretKey) {
            throw new Error("MISSING_API_CREDENTIALS");
        }

        const auth = btoa(`${clientID}:${secretKey}`)

        let body: any;

        const request = {
            method: "POST",
            body: body,
            headers: {
                Authorization: `Basic ${auth}`,
                "Paypal-Auth-Assertion": generatePayPalAuthAssertion(
                    clientID,
                    "CMHAMMNAXCMGA"
                ),
            },

        }
        printFlags(isOneTime,
            isRecurring,
            isSavePayPalWallet,
            isSaveACDC,
            isUsePayPalWallet,
            isUseACDC)

        if (isRecurring) {
            let target_customer_id: string = "";
            if (isUsePayPalWallet) {
                let { paypalWallet } = getVaultPayPalData();
                target_customer_id = paypalWallet.customerId;
            }
            if (isUseACDC) {
                let { acdc } = getVaultACDCData();
                target_customer_id = acdc.customerId;
            }
            body = new URLSearchParams({
                grant_type: "client_credentials",
                response_type: "id_token",
                target_customer_id: target_customer_id,
            })
        }
        if (isOneTime) {
            body = "grant_type=client_credentials"
        }

        console.log(JSON.stringify(request, null, "  "))
        request['body'] = body;

        const response = await fetch(`${base}/v1/oauth2/token`, request);

        const data = await response.json();
        storeAccessToken(data.access_token);
        return { access_token: data.access_token, id_token: data.id_token };
    } catch (error) {
        console.error("Failed to generate Access Token:", error);
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
        const errorMessage = await responsePromise.then(data => data.text());
        throw new Error(errorMessage);
    }
}


// This API is DEPRECATED. 'data-user-id-token' is now could also be created when calling 
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

const printFlags = (isOneTime: boolean,
    isRecurring: boolean,
    isSavePayPalWallet: boolean,
    isSaveACDC: boolean,
    isUsePayPalWallet: boolean,
    isUseACDC: boolean) => {
    const arr = [{
        isRecurring: isRecurring,
        isOneTime: isOneTime,
        isSavePayPalWallet: isSavePayPalWallet,
        isUsePayPalWallet: isUsePayPalWallet,
        isSaveACDC: isSaveACDC,
        isUseACDC: isUseACDC,
    }]
    console.table(arr)
}