import APM_METHOD_ENUM from "../APM/APM_METHOD_ENUM";
import PAYMENT_METHOD from "../../enum/PAYMENT_METHOD";
import APMDisplayArea from "../APM/APMDisplayArea";
import { CreateOrderParam, renderBtn } from "../../components/PayPalCheckOutButtons/JSSDKRenderedButtons/SmartPaymentBtn/SPBRenderFunction";

//PayPal wallet Logo
export const paypal_logo = (
    <div className=" w-1/2 h-8 object-contain  inline-block ml-28">
        <div id="paypal-mark"></div>
    </div>
);

//Debit or Credit Card Logo
export const paypal_used = (
    <>
        {/* <img
            className=" w-1/2 h-10 object-contain  inline-block"
            src={process.env.PUBLIC_URL + "/image/paypal-used.svg"}
        /> */}
        <img
            className=" w-1/2 h-8 object-contain  inline-block ml-4"
            src={process.env.PUBLIC_URL + "/image/card.svg"}
        />
    </>
);

export const payLater_logo = (
    <div className=" w-1/2 h-8 object-contain  inline-block ml-28">
        <div id="paylater-mark"></div>
    </div>
);

export const APM_logo = (APMMethod: APM_METHOD_ENUM) => {
    let imgUrl;
    if (APMMethod === APM_METHOD_ENUM.Bancontact) {
        imgUrl =
            "https://www.paypalobjects.com/js-sdk-logos/2.2.7/bancontact-black.svg";
    } else if (APMMethod === APM_METHOD_ENUM.SOFORT) {
        imgUrl =
            "https://www.paypalobjects.com/js-sdk-logos/2.2.7/sofort-black.svg";
    } else if (APMMethod === APM_METHOD_ENUM.iDEAL) {
        imgUrl =
            "https://www.paypalobjects.com/js-sdk-logos/2.2.7/ideal-black.svg";
    } else if (APMMethod === APM_METHOD_ENUM.BLIK) {
        imgUrl =
            "https://www.paypalobjects.com/js-sdk-logos/2.2.7/blik-black.svg";
    } else if (APMMethod === APM_METHOD_ENUM.eps) {
        imgUrl =
            "https://www.paypalobjects.com/js-sdk-logos/2.2.7/eps-black.svg";
    } else if (APMMethod === APM_METHOD_ENUM.giropay) {
        imgUrl =
            "https://www.paypalobjects.com/js-sdk-logos/2.2.7/giropay-black.svg";
    } else if (APMMethod === APM_METHOD_ENUM.MyBank) {
        imgUrl =
            "https://www.paypalobjects.com/js-sdk-logos/2.2.7/mybank-black.svg";
    } else if (APMMethod === APM_METHOD_ENUM.PUI) {
    } else if (APMMethod === APM_METHOD_ENUM.Przelewy24) {
        imgUrl =
            "https://www.paypalobjects.com/js-sdk-logos/2.2.7/p24-black.svg";
    }

    return (
        <>
            <img
                src={imgUrl}
                className=" w-1/3 h-8 object-contain  inline-block ml-20"
            />
        </>
    );
};

function renderAPMButton(APMMethod: APM_METHOD_ENUM) {
    console.log("APM Method:", APMMethod);
    return (
        <>
            <APMDisplayArea
                method={APMMethod}
                setMethod={() => {
                    console.log("这是购物车结算页面, 不需要setMethod回调函数");
                }}
                showLabel={true}
                showField={true}
                showButton={true}
            />
        </>
    );
}



//********************************************************************** */
//********************************************************************** */
//****************************右侧的函数********************************* */
//****************************** Start ********************************* */
//********************************************************************** */
//********************************************************************** */

export function CurrentPaymentMethod(
    count: PAYMENT_METHOD,
    APMMethod: APM_METHOD_ENUM,
    createOrderParam: CreateOrderParam,
    PayPalJSSDK:Promise<any>
) {

    return renderSmartPaymentButton(count,createOrderParam,PayPalJSSDK);

    // switch (count) {
    //     case PAYMENT_METHOD.PAYPAL_STANDARD:
    //         return renderSmartPaymentButtons();
    //         break;
    //     case PAYMENT_METHOD.PAYPAL_BCDC:
    //         return renderBCDCButton();
    //         break;
    //     case PAYMENT_METHOD.PAYPAL_APM:
    //         return renderAPMButton(APMMethod);
    //         break;
    //     case PAYMENT_METHOD.PAYPAL_BNPL:
    //         return renderBNPLButton();
    //         break;
    //     default:
    //         break;
    // }
    // console.log("什么都没有返回");
}

function renderSmartPaymentButton( buttonType:PAYMENT_METHOD,createOrderParam: CreateOrderParam,PayPalJSSDK:Promise<any>){
    const {navigate,getLink} = createOrderParam
    PayPalJSSDK.then(()=>{
        renderBtn(buttonType,{navigate,getLink},{isMsgHandler:true})
    })
   
   

}

// export function renderBNPLButton() {
//     return (
//         <>
//             <SmartPaymentButton buttonType={PAYMENT_METHOD.PAYPAL_BNPL} />
//         </>
//     );
// }

// export function renderSmartPaymentButtons() {
//     return (
//         <>
//             <SmartPaymentButton buttonType={PAYMENT_METHOD.PAYPAL_STANDARD} />
//         </>
//     );
// }

// export function renderBCDCButton() {
//     return (
//         <>
//             <SmartPaymentButton buttonType={PAYMENT_METHOD.PAYPAL_BCDC} />
//         </>
//     );
// }

//********************************************************************** */
//********************************************************************** */
//****************************右侧的函数********************************* */
//****************************   END  ********************************** */
//********************************************************************** */
//********************************************************************** */
