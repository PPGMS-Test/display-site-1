import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"

export default function TodoList() {
  return (
    <div>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={false}  />}
            label="拖拽式侧边栏"
          />
          <FormControlLabel
            control={<Checkbox checked={false}  />}
            label="Left right 背景图拿掉"
          />
          <FormControlLabel
            control={<Checkbox checked={false} />}
            label="user信息缩小, 放进一个页面"
          />
          <FormControlLabel
            control={<Checkbox checked={false} />}
            label="radio box点击的更改方式"
          />
          <FormControlLabel
            control={<Checkbox checked={false} />}
            label="BCDB 一定要下拉式的"
          />
          <FormControlLabel
            control={<Checkbox checked={true} />}
            label="Todo list变成checkbox"
          />
          <FormControlLabel
            control={<Checkbox checked={true} />}
            label="APM拿掉, 变成一个新的tab"
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
