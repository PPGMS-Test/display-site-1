import { Button, IconButton, Tooltip } from "@mui/material";
import { FC } from "react";

const Part: FC = () => {
  return (
    <div className="space-y-6 py-8 text-base  leading-7 relative">
      <p className="text-gray-400 font-extrabold">Shipping Method</p>
      <div>
        <p className="item-center text-gray-400 font-normal">Carrier</p>
        <p className="ml-4">
          <code className="text-sm font-bold text-gray-900">sf-express</code>
        </p>
      </div>

      <p className="top-0 right-0 absolute ">
        <Tooltip
          title="Add"
          placement="bottom"
          className="text-sky-500 hover:text-sky-600"
        >
          <Button>&rarr; Modify</Button>
        </Tooltip>
      </p>
    </div>
  );
};
export default Part;
