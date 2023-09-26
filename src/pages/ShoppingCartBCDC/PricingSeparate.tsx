import React from "react";

const PricingSeparate = ()=>{
  return (
    <div>
      <div>
        <p className="item-center text-gray-400 font-normal text-left">
          Subtotal
        </p>
        <p className="ml-4 text-right">
          <code className="text-sm font-bold text-gray-900 ">11</code>
        </p>
      </div>

      <div>
        <p className="item-center text-gray-400 font-normal text-left">
          Shipping
        </p>
        <p className="ml-4 text-right">
          <code className="text-sm font-bold text-gray-900 ">0</code>
        </p>
      </div>
    </div>
  );
}

export default PricingSeparate;
