import store from "../../reducer/store";
import { orderSlice } from './../../reducer/reducers/orderReducer';

const CaptureOrderAPI = () => {
    const orderID = store.getState().orderInfo.orderID;
    return fetch(`https://api.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "PayPal-Partner-Attribution-Id": "PP-Test-Petro",
            Authorization: `Basic ${btoa(
                `${window.clientID}:${window.secretKey}`
            )}`,
        }
    }).then(res => res.json()).then(data => {
        // debugger;
        const transactionID = data["purchase_units"][0]["payments"]["captures"][0].id;
        console.log(transactionID)
        store.dispatch(orderSlice.actions.setTransactionID(transactionID))
        return transactionID
    });
};

export default CaptureOrderAPI;
