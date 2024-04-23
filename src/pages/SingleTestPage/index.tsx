import { FC, useEffect, useState } from "react";
import UseJSSDK from "../../service/LoadPayPalScript/UseJSSDK";
import FakeSPBButton from "../../components/FakeSPBButton/FakeSPBButton";
import PayPalMarksAndEligible from "../../components/PayPalCheckOutButtons/JSSDKRenderedButtons/SmartPaymentBtn/PayPalMarksAndEligible";
import PAYMENT_METHOD from "../../enum/PAYMENT_METHOD";

const payPalMarksAndEligible =  PayPalMarksAndEligible.build(PAYMENT_METHOD.PAYPAL_BNPL);

const SinglePageTest: FC = () => {
    const [orderId, setOrderID] = useState("");

    
    useEffect(() => {
        (async () => {
          
            (await payPalMarksAndEligible)?.renderMarks("paylater","paylater-mark-container");
            (await payPalMarksAndEligible)?.renderMarks("paypal","paypal-mark-container");

            console.log((await payPalMarksAndEligible).getAllEligiblePaymentSource())
        })();
    });

    const US_SHIPPING = {
        options: [
            {
                id: "SHIP_123",
                label: "USD Domestic Standard ",
                type: "SHIPPING",
                selected: true,
                amount: {
                    value: "3.00",
                    currency_code: "USD",
                },
            },
            {
                id: "SHIP_456",
                label: "Pick up in Store",
                type: "PICKUP",
                selected: false,
                amount: {
                    value: "0.00",
                    currency_code: "USD",
                },
            },
            {
                id: "SHIP_789",
                label: "USD Domestic Fast",
                type: "SHIPPING",
                selected: false,
                amount: {
                    value: "4.00",
                    currency_code: "USD",
                },
            },
        ],
    };

    const AR_SHIPPING = {
        options: [
            {
                id: "SHIP_123",
                label: "X-border Standard Shipping",
                type: "SHIPPING",
                selected: true,
                amount: {
                    value: "13.00",
                    currency_code: "USD",
                },
            },
            {
                id: "SHIP_456",
                label: "Pick up in Store",
                type: "PICKUP",
                selected: false,
                amount: {
                    value: "0.00",
                    currency_code: "USD",
                },
            },
            {
                id: "SHIP_789",
                label: "X-border Fast method",
                type: "SHIPPING",
                selected: false,
                amount: {
                    value: "14.00",
                    currency_code: "USD",
                },
            },
        ],
    };

    const PASS_PAYER_IN_CREATE_ORDER = false;
    const USE_POSTMAN_ORDER_ID = true;

    // const DONOTHING_BUT_LOG_ONSHIPPINGCHANGE = true;
    const DONOTHING_BUT_LOG_ONSHIPPINGCHANGE = false;

    const renderBtn = () => {
        if (window.paypal) {
            window.paypal
                .Buttons({
                    // enableStandardCardFields: false,
                    style: {
                        layout: "vertical",
                        color: "blue",
                        shape: "pill",
                        label: "paypal",
                        tagline: false,
                        vault: true,
                    },

                    createOrder: async function (data: any, actions: any) {
                        if (USE_POSTMAN_ORDER_ID) {
                            const orderID = "6KN09353BG588480C";
                            setOrderID(orderID);
                            return orderID;
                        } else {
                            const requestBody = {
                                intent: "CAPTURE",

                                payer: !PASS_PAYER_IN_CREATE_ORDER
                                    ? {
                                          name: {
                                              given_name: "De Bruyne",
                                              surname: "Kevin",
                                          },
                                      }
                                    : {
                                          name: {
                                              given_name: "De Bruyne",
                                              surname: "Kevin",
                                          },
                                          address: {
                                              address_line_1:
                                                  "1100 Congress Ave",
                                              address_line_2: "Building 1701",
                                              admin_area_2: "Austin",
                                              admin_area_1: "TX",
                                              postal_code: "78710",
                                              country_code: "US",
                                          },
                                          email_address:
                                              "petro-test01-us@cctest.com",
                                          password: "$nE+8kLK",
                                          phone: {
                                              phone_type: "MOBILE",
                                              phone_number: {
                                                  national_number:
                                                      "16503858068",
                                              },
                                          },
                                      },
                                purchase_units: [
                                    {
                                        amount: {
                                            value: "66.12",
                                            currency_code: "USD",
                                        },
                                        shipping: US_SHIPPING,
                                    },
                                ],
                            };
                            let orderID;
                            await fetch(
                                "https://api.sandbox.paypal.com/v2/checkout/orders",
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "PayPal-Partner-Attribution-Id":
                                            "PP-Test-Petro",
                                        Authorization: `Basic ${btoa(
                                            `${window.clientID}:${window.secretKey}`
                                        )}`,
                                    },
                                    body: JSON.stringify(requestBody),
                                }
                            )
                                .then((res) => {
                                    return res.json();
                                })
                                .then((data) => {
                                    orderID = data?.id;
                                    setOrderID(orderID);
                                    return orderID;
                                });
                            debugger;
                            return orderID;
                        }
                    },

                    onCancel: function (data: any) {
                        // window.close();
                        // Show a cancel page, or return to cart
                    },

                    onError: function (err: any) {
                        // For example, redirect to a specific error page
                        // window.location.href = "/your-error-page-here";
                    },

                    onShippingChange: function (data: any, actions: any) {
                        if (DONOTHING_BUT_LOG_ONSHIPPINGCHANGE) {
                            console.log(JSON.stringify(data, null, "    "));
                        } else {
                            console.log(JSON.stringify(data, null, "    "));
                            // if (data.shipping_address.country_code == "US") {
                            //     return actions.reject();
                            // }
                            // debugger;
                            if (data.shipping_address.country_code == "US") {
                                return actions.order.patch([
                                    {
                                        op: "replace",
                                        path: "/purchase_units/@reference_id=='default'/shipping/options",
                                        value: US_SHIPPING,
                                    },
                                ]);
                            }
                            if (data.shipping_address.country_code == "AR") {
                                return actions.order.patch([
                                    {
                                        op: "replace",
                                        path: "/purchase_units/@reference_id=='default'/shipping/options",
                                        value: AR_SHIPPING,
                                    },
                                ]);
                            }
                        }
                    },
                })
                .render("#paypal-button-container");
        }
    };
    return (
        <div>
            SingleTestPage;
            <div id="paypal-button-container"></div>
            <div id="paypal-mark-container"></div>
            <div id="paylater-mark-container"></div>
            <FakeSPBButton />
        </div>
    );
};

export default SinglePageTest;
