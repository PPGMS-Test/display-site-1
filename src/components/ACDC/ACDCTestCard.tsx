import { List, ListItem, ListItemText } from "@mui/material";
import { FC } from "react";

const ACDCTestCard:FC=()=>{

    return (
        <div className="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 mt-8">
            <List>
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary="4032030601156491"
                        secondary="Card Number"
                    />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemText secondary="Expire Date" primary="10/2027" />
                </ListItem>
                <ListItem alignItems="flex-start">
                    <ListItemText secondary="CVV" primary="448" />
                </ListItem>
            </List>
        </div>
    );
}

export default ACDCTestCard