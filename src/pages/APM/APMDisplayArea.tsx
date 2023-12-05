import { FC, useEffect } from "react";
import { APMMethod } from "./APMInstructionArea";
import APMJSSDKBancontact from "../../service/LoadPayPalScript/APMJSSDKBancontact";
import CaptureOrderAPI from "../../service/OrderV2/CaptureOrderAPI";
import CreateOrder from "../../service/OrderV2/CreateOrderAPI";
import { useNavigate, useLocation } from "react-router-dom";

const APMDisplayArea: FC<APMMethod> = (childrenProp: APMMethod) => {
    const navigate = useNavigate();
    const location = useLocation();

    const pathname = location.pathname;
    const getLink = () => {
        if (pathname.startsWith("/lab")) {
            return "/lab/thankyou";
        } else if (pathname.startsWith("/display")) {
            return "/display/thankyou";
        } else {
            return "";
        }
    };
    const renderBtn = () => {
        const createOrderObject = {
            intent: "CAPTURE",
            payment_source: {
                bancontact: {
                    country_code: "BE",
                    name: "John Doe",
                },
            },
            processing_instruction: "ORDER_COMPLETE_ON_PAYMENT_APPROVAL",
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
            let button = window.paypal.Buttons({
                createOrder: function () {
                    return CreateOrder(createOrderObject);
                },
                onApprove: async function (data: any, actions: any) {
                    await CaptureOrderAPI();
                    setTimeout(() => {
                        // debugger;
                        navigate(getLink());
                    }, 1800);
                },
            });
            if (button.isEligible()) {
                button.render("#paypal-button-container");
            }
        }
    };
    useEffect(() => {
        (async () => {
        
            await APMJSSDKBancontact().then(renderBtn);
        })();
    });
    return (
        <div>
            {childrenProp.method}
            <div id="paypal-button-container"></div>
        </div>
    );
};
export default APMDisplayArea;
