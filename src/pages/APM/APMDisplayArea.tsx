import { FC, useEffect } from "react";
import { APMMethod } from "./index";
import LoadAPMButton from "./JSSDK/LoadAPMButton";
import { renderBancontactBtn } from "./Bancontact/Bancontact";
import { useNavigate, useLocation } from "react-router-dom";
import { renderSOFORTBtn } from "./SOFORT/SOFORT";
import { renderIDEALBtn } from "./iDEAL/iDEAL";
import { renderBLIKBtn } from "./BLIK/BLIK";

const APMDisplayArea: FC<APMMethod> = (childrenProp: APMMethod) => {
    console.log("APMDisplayArea, APM按钮展示区域!")
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

    const getNavFunction = () => {
        setTimeout(() => {
            // debugger;
            navigate(getLink());
        }, 8000);
    };

    useEffect(() => {
        if (childrenProp.method === "Bancontact") {
            (async () => {
                await LoadAPMButton(
                    "Bancontact",
                    "components=buttons,payment-fields,marks,funding-eligibility&enable-funding=bancontact&currency=EUR"
                ).then(() => {
                    renderBancontactBtn(getNavFunction);
                });
            })();
        } else if (childrenProp.method === "SOFORT") {
            (async () => {
                await LoadAPMButton(
                    "SOFORT",
                    "components=buttons,payment-fields,marks,funding-eligibility&enable-funding=sofort&currency=EUR"
                ).then(() => {
                    renderSOFORTBtn(getNavFunction);
                });
            })();
        } else if (childrenProp.method === "iDEAL") {
            (async () => {
                await LoadAPMButton(
                    "iDEAL",
                    "components=buttons,payment-fields,marks,funding-eligibility&enable-funding=ideal&currency=EUR"
                ).then(() => {
                    renderIDEALBtn(getNavFunction);
                });
            })();
        } else if (childrenProp.method === "BLIK") {
            (async () => {
                await LoadAPMButton(
                    "BLIK",
                    "components=buttons,payment-fields,marks,funding-eligibility&enable-funding=blik&currency=PLN"
                ).then(() => {
                    renderBLIKBtn(getNavFunction);
                });
            })();
        }
    });
    return (
        <div>
            {childrenProp.method}
            <div id="mark-container"></div>
            <div className=" mb-2">
                <div id="payment-fields-container"></div>
            </div>
            <div id="paypal-button-container"></div>
        </div>
    );
};
export default APMDisplayArea;
