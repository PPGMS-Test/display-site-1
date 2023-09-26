import { FC, useState } from "react";

import PricingSeparate from "./PricingSeparate";
import PricingTotal from "./PricingTotal";

import { useAppSelector, useAppDispatch } from "../../typeHooks";
import CurrentPaymentMethod from "./CurrentPaymentMethod";

import SmartPaymentButton from "../../components/StandardSPB/SmartPaymentButton";
import BCDCButton from "../../components/BCDCButton";
import APMButton from "../../components/APMButton";

function renderSmartPaymentButtons() {
  return (
    <>
      <SmartPaymentButton />
    </>
  );
}

function renderBCDCButton() {
  return (
    <>
      <BCDCButton />
    </>
  );
}

function renderAPMButton() {
  return (
    <>
      <APMButton />
    </>
  );
}

function test(count: number) {
  console.log("switch渲染语句:", count);
  switch (count) {
    case 1:
      return <div>123</div>;

    case 2:
      return <div>444</div>;

    case 3:
      return <div>APMButton</div>;

    // default:
    //   return renderSmartPaymentButtons();
  }
}

const RightPart: FC = () => {
  const count = useAppSelector((state) => state.paymentMethod.method);
  let [showPaymentMethod, setShowPaymentMethod] = useState(count);

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
            <p>当前的支付方式: {count}</p>
            {/* <CurrentPaymentMethod method={count} /> */}

            {test(count)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RightPart;
