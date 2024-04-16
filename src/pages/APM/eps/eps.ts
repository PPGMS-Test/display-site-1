import CaptureOrderAPILocal from "../../../service/OrderV2/ByExpressServer/CaptureOrderAPILocal";
import CreateOrderLocal from "../../../service/OrderV2/ByExpressServer/CreateOrderAPILocal";

import { toggleAPMButtons } from "../JSSDK/LoadAPMButton";

export const epsWord = "Available to merchants globally, except in Russia, Japan, and Brazil."

export const renderEpsBtn = (
    redirectAfterApprove: Function
): void => {
    const createOrderObject = {
        intent: "CAPTURE",
        payment_source: {
            eps: {
                country_code: "AT",
                name: "John Doe",
            },
        },
        // processing_instruction: "ORDER_COMPLETE_ON_PAYMENT_APPROVAL",
        purchase_units: [
            {
                amount: {
                    currency_code: "EUR",
                    value: "1.00",
                },
                "payee": {
                    "merchant_id": "CMHAMMNAXCMGA"
                }
            },
        ],
        application_context: {
            locale: "en-BE",
            return_url: "https://example.com/returnUrl",
            cancel_url: "https://example.com/cancelUrl",
        },
    };
    if (window.paypal) {
        let mark = document.getElementById('mark-container');
        if (mark) mark.innerHTML = "";

        window.paypal.Marks({
            fundingSource: window.paypal.FUNDING.EPS,
        }).render('#mark-container')


        window.paypal.PaymentFields({
            fundingSource: window.paypal.FUNDING.EPS,
            style: {
                // style object (optional)
            },
            fields: {
                // fields prefill info (optional)
                name: {
                    value: "Test eps buyer",
                },
                email: {
                    value: "jdoe@example.com",
                }
            }
        })
            .render("#payment-fields-container");


        let button = window.paypal.Buttons({
            fundingSource: window.paypal.FUNDING.EPS,
            style: {
                label: "pay",
            },

            createOrder: function () {
                return CreateOrderLocal(createOrderObject);

                // return "2B3622168Y845200E"
            },

            onApprove: async function (data: any, actions: any) {
                // debugger;
                await CaptureOrderAPILocal();
                redirectAfterApprove();
            },
            onCancel: function (data: any) {
                // window.alert("Cancel!")
                // window.close();
                // Show a cancel page, or return to cart
            },
        });
        if (button.isEligible()) {
            button.render("#paypal-button-container").then(() => {
                toggleAPMButtons(false)
            })
            // console.clear()

            // let count = 0;

            // let interval = setInterval(() => {
            //     console.log(button);
            //     console.log(button.state)
            //     count++
            //     if (count >= 10) clearInterval(interval)
            // }, 300)
        }

        //渲染多个
        // var FUNDING_SOURCES = [
        //     window.paypal.FUNDING.eps,
        //     window.paypal.FUNDING.BLIK,
        //     window.paypal.FUNDING.IDEAL,
        //     window.paypal.FUNDING.SOFORT,
        // ];

        // FUNDING_SOURCES.forEach(function (fundingSource) {
        //     // Initialize the buttons
        //     var button = window.paypal.Buttons({
        //         fundingSource: fundingSource,
        //         style: {
        //             label: "pay",
        //         },
        //         createOrder: function () {
        //             return CreateOrderLocal(createOrderObject);
        //             // return "2B3622168Y845200E"
        //         },
        //         onApprove: async function (data: any, actions: any) {
        //             // debugger;
        //             await CaptureOrderAPILocal();
        //             redirectAfterApprove();
        //         }, onCancel: function (data: any) {

        //         },
        //     });

        //     // Check if the button is eligible
        //     if (button.isEligible()) {
        //         // Render the standalone button for that funding source
        //         button.render("#paypal-button-container");
        //     }
        // });



    }
};