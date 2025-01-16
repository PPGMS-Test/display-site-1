import { Box, Checkbox, FormControlLabel, Switch } from "@mui/material";
import { FC } from "react";

const VaultControl: FC = () => {
    return (
        <div className=" pt-4">
            <p className=" font-extrabold  text-2xl">Make your Vault Setting</p>
            <div className="flex items-center">
                <div className="m-2 rounded-lg border-2">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={true}
                                name={"one-time"}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {}}
                            />
                        }
                        label={"Save Vault (Vault your Payment Method at one-time)"}
                        className=" m-2 p-2"
                    ></FormControlLabel>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            ml: 3,
                        }}
                    >
                        <FormControlLabel
                            label="Save PayPal wallet"
                            control={
                                <Checkbox checked={true} onChange={() => {}} />
                            }
                        />
                        <FormControlLabel
                            label="Save Debit and Credit Card(ACDC)"
                            control={
                                <Checkbox checked={true} onChange={() => {}} />
                            }
                        />
                    </Box>
                </div>
                <div className="m-2 rounded-lg border-2">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={true}
                                name={"Use Your Vault at Checkout Page"}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {}}
                            />
                        }
                        label={"Use Vault (Use Your Vault at Checkout Page)"}
                        className=" m-2 p-2"
                    />
                </div>
            </div>
        </div>
    );
};

export default VaultControl;
