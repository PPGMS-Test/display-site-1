import { FC, useState } from "react";

import LeftPart from "./LeftPart";
import RightPart from "./RightPart";

const BCDCShoppingCart: FC = () => {
 
  return (
    <div>
      {/* 标题: Shipping Cart BCDC */}
      
      {/* [2023-10-08 修改"Left right 背景图拿掉] */}
      {/* <div className="flex flex-col md:flex-row bg-gray-300"> */}

      <div className="flex flex-col md:flex-row bg-white">
        <div className=" basis-2/3  m-2">
          <LeftPart ></LeftPart>
        </div>
        <div className=" basis-1/2  m-2">
          <RightPart/>
        </div>
      </div>

      
    </div>
  );
};

export default BCDCShoppingCart;
