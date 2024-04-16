使用`npm install`命令安装依赖  
使用`npm start` 命令启动

访问地址:

> https://ppgms-test.github.io/


## Tips:

国家和地区以常量的方式存在代码中, 获取源:
> http://country.io/data/



---
## 更新日志:

`0.1.2` 
### 2023-02-04
研究了一整天react如何实现多环境, 发现`dotenv`包只支持`node.js`, 在官网中发现, 它不支持`react`. 使用`cross-env`.  
需要同时使用`react-rewired`和`cross-env`

***2024-02-02***
更新payment method中的图标, 现在build-deploy的时候主页入口变了



### 2023-02-02
本地环境的`build-folder`文件是用于存放提交到dropzone中用于部署的build文件夹的zip包的

`0.1.1` 
***2024-01-10***
添加了不同环境的环境文件, 生产环境不会有未完成的侧边栏图标了, 修改了一些页面的title, 修复了一些bug.

### 2023-12-14

试了很多个第三方的验证码包, 唯一能用的就是这个
> https://github.com/caijf/rc-slider-captcha?tab=readme-ov-file

---

### 2023-11-30
创建 development-petro 分支