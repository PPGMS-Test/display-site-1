import CaptureOrderAPILocal from "../../../service/OrderV2/CaptureOrderAPILocal";
import CreateOrderLocal from "../../../service/OrderV2/CreateOrderAPILocal";

import { toggleAPMButtons } from "../JSSDK/LoadAPMButton";

export const BancontactWord = "Bancontact is the most widely used, accepted and trusted electronic payment method in Belgium, with over 15 million Bancontact cards issued, and 150,000 online transactions processed a day. Bancontact makes it possible to pay directly through the online payment systems of all major Belgian banks and can be used by all customers with a Bancontact branded payment card. Bancontact cards are issued by more than 20 Belgian banks and exists solely in Belgium."

export const renderBancontactBtn = (
    redirectAfterApprove: Function
): void => {
    const createOrderObject = {
        intent: "CAPTURE",
        payment_source: {
            bancontact: {
                country_code: "BE",
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
            fundingSource: window.paypal.FUNDING.BANCONTACT,

        }).render('#mark-container')

        window.paypal.PaymentFields({
            fundingSource: window.paypal.FUNDING.BANCONTACT,
            style: {
                // style object (optional)
            },
            fields: {
                // fields prefill info (optional)
                name: {
                    value: "Test Bancontact buyer",
                },
                email: {
                    value: "jdoe@example.com",
                }
            }
        })
            .render("#payment-fields-container");


        let button = window.paypal.Buttons({
            fundingSource: window.paypal.FUNDING.BANCONTACT,
            style: {
                label: "pay",
            },
            createOrder: function () {
                return CreateOrderLocal(createOrderObject);
            },
            onApprove: async function (data: any, actions: any) {
                // debugger;
                await CaptureOrderAPILocal();
                redirectAfterApprove();
            },onCancel: function (data: any) {
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


    }
};