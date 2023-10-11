import { FC, useEffect } from "react";

const SinglePageTest: FC = () => {
    useEffect(() => {
        let PayPal_SPB_JS_SDK_LoadScript = document.createElement("script");

        console.log("[JSSDK.ts] PayPal JS SDK load!");
        const client_id =
            "AY13GPAAVtyuFAmqUT9FWoLIpTQo2B1u_LXupEn3390NjUnOK6qPZFbeJbMqY2nBnVLLronvqG8uNeIE";
        const url = `https://www.paypal.com/sdk/js?client-id=${client_id}&buyer-country=US`;
        PayPal_SPB_JS_SDK_LoadScript.src = url;
        PayPal_SPB_JS_SDK_LoadScript.async = false;
        document
            .getElementById("root")
            ?.appendChild(PayPal_SPB_JS_SDK_LoadScript);
        // console.clear();

        PayPal_SPB_JS_SDK_LoadScript.onload = function () {
            console.log("PayPal SPB JS SDK is loaded!");
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

                    createOrder: function (data: any, actions: any) {
                        return actions.order.create({
                            intent: "CAPTURE",
                            payer: {
                                name: {
                                    given_name: "PayPal",
                                    surname: "Customer",
                                },
                                address: {
                                    address_line_1: "123 ABC Street",
                                    address_line_2: "Apt 2",
                                    admin_area_2: "San Jose",
                                    admin_area_1: "CA",
                                    postal_code: "95121",
                                    country_code: "US",
                                },
                                email_address:
                                    "sb-43bofn8297045@personal.example.com",
                                password: "$nE+8kLK",
                                phone: {
                                    phone_type: "MOBILE",
                                    phone_number: {
                                        national_number: "14082508100",
                                    },
                                },
                            },
                            purchase_units: [
                                {
                                    amount: {
                                        value: "66.12",
                                        currency_code: "USD",
                                    },
                                    shipping: {
                                        address: {
                                            address_line_1:
                                                "2211 N First Street",
                                            address_line_2: "Building 17",
                                            admin_area_2: "San Jose",
                                            admin_area_1: "CA",
                                            postal_code: "95131",
                                            country_code: "US",
                                        },
                                    },
                                },
                            ],
                        });
                    },

                    onCancel: function (data: any) {
                        // window.close();
                        // Show a cancel page, or return to cart
                    },

                    onError: function (err: any) {
                        // For example, redirect to a specific error page
                        window.location.href = "/your-error-page-here";
                    },
                })
                .render("#paypal-button-container");
        };
    });
    return (
        <div>
            SingleTestPage
            <div id="paypal-button-container"></div>
        </div>
    );
};

export default SinglePageTest;
