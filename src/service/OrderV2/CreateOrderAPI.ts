import { orderSlice, setOrderID } from './../../reducer/reducers/orderReducer';
import store from "../../reducer/store";
import { v4 as uuidv4 } from 'uuid';
// import { useDispatch } from 'react-redux';

// const state = store.getState();

const CreateOrder = (requestBody: any) => {
    // debugger;

    return fetch("https://api.sandbox.paypal.com/v2/checkout/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "PayPal-Partner-Attribution-Id": "PP-Test-Petro",
            Authorization: `Basic ${btoa(
                `${window.clientID}:${window.secretKey}`
            )}`,
            "PayPal-Request-Id": uuidv4()
        },
        body: JSON.stringify(requestBody),
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log(data)
        // debugger;
        let orderID = data?.id
        //等效
        store.dispatch(orderSlice.actions.setOrderID(orderID))
        // store.dispatch(setOrderID(orderID))
        return orderID
    });
};

export default CreateOrder;
