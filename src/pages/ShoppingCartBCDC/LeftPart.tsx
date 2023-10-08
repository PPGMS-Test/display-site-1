import { FC } from "react";

import Contacts from "./Contact";
import ShippingMethod from "./ShippingMethod";
import PaymentTable from "./PaymentTable";
import { useAppSelector } from "../../typeHooks";
import classNames from "classnames";

const LeftPart: FC = () => {
    const isUseMoreSpace: boolean = useAppSelector(
        (state) => state.isMoreSpace.useMoreSpace
    );
    return (
        <div
            className={classNames({
                "relative bg-white px-6 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10":
                    true,
                "pt-10": isUseMoreSpace,
            })}
        >
            <div className="mx-auto max-w-md">
                {/* Divide line in each div */}
                <div className="divide-y divide-gray-300/50">
                    <Contacts></Contacts>
                    <ShippingMethod></ShippingMethod>
                    <PaymentTable />
                </div>
            </div>
        </div>
    );
};
export default LeftPart;
