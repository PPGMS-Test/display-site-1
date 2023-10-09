import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"

export default function TodoList() {
  return (
    <div>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={false}  />}
            label="拖拽式侧边栏"
          />

          {/* [2023-10-08 修改"Left right 背景图拿掉] */}
          <FormControlLabel
            control={<Checkbox checked={true}  />}
            label="Left right 背景图拿掉 | 修改完成 -- 把2个卡片中间不留空隙比较困难, 暂时无法修改"
          />
          <FormControlLabel
            control={<Checkbox checked={true} />}
            label="user信息缩小, 放进一个页面 | 修改完成"
          />
          <FormControlLabel
            control={<Checkbox checked={false} />}
            label="radio box点击的更改方式 -- 点击事件添加遮罩, 延迟反馈(困难)"
          ></FormControlLabel>
          <FormControlLabel
            control={<Checkbox checked={false} />}
            label="BCDB 一定要下拉式的"
          />
          <FormControlLabel
            control={<Checkbox checked={true} />}
            label="Todo list变成checkbox | 修改完成"
          />
          <FormControlLabel
            control={<Checkbox checked={true} />}
            label="APM拿掉, 变成一个新的tab | 修改完成"
          />
          <FormControlLabel
            control={<Checkbox checked={false} />}
            label="侧边栏小窗口时隐藏"
          />
          <FormControlLabel
            control={<Checkbox checked={false} />}
            label="PayPal等添加logo"
          />
          <FormControlLabel
            control={<Checkbox checked={false} />}
            label="dashboard为参数提供自定义toggle"
          />
          <FormControlLabel
            control={<Checkbox checked={false} />}
            label="user信息可修改 -- 使用redux实现"
          />
        </FormGroup>
     
    </div>
  )
}
