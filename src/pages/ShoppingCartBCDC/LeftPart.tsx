import { FC } from "react";
import classNames from "classnames";

import Contacts from "./Contact";
import ShippingMethod from "./ShippingMethod";
import PaymentTable from "./PaymentTable";

const LeftPart: FC = () => {
  return (
    <div className="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
      <div className="mx-auto max-w-md">
        {/* Divide line in each div */}
        <div className="divide-y divide-gray-300/50">
          <PaymentTable />
          <Contacts></Contacts>
          <ShippingMethod></ShippingMethod>
         

        </div>
      </div>
    </div>
  );
};
export default LeftPart;
