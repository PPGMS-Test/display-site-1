import {
    Checkbox,
    Chip,
    FormControlLabel,
    FormGroup,
    Switch,
    Tooltip,
} from "@mui/material";
import CircleCheckMark from "../../components/svgIcon/CircleCheckMark";
import {
    getDisplayMethodsInCheckoutPagePaymentTable,
    updateDisplayMethodsInCheckoutPagePaymentTable,
} from "@/reducer/reducers/paymentMethodReducer";
import { useAppDispatch, useAppSelector } from "@/typeHooks";
import PAYMENT_METHOD from "@/enum/PAYMENT_METHOD";
import { useState } from "react";
// import DoneIcon from '@material-ui/icons/Done';

export default function PaymentSetting() {
    const dispatch = useAppDispatch();

    const [allPaymentMethods, setAllPaymentMethods] = useState(
        useAppSelector((state) =>
            getDisplayMethodsInCheckoutPagePaymentTable(state)
        )
    );
    const handleDisable = (item: {
        paymentMethod: PAYMENT_METHOD;
        isDisplay: boolean;
    }) => {
        if (item.paymentMethod === PAYMENT_METHOD.PAYPAL_STANDARD) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <div>
            {allPaymentMethods.map((item, index) => {
                return (
                    <div>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={item.isDisplay}
                                    name={item.paymentMethod}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        const currentTarget = event.target
                                            .name as PAYMENT_METHOD;
                                        const updateDisplayList =
                                            allPaymentMethods.map((item) => {
                                                return {
                                                    paymentMethod:
                                                        item.paymentMethod,
                                                    isDisplay:
                                                        item.paymentMethod ===
                                                        currentTarget
                                                            ? event.target
                                                                  .checked
                                                            : item.isDisplay,
                                                };
                                            });

                                        setAllPaymentMethods(updateDisplayList);

                                        dispatch(
                                            updateDisplayMethodsInCheckoutPagePaymentTable(
                                                updateDisplayList
                                            )
                                        );
                                    }}
                                    disabled={handleDisable(item)}
                                />
                            }
                            label={item.paymentMethod}
                            className=" m-2 p-2"
                        />
                    </div>
                );
            })}
        </div>
    );
}
