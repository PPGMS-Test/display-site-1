import { FC, useState } from "react";

import LeftPart from "./LeftPart";
import RightPart from "./RightPart";
import DownloadButtonPart from "./DownloadButtonPart";
import { useAppSelector } from "../../typeHooks";
import { get_payment_method } from "../../reducer/reducers/paymentMethodReducer";
import PAYMENT_METHOD from "../../enum/PAYMENT_METHOD";
import ShoppingCartBCDCContentProvider from "./ShoppingCartBCDCContentProvider";


const BCDCShoppingCart: FC = () => {
    const currentPaymentMethod: PAYMENT_METHOD = useAppSelector((state) =>
        get_payment_method(state)
    );

    const renderDownloadButtonPart = () => {
        if (currentPaymentMethod === PAYMENT_METHOD.PAYPAL_BCDC) {
            return <DownloadButtonPart />;
        }
        if (currentPaymentMethod === PAYMENT_METHOD.PAYPAL_APM) {
            return <DownloadButtonPart />;
        }
    };

    //SPBPendingFlag的默认值为true, 意思是不展示SPB显示区域
    const [SPBPendingFlag, setSPBPendingFlag] = useState(true);

    const [buttonType, setButtonType] = useState(
        PAYMENT_METHOD.PAYPAL_STANDARD
    );

 

    return (
        <ShoppingCartBCDCContentProvider.Provider
            value={{ SPBPendingFlag, setSPBPendingFlag }}
        >
            <div>
                {/* 标题: Shipping Cart BCDC */}

                {/* [2023-10-08 修改"Left right 背景图拿掉] */}
                {/* <div className="flex flex-col md:flex-row bg-gray-300"> */}

                <div className="flex flex-col md:flex-row bg-white">
                    <div className=" basis-2/3  m-2">
                        <LeftPart></LeftPart>
                    </div>
                    <div className=" basis-1/2  m-2">
                        <RightPart />
                        {renderDownloadButtonPart()}
                    </div>
                </div>
            </div>
        </ShoppingCartBCDCContentProvider.Provider>
    );
};

export default BCDCShoppingCart;
