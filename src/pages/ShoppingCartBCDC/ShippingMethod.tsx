import {
    Button,
    FormHelperText,
    IconButton,
    MenuItem,
    Select,
    Tooltip,
} from "@mui/material";
import { FC, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../typeHooks";
import classNames from "classnames";
import { getIsMoreSpace } from "../../reducer/reducers/moreSpaceReducer";
import {
    getCurrentShippingOption,
    getShippingOptionListConst,
    setCurrentShippingOption,
} from "../../reducer/reducers/shippingOptionReducer";
import { Shipping } from "../../interface/Shipping/Shipping";
import { getShoppingCart } from "../../reducer/reducers/shoppingCartReducer";

// interface childProps {
//     shippingOption: any;
//     onShippingOptionChange: Function;
// }

const ShippingMethod: FC = () => {
    const shoppingCartList = useAppSelector((state) => getShoppingCart(state));
    const dispatch = useAppDispatch();

    const isUseMoreSpace: boolean = useAppSelector((state) =>
        getIsMoreSpace(state)
    );

    const currentShippingMethod = useAppSelector((state) =>
        getCurrentShippingOption(state)
    );

    const ShippingListConst = useAppSelector((state) =>
        getShippingOptionListConst(state)
    ) as Shipping[];

    const [isReadOnly, setIsReadOnly] = useState(true);

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

                    <Select
                        disabled={shoppingCartList.length == 0}
                        value={currentShippingMethod.Id}
                        onChange={(event) => {
                            const id = event.target.value;
                            const targetItem = ShippingListConst.find(
                                (item) => item.Id === id
                            );

                            let obj = {
                                Id: id,
                                Price: Number(targetItem?.Value),
                            };
                            dispatch(setCurrentShippingOption(obj));
                        }}
                        // inputProps={{ readOnly: isReadOnly }}
                        className=" my-2"
                    >
                        <MenuItem value="none" key="-1">
                            <em>None</em>
                        </MenuItem>
                        {ShippingListConst.map((shippingOption, index) => {
                            return (
                                <MenuItem value={shippingOption.Id} key={index}>
                                    {shippingOption.Label}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    <FormHelperText>
                        {shoppingCartList.length == 0? "Please Add your favorite Products!": "Please change default shipping method!"}
                    </FormHelperText>
                </div>

                {/* <div className="top-1 right-1 absolute ">
                    <Tooltip
                        title="修改运输方式"
                        placement="bottom"
                        className="text-sky-500 hover:text-sky-600"
                    >
                        
                        <Button
                            onClick={() => {
                                setIsReadOnly(!isReadOnly);
                            }}
                        >
                            Modify
                        </Button>
                    </Tooltip>
                </div> */}

                
            </div>
        </div>
    );
};
export default ShippingMethod;
