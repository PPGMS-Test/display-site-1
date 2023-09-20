import { FC } from "react";

import PricingSeparate from "./PricingSeparate";
import PricingTotal from "./PricingTotal";
import SmartPaymentButton from "./SmartPaymentButton";

const Part: FC = () => {
  return (
    <div className="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 ">
      <div className="mx-auto max-w-md">
        <div className="divide-y divide-gray-300/50">
          <div>商品缩略图</div>
          <div>
            <PricingSeparate />
          </div>
          <div>
            <PricingTotal />
          </div>
          <div>
            <SmartPaymentButton />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Part;
