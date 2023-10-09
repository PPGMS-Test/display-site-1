import { Checkbox, Chip, FormControlLabel, FormGroup } from "@mui/material";
import CircleCheckMark from "../components/svgIcon/CircleCheckMark";

export default function TodoList() {
    return (
        <div>
            <FormGroup>
                <div className=" border-x-indigo-500 border-spacing-0 border-4 rounded-xl p-1">
                    <FormControlLabel
                        control={<Checkbox checked={false} />}
                        label="拖拽式侧边栏"
                    />
                </div>

                <div className="border-x-indigo-500 border-spacing-0 border-4 rounded-xl p-1">
                    {/* [2023-10-08 修改"Left right 背景图拿掉] */}
                    <FormControlLabel
                        control={<Checkbox checked={true} />}
                        label="Left right 背景图拿掉"
                    />
                    <div className="ml-8 pr-2 mb-1">
                        <Chip
                            variant="outlined"
                            size="small"
                            color="primary"
                            label="把2个卡片中间不留空隙比较困难, 暂时未修改, 在css的海洋中迷失了"
                        />
                    </div>
                </div>

                <div className=" border-x-indigo-500 border-spacing-0 border-4 rounded-xl p-1">
                    <FormControlLabel
                        control={<Checkbox checked={true} />}
                        label="user信息缩小, 放进一个页面 "
                    />
                </div>

                <div className=" border-x-indigo-500 border-spacing-0 border-4 rounded-xl p-1">
                    <FormControlLabel
                        control={<Checkbox checked={false} />}
                        label="radio box点击的更改方式 -- 点击事件添加遮罩, 延迟反馈(困难)"
                    ></FormControlLabel>
                </div>
                <div className=" border-x-indigo-500 border-spacing-0 border-4 rounded-xl p-1">
                    <FormControlLabel
                        control={<Checkbox checked={false} />}
                        label="BCDB 一定要下拉式的"
                    />
                    <div className=" ml-8 pr-2 mb-1">
                        <Chip
                            // variant="outlined"
                            // size="small"
                            color="secondary"
                            label="BCDC的预填不起作用"
                        />
                    </div>
                </div>

                <div className=" border-x-indigo-500 border-spacing-0 border-4 rounded-xl p-1">
                    <FormControlLabel
                        control={<Checkbox checked={true} />}
                        label="Todo list变成checkbox "
                    />
                </div>
                <div className=" border-x-indigo-500 border-spacing-0 border-4 rounded-xl p-1">
                    <FormControlLabel
                        control={<Checkbox checked={true} />}
                        label="APM拿掉, 变成一个新的tab"
                    />
                </div>
                <div className="border-x-indigo-500 border-spacing-0 border-4 rounded-xl p-1">
                    <FormControlLabel
                        control={<Checkbox checked={false} />}
                        label="侧边栏小窗口时隐藏"
                    />
                </div>
                <div className=" border-x-indigo-500 border-spacing-0 border-4 rounded-xl p-1">
                    <FormControlLabel
                        control={<Checkbox checked={false} />}
                        label="PayPal等添加logo"
                    />
                </div>

                <div className=" border-x-indigo-500 border-spacing-0 border-4 rounded-xl p-1">
                    <FormControlLabel
                        control={<Checkbox checked={false} />}
                        label="dashboard为参数提供自定义toggle"
                    />
                </div>

                <div className=" border-x-indigo-500 border-spacing-0 border-4 rounded-xl p-1">
                    <FormControlLabel
                        control={<Checkbox checked={false} />}
                        label="user信息可修改 -- 使用redux实现"
                    />
                    <div className=" ml-8 pr-2 mb-1">
                        <Chip
                            variant="outlined"
                            // size="small"
                            color="primary"
                            label="user信息已经放到reducer中"
                        />
                    </div>
                </div>
            </FormGroup>
        </div>
    );
}
