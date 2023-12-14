import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Drawer from "../components/ShoppingCartDraw";
import ShoppingCartSummary from "../components/ShoppingCartSummary";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Paper,
    PaperProps,
} from "@mui/material";
import Draggable from "react-draggable";
import SliderCaptcha from "rc-slider-captcha";

import { useCallback, useEffect, useRef } from "react";

export default function PositionedTooltips() {
    //[1]验证抽屉
    // const content = (
    //     <div>
    //         <div className="flex flex-col  min-h-screen">
    //             <div className="bg-gray-100 rounded-lg shadow-lg p-6">
    //                 <ShoppingCartSummary />
    //             </div>
    //         </div>
    //     </div>
    // );

    const renderTooltips = () => {
        return (
            <Box sx={{ width: 500 }}>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Tooltip title="Add" placement="top-start">
                            <Button>top-start</Button>
                        </Tooltip>
                        <Tooltip title="Add" placement="top">
                            <Button>top</Button>
                        </Tooltip>
                        <Tooltip title="Add" placement="top-end">
                            <Button>top-end</Button>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center">
                    <Grid item xs={6}>
                        <Tooltip title="Add" placement="left-start">
                            <Button>left-start</Button>
                        </Tooltip>
                        <br />
                        <Tooltip title="Add" placement="left">
                            <Button>left</Button>
                        </Tooltip>
                        <br />
                        <Tooltip title="Add" placement="left-end">
                            <Button>left-end</Button>
                        </Tooltip>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={6}
                        alignItems="flex-end"
                        direction="column"
                    >
                        <Grid item>
                            <Tooltip title="Add" placement="right-start">
                                <Button>right-start</Button>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Add" placement="right">
                                <Button>right</Button>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Add" placement="right-end">
                                <Button>right-end</Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Tooltip title="Add" placement="bottom-start">
                            <Button>bottom-start</Button>
                        </Tooltip>
                        <Tooltip title="Add" placement="bottom">
                            <Button>bottom</Button>
                        </Tooltip>
                        <Tooltip title="Add" placement="bottom-end">
                            <Button>bottom-end</Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
        );
    };

    function PaperComponent(props: any) {
        return (
            <Draggable
            // handle="#draggable-dialog-title"
            // cancel={'[class*="MuiDialogContent-root"]'}
            >
                <Paper {...props} />
            </Draggable>
        );
    }

    const renderDraggableDialog = () => {
        return (
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open draggable dialog
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle
                        style={{ cursor: "move" }}
                        id="draggable-dialog-title"
                    >
                        请输入验证码
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            验证码部分:
                            <SliderCaptcha
                                mode="slider"
                                onVerify={async (data) => {
                                    console.log(data);
                                    // verify data
                                    return Promise.resolve();
                                }}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const verifyCaptcha = async (data: { x: number }) => {
        if (data?.x && data.x >= 250) {
            setTimeout(() => {
                handleClose();
            }, 500);
            return Promise.resolve();
        }
        return Promise.reject();
    };

    return (
        <div>
            {/* [1]验证抽屉 */}
            {/* <Drawer position={"right"} icon={<Bars3Icon />} content={content} /> */}
            <Divider className="my-2 py-3" />
            <>
                <Button variant="outlined" onClick={handleClickOpen}>
                    打开验证码
                </Button>
                <Dialog onClose={handleClose} open={open}>
                    <DialogTitle className=" pb-2">
                        请把滑块拖到最右端
                    </DialogTitle>
                    <DialogContent>
                        <SliderCaptcha
                            mode="slider"
                            tipText={{
                                default: "向右拖动完成验证",
                                loading: "载入中...",
                                moving: "向右拖动至底端",
                                verifying: "验证中...",
                                error: "验证失败",
                            }}
                            onVerify={async (data) => {
                                console.log(data);
                                // verify data
                                return verifyCaptcha(data);
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </>
        </div>
    );
}
