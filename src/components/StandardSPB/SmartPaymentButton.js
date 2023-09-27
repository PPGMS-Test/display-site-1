import React from "react";
import PayPal_SPB_JS_SDK_LoadScript from "../LoadPayPalScript/JSSDK";
import CreateOrderObject from "../LoadPayPalScript/createOrderObject";
class App extends React.Component {
    componentDidMount() {
        // const script = document.createElement("script");

        // const client_id =
        //   "AY13GPAAVtyuFAmqUT9FWoLIpTQo2B1u_LXupEn3390NjUnOK6qPZFbeJbMqY2nBnVLLronvqG8uNeIE";
        // const url = `https://www.paypal.com/sdk/js?client-id=${client_id}&buyer-country=US`;
        // script.src = url;
        // script.async = false;
        // document.getElementById("root").appendChild(script);
        // console.clear();
        // debugger;

        // const baseOrderAmount = "15.00";
        // PayPal_SPB_JS_SDK_LoadScript.onload = function () {
        //   try {

        //   } catch (error) {
        //     console.log(error);
        //   }
        // };

        window.paypal
            ?.Buttons(CreateOrderObject)
            .render("#paypal-button-container");
    }

    render() {
        return (
            <div>
                <div id="paypal-button-container"></div>
            </div>
        );
    }
}

export default App;
