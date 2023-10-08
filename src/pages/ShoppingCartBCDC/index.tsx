import { FC } from "react";

import LeftPart from "./LeftPart";
import RightPart from "./RightPart";

const BCDCShoppingCart: FC = () => {
  return (
    <div>
      {/* Shipping Cart BCDC */}
      <div className="flex flex-col md:flex-row bg-gray-300">
        <div className=" basis-2/3  m-2">
          <LeftPart></LeftPart>
        </div>
        <div className=" basis-1/2  m-2">
          <RightPart />
        </div>
      </div>

      
    </div>
  );
};

export default BCDCShoppingCart;
