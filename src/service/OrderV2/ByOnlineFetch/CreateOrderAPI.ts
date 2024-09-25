
import store from "@/reducer/store";
import { v4 as uuidv4 } from 'uuid';
import { base, getJsSDKClientIDSecretKey, handleResponse } from './API';
import { orderSlice } from "@/reducer/reducers/orderReducer";


const CreateOrderFetchAPI = async (requestBody: any) => {
    console.log("[OrderV2.ByOnlineFetch.CreateOrderAPI] CreateOrder #1, <Start>")
    const { clientID, secretKey } = getJsSDKClientIDSecretKey();
    // debugger;
    console.log("clientID:", clientID)
    console.log("secretKey:", secretKey)

    console.log(JSON.stringify(requestBody, null, "  "))
    const response = fetch(`${base}/v2/checkout/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "PayPal-Partner-Attribution-Id": "PP-Test-Petro",
            Authorization: `Basic ${btoa(
                `${clientID}:${secretKey}`
            )}`,
            "PayPal-Request-Id": uuidv4()
        },

        body: JSON.stringify(requestBody),
    })

    const { jsonResponse, httpStatusCode } = await handleResponse(response)
    console.log("[OrderV2.ByOnlineFetch.CreateOrderAPI] CreateOrder #2, \r\n<ResponseCode>\r\n", httpStatusCode, " \r\n<Response>:\r\n", JSON.stringify(jsonResponse, null, "  "))
    let orderID = jsonResponse?.id

    //等效
    store.dispatch(orderSlice.actions.setOrderID(orderID))
    // store.dispatch(setOrderID(orderID))

    // debugger;
    return { orderID, httpStatusCode }


};

export default CreateOrderFetchAPI;
