import React from "react";

class App extends React.Component {
  componentDidMount() {
    console.log("xxx");
    const script = document.createElement("script");

    const client_id =
      "AY13GPAAVtyuFAmqUT9FWoLIpTQo2B1u_LXupEn3390NjUnOK6qPZFbeJbMqY2nBnVLLronvqG8uNeIE";
    const url = `https://www.paypal.com/sdk/js?client-id=${client_id}&buyer-country=US`;
    script.src = url;
    script.async = false;
    const baseOrderAmount = "15.00";
    document.getElementById("root").appendChild(script);
    console.clear();
    // debugger;

    try {
        script.onload = function () {
            window.paypal
              .Buttons({
                createOrder: function (data, actions) {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          // value: baseOrderAmount,
                          value: 15,
                          // currency_code: "EUR",
                          currency_code: "USD",
                        },
                        shipping: {
                          options: [
                            {
                              id: "SHIP_123",
                              label: "Free Shipping",
                              type: "SHIPPING",
                              selected: true,
                              amount: {
                                value: "3.00",
                                currency_code: "USD",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  });
                },
                onShippingChange: function (data, actions) {
                  debugger;
                  data.amount.value =
                    // parseFloat(baseOrderAmount) +
                    (
                      15 + parseFloat(data.selected_shipping_option.amount.value)
                    ).toFixed(2);
                  console.log("data.amount.value", data.amount.value);
      
                  let obj = actions.order.patch([
                    {
                      op: "replace",
                      path: "/purchase_units/@reference_id=='default'/amount",
                      value: {
                        value: data.amount.value,
                        // value: 88,
                        currency_code: "USD",
                      },
                    },
                  ]);
                  debugger;
                  return obj;
                },
              })
              .render("#paypal-button-container");
          };
    } catch (error) {
        console.log(error)
    }
    
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
