import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Icon,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useDispatch } from "react-redux";
import { setPaymentMethod } from "../../reducer/reducers/paymentMethodReducer";

export default function () {
  const dispatch = useDispatch();
  let [radio_value, setRadioValue] = useState(1);

  const handleChange = (event: any) => {
    setRadioValue(event?.target?.value);
  };

  const style_div = {
    width: "100%",
    "border-radius": "10px",
    overflow: "hidden",
  };

  const style_table = {
    "border-collapse": "separate",
    "border-spacing": 0,
    "border-radius": "10px",
    border: "solid 2px #dfdfdf",
  };

  return (
    <div className=" space-y-6 py-8 text-base  leading-7 relative">
      {/* <FormControl component="fieldset">
        <FormLabel component="legend">
          <p className="text-gray-400 font-extrabold">Payment Method</p>
        </FormLabel>
        <RadioGroup
          // row
          aria-label="position"
          name="position"
          defaultValue="top"
        >
          <FormControlLabel
            value="A"
            control={<Radio color="primary" />}
            label="A"
          />

          <FormControlLabel
            value="B"
            control={<Radio color="primary" />}
            label="B"
          />
          <FormControlLabel
            value="C"
            control={<Radio color="primary" />}
            label="C"
          />
          
        </RadioGroup>
      </FormControl> */}

      <div>
        表格式样还需调整, width max属性不起作用
        <table className=" mx-auto w-full table-auto  rounded-lg border-separate border-spacing-2 border border-slate-400">
          <tbody>
            <RadioGroup value={radio_value} onChange={handleChange}>
              <tr className="w-full">
                <td className="w-full border border-slate-300 rounded">
                  <div className="pl-2 w-full">
                    <FormControlLabel
                      value="1"
                      control={<Radio color="primary" />}
                      label="PayPal"
                    />
                    ========================
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 rounded">
                  <div className="pl-2 w-full">
                    <FormControlLabel
                      value="2"
                      control={<Radio color="primary" />}
                      label="PayPal Credit Card"
                    />
                    ========================
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 rounded">
                  <div className="pl-2 w-full">
                    <FormControlLabel
                      value="3"
                      control={<Radio color="primary" />}
                      label="Other"
                    />
                    ========================
                  </div>
                </td>
              </tr>
            </RadioGroup>
          </tbody>
        </table>
      </div>

      <Button
        variant="contained"
        color="primary"
        endIcon={<ArrowForwardIosIcon />}
        // endIcon={<Icon>send</Icon>}
        onClick={() => {
          console.log("当前radio value:", radio_value);
          dispatch(setPaymentMethod(radio_value));
        }}
      >
        更改支付方式
      </Button>
    </div>
  );
}
