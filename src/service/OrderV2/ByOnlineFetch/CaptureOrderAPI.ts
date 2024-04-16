import store from "../../../reducer/store";
import { orderSlice } from '../../../reducer/reducers/orderReducer';
import { base, getJsSDKClientIDSecretKey, handleResponse } from './API';

const CaptureOrderFetchAPI = async () => {
    const { clientID, secretKey } = getJsSDKClientIDSecretKey();


    console.log("[OrderV2.ByOnlineFetch.CreateOrderAPI] CaptureOrder #1, <Start>")
    const orderID = store.getState().orderInfo.orderID;
    const response = fetch(`${base}/v2/checkout/orders/${orderID}/capture`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "PayPal-Partner-Attribution-Id": "PP-Test-Petro",
            Authorization: `Basic ${btoa(
                `${clientID}:${secretKey}`
            )}`,
        }
    });

    const { jsonResponse, httpStatusCode } = await handleResponse(response)
    console.log("[OrderV2.ByOnlineFetch.CaptureOrderAPI] CaptureOrder #2, <ResponseCode>\r\n", httpStatusCode, " <Response>:\r\n", jsonResponse)
    // debugger;

    const transactionID = jsonResponse["purchase_units"][0]["payments"]["captures"][0].id;
    console.log(transactionID)
    if (transactionID)
        store.dispatch(orderSlice.actions.setTransactionID(transactionID))
    return { transactionID, jsonResponse, httpStatusCode }


};

export default CaptureOrderFetchAPI;
