import { Button, IconButton, Tooltip } from "@mui/material";
import { FC } from "react";
import { useAppSelector } from "../../typeHooks";
import classNames from "classnames";

const ShippingMethod: FC = () => {
    const isUseMoreSpace: boolean = useAppSelector(
        (state) => state.isMoreSpace.useMoreSpace
    );
    return (
        <div>
            <div
                className={classNames({
                    "text-base  leading-7 relative": true,
                    "space-y-6 py-8": isUseMoreSpace,
                })}
            >
                <p className="text-gray-400 font-extrabold">Shipping Method</p>
                <div>
                    <p className="item-center text-gray-400 font-normal">
                        Carrier
                    </p>
                    <p className="ml-4">
                        <code className="text-sm font-bold text-gray-900">
                            sf-express
                        </code>
                    </p>
                </div>

                <div className="top-0 right-0 absolute ">
                    <Tooltip
                        title="Add"
                        placement="bottom"
                        className="text-sky-500 hover:text-sky-600"
                    >
                        <Button>&rarr; Modify</Button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};
export default ShippingMethod;
