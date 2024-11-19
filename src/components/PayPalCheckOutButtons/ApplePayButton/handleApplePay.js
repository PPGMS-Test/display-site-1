const IS_3rd_Party_F = false;

async function setupApplepay(callbackFunc) {
    const applepay = paypal.Applepay();
    const {
        isEligible,
        countryCode,
        currencyCode,
        merchantCapabilities,
        supportedNetworks,
    } = await applepay.config();

    if (!isEligible) {
        throw new Error("applepay is not eligible");
    }

    document.getElementById("applepay-container").innerHTML =
        '<apple-pay-button id="btn-appl" buttonstyle="black" type="buy" locale="en">';

    document.getElementById("btn-appl").addEventListener("click", onClick);

    async function onClick() {
        console.log({
            merchantCapabilities,
            currencyCode,
            supportedNetworks,
        });

        const paymentRequest = {
            countryCode: "CN",
            currencyCode: "USD",
            merchantCapabilities,
            supportedNetworks,
            requiredBillingContactFields: [
                "name",
                "phone",
                "email",
                "postalAddress",
            ],
            // requiredShippingContactFields: [
            //     "name",
            //     "phone",
            //     "email",
            //     "postalAddress",
            // ],
            total: {
                label: "Demo (Card is not charged)",
                amount: amount,
                type: "final",
            },
        };

        // eslint-disable-next-line no-undef
        let session = new ApplePaySession(4, paymentRequest);
        console.log("[1] Session Create");
        session.onvalidatemerchant = (event) => {
            applepay
                .validateMerchant({
                    validationUrl: event.validationURL,
                    displayName: "my Store",
                })
                .then((payload) => {
                    session.completeMerchantValidation(payload.merchantSession);
                })
                .catch((err) => {
                    console.error(err);
                    session.abort();
                });
        };
        console.log("[1] Merchant Validate Complete");
        session.onpaymentmethodselected = () => {
            session.completePaymentMethodSelection({
                newTotal: paymentRequest.total,
            });
        };
        console.log("[1]");
        const isVault = document.getElementById("is-vault").checked;
        const isReturning = document.getElementById("is-returning").checked;

        session.onpaymentauthorized = async (event) => {
            console.log(
                "Your billing address is:",
                event.payment.billingContact
            );
            console.log(
                "Your shipping address is:",
                event.payment.shippingContact
            );
            try {

                const accessToken = await generateAccessToken();
                // console.log(accessToken)
        
                const PayPalRequestHeader = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                };

                if (IS_3rd_Party_F) {
                    const PayPal_Auth_Assertion = generatePayPalAuthAssertion(
                        window.clientID,
                        "JASJ9YWJXPAHY"
                    );
        
                    console.log("PayPal_Auth_Assertion:", PayPal_Auth_Assertion);
                    PayPalRequestHeader["PayPal-Auth-Assertion"] = PayPal_Auth_Assertion
                }
        
                /* Create Order */
                console.log("[10]Order V2 -- Create Order is called!");
                const { id } = await fetch(
                    "https://api.sandbox.paypal.com/v2/checkout/orders",
                    {
                        method: "POST",
                        headers: PayPalRequestHeader,
                        body: JSON.stringify(order),
                    }
                ).then((res) => res.json());


                /**
                 * Confirm Payment
                 */
                debugger;
                await applepay.confirmOrder({
                    orderId: id,
                    token: event.payment.token,
                    billingContact: event.payment.billingContact,
                    //shippingContact: event.payment.shippingContact,
                    //email:event.payment.shippingContact.emailAddress,
                });
                debugger;
                /*
                 * Capture order (must currently be made on server)
                 */

                // email:event.payment.shippingContact.emailAddress,
                // console.log(
                //     event.payment.token,
                //     event.payment.billingContact,
                //     event.payment.shippingContact,
                //     event.payment.shippingContact.emailAddress
                // );


                const captureResponse = await fetch(
                    `https://api.sandbox.paypal.com/v2/checkout/orders/${id}/capture`,
                    {
                        method: "POST",
                        headers: PayPalRequestHeader,
                    }
                ).then((res) => res.json());
    
                console.log("Success!");
                callbackFunc(captureResponse);

                session.completePayment({
                    status: window.ApplePaySession.STATUS_SUCCESS,
                });
            } catch (err) {
                console.error(err);
                session.completePayment({
                    status: window.ApplePaySession.STATUS_FAILURE,
                });
            }
        };

        session.oncancel = () => {
            console.log("Apple Pay Cancelled !!");
        };

        session.begin();
    }
}

export const handleApplePay = (callbackFunc) => {
    if (
        ApplePaySession?.supportsVersion(4) &&
        ApplePaySession?.canMakePayments()
    ) {
        setupApplepay(callbackFunc).catch(console.error);
    }
};


const generatePayPalAuthAssertion = (clientID, merchantID) => {
    let PayPal_Auth_Assertion;
    let to_encode = {
        iss: clientID,
        payer_id: merchantID,
    };

    let to_encode_str = JSON.stringify(to_encode);
    let encoded_str = btoa(to_encode_str);
    PayPal_Auth_Assertion = `eyJhbGciOiJub25lIn0=.${encoded_str}.`;
    return PayPal_Auth_Assertion;
};