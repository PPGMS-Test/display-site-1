使用`pnpm install`命令安装依赖  
使用`ppnnpm start` 命令启动

访问地址: 
> https://ppgms-test.github.io/ 

## Tips: 
国家和地区以常量的方式存在代码中, 获取源:
> http://country.io/data/

---
## 更新日志:
### 2025-01-16
更新了`redux-persist`, 删除了`package-lock.json`. 以后使用`pnpm`来管理, 也就是说增加了`pnpm-lock.yml`文件. 同时存在`npm`和`pnpm`两个包管理工具的话, 依赖会冲突

`tmp-development-fake-button-2024-08-09 branch -- 0.1.0`   
### 2024-08-27
***carco 配置模板***
```json
 "scripts": {
    "start": "cross-env port=3000 cross-env REACT_APP_ENV=test craco start FAST_REFRESH=true",
    "start:stg": "cross-env port=3000 cross-env REACT_APP_ENV=stg craco start FAST_REFRESH=true",
    "start:prod": "cross-env port=3000 cross-env REACT_APP_ENV=stg craco start FAST_REFRESH=true",
    "build:test": "cross-env REACT_APP_ENV=test craco build",
    "build:stg": "cross-env REACT_APP_ENV=stg craco build",
    "build:prod": "cross-env REACT_APP_ENV=production craco build",
    "test": "craco test",
    "eject": "craco eject"
  }
```
环境变量必须以REACT_APP开头

`0.1.2` 
### 2023-02-04
研究了一整天react如何实现多环境, 发现`dotenv`包只支持`node.js`, 在官网中发现, 它不支持`react`. 使用`cross-env`.  
需要同时使用`react-rewired`和`cross-env`

### 2024-02-02
更新payment method中的图标, 现在build-deploy的时候主页入口变了

### 2024-02-02
本地环境的`build-folder`文件是用于存放提交到dropzone中用于部署的build文件夹的zip包的

`0.1.1` 
### 2024-01-10
添加了不同环境的环境文件, 生产环境不会有未完成的侧边栏图标了, 修改了一些页面的title, 修复了一些bug.

### 2023-12-14

试了很多个第三方的验证码包, 唯一能用的就是这个
> https://github.com/caijf/rc-slider-captcha?tab=readme-ov-file

`0.1.0` 
### 2023-11-30
创建 development-petro 分支