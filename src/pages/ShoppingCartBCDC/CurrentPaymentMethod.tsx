import { FC } from "react";
import SmartPaymentButton from "../../components/StandardSPB/SmartPaymentButton";
import BCDCButton from "../../components/BCDCButton";
import APMButton from "../../components/APMButton";

interface middleProps {
  method: number;
}

const CurrentPaymentMethod = (prop: middleProps) => {
  let method = prop.method;
  console.log("[CurrentPaymentMethod]switch逻辑-method:", method);
  switch (method) {
    case 1:
      return renderSmartPaymentButtons();

    case 2:
      return renderBCDCButton();

    case 3:
      return renderAPMButton();

    default:
      return renderSmartPaymentButtons();
  }
};

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

export default CurrentPaymentMethod;
