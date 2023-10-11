import { FC } from "react";
import { Tooltip, Button, FormControlLabel, Switch } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../typeHooks";
import { setShippingOption } from "../../reducer/reducers/shippingOptionReducer";

const AddShippingInCreateOrder: FC = () => {
    const dispatch = useAppDispatch();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("[handleChange]event?.target?.checked:", event?.target?.checked)
        dispatch(setShippingOption(event?.target?.checked));
    };
    return (
        <div className="top-2 right-2 absolute ">
            <Tooltip
                title="Add"
                placement="bottom"
                className="text-sky-500 hover:text-sky-600"
            >
                <FormControlLabel
                    control={
                        <Switch
                            // checked={isUseMoreSpace}
                            onChange={handleChange}
                        />
                    }
                    label="是否在create order中使用物流运输地址参数, 这会导致BCDC按钮的表现不一样"
                />
            </Tooltip>
        </div>
    );
};

export default AddShippingInCreateOrder;
